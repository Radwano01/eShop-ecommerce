import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutForm from "../../components/checkoutform/CheckoutForm"
import { CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY } from "../../redux/cartSlice";

const stripePromise = loadStripe("pk_test_51NPMKjDoJcfQrFNDZd5T3J9boPPmiLF2Zwia5ZSrQYaik9zhtEkbkiKCYhOaL8DwxhqoOqTNF3hfFd8Qyqzsrk7000T4JdTCif");

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const cartItems = useSelector((state)=> state.cart.cartItems);
  const totalAmount = useSelector((state)=> state.cart.cartTotalAmount);
  const customerEmail = useSelector((state)=> state.slice.email);

  const shippingAddress = useSelector((state)=> state.checkout.shippingAddress);
  const billingAddress = useSelector((state)=> state.checkout.billingAddress);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${customerEmail}, Amount: ${totalAmount}`;

  useEffect(() => {
    // http://localhost:4242/create-payment-intent
    // Create PaymentIntent as soon as the page loads

    fetch("http://localhost:4242/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartItems: cartItems,
        userEmail: customerEmail,
        shipping: shippingAddress,
        billing: billingAddress,
        description,
      }),
    })
      .then( async (res) => {
        if (res.ok) {
          return  await res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage(`Failed to initialize checkout`);
        toast.error("Something went wrong!!!");
      });
  }, [cartItems, customerEmail, shippingAddress, billingAddress, description]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;