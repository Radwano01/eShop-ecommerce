import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement
} from "@stripe/react-stripe-js";
import "./checkoutform.scss"
import Card from "../card/Card";
import CheckoutSummary from "../checkoutsummary/CheckOutSummary";
import spinner from "../../assets/spinner.jpg"
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/config";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { CLEAR_CART } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartItems = useSelector((state)=> state.cart.cartItems)
  const userID = useSelector((state)=> state.slice.userID)
  const userEmail = useSelector((state)=> state.slice.email)
  const shippingAddress = useSelector((state)=> state.checkout.shippingAddress)
  const cartTotalAmount = useSelector((state)=> state.cart.cartTotalAmount)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }

  }, [stripe]);

  const saveOrder = ()=>{
    const today = new Date()
    const date = today.toDateString()
    const time = today.toLocaleTimeString()
    try {
       addDoc(collection(db, 'orders'), {
        userID,
        userEmail,
        order: date,
        orderTime: time,
        orderAmount:cartTotalAmount,
        orderStatus:"Order Placed...",
        cartItems,
        shippingAddress,
        createAt: Timestamp.now().toDate()
      });
      dispatch(CLEAR_CART())
      navigate("/checkout-success")
    } catch (err) {
      toast.error(err.message)
    }

  }
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null)

    if (!stripe || !elements) {

      return;
    }

    setIsLoading(true);



    const comfirmPayment = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/checkout-success",
      },
      redirect: "if_required"
    }).then((result)=>{
      if(result.error){
        toast.error(result.error)
        setMessage(result.error.message)
        return;
      }
      if(result.paymentIntent){
        if(result.paymentIntent.status === "succeeded"){
          setIsLoading(false)
          toast.success("Payment successful")
          saveOrder()
        }
      }
    })  
    setIsLoading(false);
    return comfirmPayment
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <section>
      <div className={`container ${'checkoutform'}`}>
        <h2>Checkout</h2>
        <form onSubmit={handleSubmit}>
          <div className="">
            <Card cardClass={"card"}>
              <CheckoutSummary/>
            </Card>
          </div>
          <div>
            <Card cardClass={`${"card"} ${"pay"}`}>
              <h3>Stripe Checkout</h3>
              <PaymentElement id="payment-element" options={paymentElementOptions}/>
              <button disabled={isLoading || !stripe || !elements} id="submit" className="button">
                <span id="button-text">
                  {isLoading ? <img src={spinner} alt=""  style={{width: "20px"}}/> : "Pay now"}
                </span>
              </button>
              {/* Show any error or success messages */}
              {message && <div id="payment-message">{message}</div>}
            </Card>
          </div>
        </form>
      </div>
    </section>
  );
}