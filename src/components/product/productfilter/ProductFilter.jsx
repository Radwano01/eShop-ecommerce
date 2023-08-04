import React, { useEffect, useState } from 'react'
import "./productfilter.scss"
import { useDispatch, useSelector } from 'react-redux'
import {CLEAR_FILTERS, FILTER_BY_BRAND, FILTER_BY_CATEGORY} from "../../../redux/FilterSlice"

const ProductFilter = () => {

  const [category, setCategory] = useState("All")
  const [brand, setBrand] = useState("All")
  const [clear, setClear] = useState("All")
  const products = useSelector((state)=> state.product.products)
  const  dispatch = useDispatch()
  const allCategories = [
    "All",
    ...new Set(products.map((product)=> product.category))
  ]
  const allBrand = [
    "All",
    ...new Set(products.map((product)=> product.brand))
  ]
  const filterProducts = (cat)=>{
    setCategory(cat)
    dispatch(FILTER_BY_CATEGORY({
      products, category:cat
    }))
  }
    useEffect(()=>{
      dispatch(FILTER_BY_BRAND({
        products, brand
      }))
    },[dispatch, products, brand])

    const clearFilters = ()=>{
      dispatch(CLEAR_FILTERS({
        products
      }))
      setCategory("All");
      setBrand("All");
    }


  return (
    <div className='filter'>
      <h4>Categories</h4>
      <div className="category">
        {allCategories.map((cat, index)=>{
          return(
            <button
              key={index}
              type="button"
              className={`${category}` === cat ? `${"active"}` : null}
              onClick={() => filterProducts(cat)}
            >
            {cat}
            </button>
          )
        })}
        
      </div>
      <h4>Brand</h4>
      <div className="brand">
        <select value={brand} onChange={(e)=> setBrand(e.target.value)} >
          {allBrand.map((brand, index)=>{
            return(          
              <option key={index} value={brand}>{brand}</option>
            )
          })}
        </select>
        <br />
        <button className='--btn --btn-danger' value={clear} onChange={(e)=> setClear(e.target.value)} onClick={()=> clearFilters()}>Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter