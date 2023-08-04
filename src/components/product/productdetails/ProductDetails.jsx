import React, { useEffect, useState } from 'react'
import "./productdetails.scss"
import { Link, useParams } from 'react-router-dom'
import spinnerImg from "../../../assets/spinner.jpg"
import { ADD_TO_CARD, CALCULATE_TOTAL_QUANTITY, DECREASE_CART } from '../../../redux/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import usefetchDocument from '../../../customHooks/usefetchDocument'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import Card from '../../card/Card'
import StarsRating from 'react-star-rate'

const ProductDetails = () => {
  const {id} = useParams()
  const {document} = usefetchDocument("products", id)
  const dispatch = useDispatch()
  const [product, setProduct] = useState(null)
  const cartItems = useSelector((state)=> state.cart.cartItems)
  const isCart = cartItems.findIndex((item)=> {
    return item.id === id
  })
  const {data} = useFetchCollection("reviews")
  const filteredReviews = data?.filter((reviews)=> reviews.productID === id)

  useEffect(()=>{
    setProduct(document)
  },[document]) 

  const addToCart = (product)=>{
    dispatch(ADD_TO_CARD(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const increaseCart =(product)=>{
    dispatch(ADD_TO_CARD(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }

  const decreaseCart =(product)=>{
    dispatch(DECREASE_CART(product))
    dispatch(CALCULATE_TOTAL_QUANTITY())
  }


  return (
    <section>
    <div className={`container "product"`}>
      <h2>Product Details</h2>
      <div>
        <Link to="/#products">&larr; Back To Products</Link>
      </div>
      {product === null ? (
        <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
      ) : (
        <>
          <div className="details">
            <div className="details-img">
              <img src={product.imageURL} alt={product.name} />
            </div>
            <div className="details-content">
              <h3>{product.name}</h3>
              <p className="price">{`$${product.price}`}</p>
              <p>{product.desc}</p>
              <p>
                <b>SKU</b> {product.id}
              </p>
              <p>
                <b>Brand</b> {product.brand}
              </p>

              <div className="details-count">
                {isCart < 0 ? null :
                  <>
                    <button
                      className="--btn" onClick={()=> decreaseCart(product)}
                    >
                      -
                    </button>
                    <p>
                      <b>{isCart >= 0 ? cartItems[isCart].cartTotalQuantity : 0}</b>
                    </p>
                    <button
                      className="--btn" onClick={()=> increaseCart(product)}
                    >
                      +
                    </button>
                  </>
                }
              </div>
              <button className='--btn --btn-danger' onClick={()=> addToCart(product)}>
                ADD TO CART
              </button>
            </div>
          </div><br /><br /><br /><br />
        </>
      )}
      <Card cardClass={"review-card"} className={"review-container"}>
          <h3>Product Reviews</h3>
          <div className="">
          {filteredReviews.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <div key={index} className={"review"}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
                      <span>
                        <b>{reviewDate}</b>
                      </span>
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
      </Card>
    </div>
  </section>
  )
}

export default ProductDetails