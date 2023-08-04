import React, { useEffect } from 'react'
import "./home.scss"
import InfoBox from '../../infobox/InfoBox'
import {AiFillDollarCircle} from "react-icons/ai"
import {BsCart4} from "react-icons/bs"
import {FaCartArrowDown} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux'
import useFetchCollection from '../../../customHooks/useFetchCollection'
import { STORE_PRODUCTS } from '../../../redux/ProductSlice'
import { CALC_TOTAL_ORDER_AMOUNT, STORE_ORDERS } from '../../../redux/orderslice'
import Chart from '../../chart/Chart'

const Home = () => {

  const fbProducts = useFetchCollection("products")
  const  {data} = useFetchCollection("orders")
  const dispatch = useDispatch()

  const product = useSelector((state)=> state.product.products)
  const ordertotalprice = useSelector((state)=> state.order.orderAmount)
  const order = useSelector((state)=> state.order.orderHistory)

  useEffect(()=>{
    dispatch(STORE_PRODUCTS({
      products: fbProducts.data
    }))

    dispatch(STORE_ORDERS(data))

    dispatch(CALC_TOTAL_ORDER_AMOUNT()) 
  },[dispatch, data, fbProducts])

  return (
    <div className='home'>
      <h2>Admin Home</h2>
      <div className="info">
        <InfoBox cardClass={"card-box  cardone-box"} title={"Earnings"} count={`$${ordertotalprice}`} icon={<AiFillDollarCircle size={30} color='#b624ff'/>}/>
        <InfoBox cardClass={"card-box  cardtwo-box"} title={"Products"} count={`${product.length}`} icon={<BsCart4 size={30} color='#1f93ff'/>}/>
        <InfoBox cardClass={"card-box  cardthree-box"} title={"Orders"} count={order.length} icon={<FaCartArrowDown size={30} color='orangered'/>}/>
      </div>
      <div>
        <Chart/>
      </div>
    </div>
  )
}

export default Home