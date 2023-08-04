import React, { useState } from 'react';
import Card from '../../card/Card';
import './addproducts.scss';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '../../../firebase/config';
import { Timestamp, addDoc, collection, doc, setDoc } from 'firebase/firestore';
import Loader from '../../loader/Loader';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AddProduct = () => {
  const {id} = useParams()
  const products = useSelector((state)=> state.product.products)
  const productEdit = products.find((item)=> item.id === id)

  function detectForm(id, f1, f2){
    if(id === "ADD"){
      return f1
    }
    return f2
  }
  const category = [
    { id: 1, name: 'Laptop' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Fashion' },
    { id: 4, name: 'Phone' },
  ];

  const initialState = {
    name: '',
    imageURL: '',
    price: 0,
    category: '',
    brand: '',
    desc: '',
  }

  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [product, setProduct] = useState(()=>{
    const newState = detectForm(id, {...initialState}, productEdit); return newState
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storageRef = ref(storage, `eshop/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          alert('Image uploaded successfully.');
        });
      }
    );
  };

  const AddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const docRef = await addDoc(collection(db, 'products'), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: Timestamp.now().toDate()
      });

      setProduct({
        name: '',
        imageURL: '',
        price: 0,
        category: '',
        brand: '',
        desc: '',
      });
      setLoading(false);
      setUploadProgress(0);
      alert('Product uploaded successfully.');
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  const EditProduct =(e)=>{
    e.preventDefault()
    setLoading(true)

    if(product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage, productEdit.imageURL)
      deleteObject(storageRef)
    }

    try{
      setDoc(doc(db, "product", id),{
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createAt: productEdit.createAt,
        editAt: Timestamp.now().Date()
      })
      setLoading(false)
      alert("Product Edited Successfully")

    }catch{
      e.preventDefault()
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <Loader />}
      <div className='product'>
        <h1>{detectForm(id, "Add New Product", "Edit Product")}</h1>
        <Card cardClass='card'>
          <form onSubmit={detectForm(id, AddProduct, EditProduct)}>
            <label>Product name:</label>
            <input
              type='text'
              placeholder='Product name'
              required
              name='name'
              value={product.name}
              onChange={handleInputChange}
            />
            <label>Product image:</label>
            <Card cardClass='group'>
              {uploadProgress === 0 ? null : (
                <div className='progress'>
                  <div className='progress-bar' style={{ width: `${uploadProgress}%` }}>
                    {uploadProgress < 100 ? `uploading ${uploadProgress}` : `upload Completed ${uploadProgress}`}
                  </div>
                </div>
              )}
              <input type='file' accept='image/*' name='image' onChange={handleImageChange} placeholder='Product image' />

              {product.imageURL === '' ? null : (
                <input type='text' placeholder='ImageURL' required name='imageURL' disabled value={product.imageURL} />
              )}
            </Card>

            <label>Product price:</label>
            <input
              type='number'
              placeholder='Product price'
              required
              name='price'
              value={product.price}
              onChange={handleInputChange}
            />

            <label>Product category:</label>
            <select name='category' value={product.category} onChange={handleInputChange}>
              <option value='' disabled>
                -- choose product category --
              </option>
              {category.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>Product Company/Brand:</label>
            <input
              type='text'
              placeholder='Product brand'
              required
              name='brand'
              value={product.brand}
              onChange={handleInputChange}
            />

            <label>Product Description</label>
            <textarea name='desc' id='' cols='30' rows='10' value={product.desc} required onChange={handleInputChange}></textarea>

            <button className='--btn --btn-primary' type='submit'>
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
