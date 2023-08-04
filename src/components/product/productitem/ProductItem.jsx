import React from 'react';
import styles from "./productitem.scss";
import { Link } from 'react-router-dom';
import Card from "../../card/Card";
import { useDispatch } from 'react-redux';
import { ADD_TO_CARD } from '../../../redux/cartSlice';

const ProductItem = ({ product, grid, id, name, price, desc, imageURL }) => {

  const dispatch = useDispatch()

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");

      return shortenedText;
    }
    return text;
  };
  const addToCart = (product)=>{
    dispatch(ADD_TO_CARD(product))
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
        <Link to={`/product-details/${id}`}>
          <div className={styles.img}>
            <img src={imageURL} alt={name} style={{ width: "300px", height: "300px" }} />
          </div>
        </Link>

      <div className={styles.productitemcontent}>
        <div className={styles.details}>
          <p>{`$${price}`}</p>
          <h4>{shortenText(name, 15)}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}
        <button className='--btn --btn-danger' onClick={()=> addToCart(product)}>Add to cart</button>
      </div>
    </Card>
  );
};

export default ProductItem;
