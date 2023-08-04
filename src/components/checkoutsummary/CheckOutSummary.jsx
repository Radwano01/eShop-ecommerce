import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../card/Card";
import "./checkoutsummary.scss"

const CheckoutSummary = () => {
  const cartItems = useSelector((state)=> state.cart.cartItems);
  const cartTotalAmount = useSelector((state)=>state.cart.cartTotalAmount);
  const cartTotalQuantity = useSelector((state)=>state.cart.cartTotalQuantity);

  return (
    <div>
      <h3>Checkout Summary</h3>
      <div>
        {cartItems.lenght === 0 ? (
          <>
            <p>No item in your cart.</p>
            <button className="--btn">
              <Link to="/#products">Back To Shop</Link>
            </button>
          </>
        ) : (
          <div>
            <p>
              <b>{`Cart item(s): ${cartTotalQuantity}`}</b>
            </p>
            <div className="checkoutsummary-text">
              <h4>Subtotal:</h4>
              <h3>{cartTotalAmount.toFixed(2)}</h3>
            </div>
            {cartItems.map((item, index) => {
              const { id, name, price, cartTotalQuantity } = item;
              return (
                <Card key={id} cardClass="checkoutsummary-card">
                  <h4>Product: {name}</h4>
                  <p>Quantity: {cartTotalQuantity}</p>
                  <p>Unit price: {price}</p>
                  <p>Set price: {price * cartTotalQuantity}</p>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutSummary;