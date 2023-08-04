import React, { useState } from 'react'
import "./CheckoutDetails.scss"
import Card from '../../components/card/Card'
import { useDispatch } from 'react-redux'
import { SAVE_BILLING_ADDRESS, SAVE_SHIPPING_ADDRESS } from '../../redux/checkoutSlice'
import { useNavigate } from 'react-router-dom'
import CheckoutSummary from '../../components/checkoutsummary/CheckOutSummary'

const initialAddressState = {
    name : "",
    line1 : "",
    line2 : "",
    city : "",
    state : "",
    postal_code : "",
    country: "",
    phone: "",
}

const CheckoutDetails = () => {
    
    const [shippingAddress, SetShippingAddress] = useState({...initialAddressState})
    const [billingAddress, SetBillingAddress] = useState({...initialAddressState})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    const handleShipping = (e) => {
      const { name, value } = e.target;
      SetShippingAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    
    const handleBilling = (e) => {
      const { name, value } = e.target;
      SetBillingAddress((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    };
    const handleSubmit =()=>{
        dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress))
        dispatch(SAVE_BILLING_ADDRESS(billingAddress))
        navigate("/checkout")
    }
    return (
        <section>
          <div className={`container ${"checkout"}`}>
            <h2>Checkout Details</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <Card cardClass={"checkout-card"}>
                  <h3>Shipping Address</h3>
                  <label>Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Recipient Name"
                    required
                    name="name"
                    value={shippingAddress.name}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Address line 1</label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    name="line1"
                    value={shippingAddress.line1}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Address line 2</label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    name="line2"
                    value={shippingAddress.line2}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={shippingAddress.state}
                    onChange={(e) => handleShipping(e)}
                  />
                  <label>Postal code</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    required
                    name="postal_code"
                    value={shippingAddress.postal_code}
                    onChange={(e) => handleShipping(e)}
                  />
                  {/* COUNTRY INPUT */}
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={(e) => handleShipping(e)}
                  />
                </Card>
                {/* BILLING ADDRESS */}
                <Card cardClass="checkout-card">
                  <h3>Billing Address</h3>
                  <label>Recipient Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={billingAddress.name}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>Address line 1</label>
                  <input
                    type="text"
                    placeholder="Address line 1"
                    required
                    name="line1"
                    value={billingAddress.line1}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>Address line 2</label>
                  <input
                    type="text"
                    placeholder="Address line 2"
                    name="line2"
                    value={billingAddress.line2}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    required
                    name="city"
                    value={billingAddress.city}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="State"
                    required
                    name="state"
                    value={billingAddress.state}
                    onChange={(e) => handleBilling(e)}
                  />
                  <label>Postal code</label>
                  <input
                    type="text"
                    placeholder="Postal code"
                    required
                    name="postal_code"
                    value={billingAddress.postal_code}
                    onChange={(e) => handleBilling(e)}
                  />
                  {/* COUNTRY INPUT */}
                  
                  <label>Phone</label>
                  <input
                    type="text"
                    placeholder="Phone"
                    required
                    name="phone"
                    value={billingAddress.phone}
                    onChange={(e) => handleBilling(e)}
                  />
                  <button type="submit" className="--btn --btn-primary">
                    Proceed To Checkout
                  </button>
                </Card>

              </div>
                <div>
                    <Card cardClass="checkout-card">
                        <CheckoutSummary />
                    </Card>
                </div>
            </form>
          </div>
        </section>
      );
}

export default CheckoutDetails