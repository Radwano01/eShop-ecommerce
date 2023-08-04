import React, { useEffect } from 'react'
import "./orderhistory.scss"
import useFetchCollection from '../../customHooks/useFetchCollection'
import { useDispatch, useSelector } from 'react-redux'
import { STORE_ORDERS } from '../../redux/orderslice'
import Loader from '../../components/loader/Loader'
import { useNavigate } from 'react-router-dom'

const OrderHistory = () => {
  const {data, isLoading} = useFetchCollection("orders")
  const orders = useSelector((state)=> state.order.orderHistory)
  const userID = useSelector((state)=> state.slice.userID)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = (id)=>{
    navigate(`/order-details/${id}`)
  }

  const filteredOrders = orders.filter((order)=> order.userID === userID)

  useEffect(()=>{
    dispatch(STORE_ORDERS(data))
  },[dispatch, data])
  console.log(data)
  return (
    <section>
    <div className={`container ${"order"}`}>
      <h2>Your Order History</h2>
      <p>
        Open an order to leave a <b>Product Review</b>
      </p>
      <br />
      <>
        {isLoading && <Loader />}
        <div className={"table"}>
          {filteredOrders.length === 0 ? (
            <p>No order found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Order Amount</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((orders, index) => {
                  const {
                    id,
                    order,
                    orderTime,
                    orderAmount,
                    orderStatus,
                  } = orders;
                  return (
                    <tr key={id} onClick={()=> handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        {order} at {orderTime}
                      </td>
                      <td>{id}</td>
                      <td>
                        {"$"}
                        {orderAmount}
                      </td>
                      <td>
                        <p
                          className={
                            orderStatus !== "Delivered"
                              ? "pending"
                              : "delivered"
                          }
                        >
                          {orderStatus}
                        </p>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </>
    </div>
  </section>
  )
}

export default OrderHistory