import React, { useEffect } from 'react'
import "./cart.scss"
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {FaTrashAlt} from "react-icons/fa"
import Card from "../../components/card/Card"
import { ADD_TO_CARD, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, CLEAR_CART, DECREASE_CART, DELETE_CART, SAVE_URL } from '../../redux/cartSlice'
    
  const Cart = () => {
    const cartItems = useSelector((state)=> state.cart.cartItems)
    const cartTotalAmount = useSelector((state)=> state.cart.cartTotalAmount)
    const cartTotalQuantity = useSelector((state)=> state.cart.cartTotalQuantity)
    const isLoggedIn = useSelector((state)=> state.slice.isLoggedIn)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const increaseCart =(cart)=>{
      dispatch(ADD_TO_CARD(cart))
    }

    const decreaseCart =(cart)=>{
      dispatch(DECREASE_CART(cart))
    }

    const deleteCart = (cart)=>{
      dispatch(DELETE_CART(cart))
    }

    const clearCart = ()=>{
      dispatch(CLEAR_CART())
    }

    useEffect(()=>{
      dispatch(CALCULATE_SUBTOTAL())
      dispatch(CALCULATE_TOTAL_QUANTITY())
      dispatch(SAVE_URL(""))
    },[dispatch, cartItems])

    const url = window.location.href;
    const checkOut = ()=>{
      if(isLoggedIn){
        navigate("/checkout-details")
      }else{
        dispatch(SAVE_URL(url))
        navigate("/login")
      }
    }

    return (
      <section>
        <div className={`container ${"table"}`}>
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ?(
            <>
              <p>Your cart is currently empty</p>
              <br />
              <div>
                <Link to="/#product">&larr; Continue shopping</Link>
              </div>
            </>
          ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th>s/n</th>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index)=>{
                      const {id, name, price, imageURL, cartTotalQuantity} = item
                      return(
                        <tr key={id}>
                          <td>{index + 1}</td>
                          <td>
                            <p>
                              {name}
                            </p>
                            <img src={imageURL} alt={name} style={{width:"100px"}}/>
                          </td>
                          <td>{price}</td>
                          <td>
                            <div className="count">
                              <button className='--btn' onClick={()=> decreaseCart(item)}>-</button>
                              <p>
                                <b>{cartTotalQuantity}</b>
                              </p>
                              <button className="--btn" onClick={()=> increaseCart(item)}>+</button>
                            </div>
                          </td>
                          <td>{(price * cartTotalQuantity).toFixed(2)}</td>
                          <td className='icons'>
                            <FaTrashAlt size={19} color="red" onClick={()=> deleteCart(item)}/>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                <div className="summary">
                    <button className='--btn --btn-danger' onClick={()=> clearCart()}>Clear Cart</button>
                    <div className="checkout-cart">
                      <div className="">
                        <Link to="/#product">&larr; Continue Shopping</Link>
                      </div>
                      <br />
                      <Card cardClass="cart-card">
                        <p>{`cart item(s): ${cartTotalQuantity}`}</p>
                        <div className="text">
                          <h4>subtotal:</h4>
                          <h3>{`$${cartTotalAmount?.toFixed(2)}`}</h3>
                        </div>
                        <p>Tax an shipping calculated at checkout</p>
                        <button className='--btn --btn-primary --btn-block' onClick={checkOut}>Checkout</button>
                      </Card>
                    </div>
                </div>
              </>
          )}
        </div>
      </section>
    )
  }
    
export default Cart