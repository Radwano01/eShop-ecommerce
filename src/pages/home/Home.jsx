import React, { useEffect } from 'react'
import "./home.scss"
import Slider from '../../components/slider/Slider'
import Product from '../../components/product/Product'
    
    const Home = () => {
      const url = window.location.href

      const Scroll = ()=>{
        if(url.includes("#products"))
        window.scrollTo({
          top:700,
          behavior:"smooth"
        })
        return
      }

      useEffect(()=>{
        Scroll()
      },[])
      return (
        <div>
          <Slider/>
          <Product/>
        </div>
      )
    }
    
    export default Home