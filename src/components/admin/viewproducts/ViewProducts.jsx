import React, { useEffect, useState } from 'react'
import "./viewproducts.scss"
import {deleteDoc, doc} from 'firebase/firestore'
import { db, storage } from '../../../firebase/config'
import Loader from "../../loader/Loader"
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { deleteObject, ref } from 'firebase/storage'
import Notiflix from 'notiflix'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_PRODUCTS } from '../../../redux/ProductSlice'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Search from '../../search/Search'
import { FILTER_BY_SEARCH } from '../../../redux/FilterSlice'
import Pagination from '../../pagination/Pagination'


const ViewProducts = () => {
  const [search , setSearch] = useState("")
  const {data, loading} = useFetchCollection("products")
  const product = useSelector((state)=> state.product.products)
  const dispatch = useDispatch()
  const filter = useSelector((state)=> state.filter.filteredProducts)

  const [currentPage, setCurrentPage] = useState(1)
  const [ProductPerPage] = useState(6)

  const indexOfLastProduct = currentPage * ProductPerPage
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(()=>{
    dispatch(STORE_PRODUCTS({
      products: data
    }))
  }, [dispatch, data])

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({
      product, search
    }))
  },[dispatch, product, search])

  const confirmDelete = (id, imageURL)=>{
    Notiflix.Confirm.show(
      'Delete Product',
      'Your are about to delete this product',
      'delete',
      'cancel',
      function okCb(){
        deleteProduct(id, imageURL)
      },
      function cancelCb(){
        alert('if you say so...')
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: "oragered",
        okButtonBackground: "orangered",
        cssAnimationStyle: "zoom"
      }
    )
  }

  const deleteProduct = async(id,  imageURL)=>{
    try{
      await deleteDoc(doc(db, "products", id))
      const storageRef = ref(storage, imageURL)
      await deleteObject(storageRef)
      alert("Product Deleted successfully")

    }catch(err){
      alert(err.message)
    }
  }
  return (
    <>
      {loading && <Loader />}
      <div className="table">
        <h2>All Products</h2>

        <div className="search">
          <p>
            <b>{filter.length}</b>  products found
          </p>
          <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        {currentProducts.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProducts.map((product, index) => {
                const { id, name, price, imageURL, category } = product;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={name}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{`$${price}`}</td>
                    <td className="icons">
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt onClick={()=> confirmDelete(id, imageURL)}
                        size={18}
                        color="red"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
        </div>

        <Pagination
        productPerPage={ProductPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filter.length}
      />
    </>
)}

export default ViewProducts