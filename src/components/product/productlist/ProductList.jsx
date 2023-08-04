import React, { useEffect, useState } from 'react'
import "./productlist.scss"
import { FaListAlt } from "react-icons/fa";
import { BsFillGridFill } from "react-icons/bs";
import Search from '../../search/Search';
import ProductItem from "../productitem/ProductItem"
import { useDispatch, useSelector } from 'react-redux';
import { FILTER_BY_SEARCH, FILTER_BY_SORT } from '../../../redux/FilterSlice';
import Pagination from '../../pagination/Pagination';

const ProductList = ({product}) => {
  const [grid, setGrid] = useState(true);
  const [sort, setSort] = useState("latest");
  const [search, setSearch] = useState("")
  const dispatch = useDispatch()
  const filter = useSelector((state)=> state.filter.filteredProducts)

  const [currentPage, setCurrentPage] = useState(1)
  const [ProductPerPage] = useState(6)

  const indexOfLastProduct = currentPage * ProductPerPage
  const indexOfFirstProduct = indexOfLastProduct - ProductPerPage
  const currentProducts = filter.slice(indexOfFirstProduct, indexOfLastProduct)

  useEffect(()=>{
    dispatch(FILTER_BY_SEARCH({
      product, search
    }))
  },[dispatch, product, search])
  useEffect(()=>{
    dispatch(FILTER_BY_SORT({
      product, sort
    }))
  },[dispatch, product, sort])

  return (
    <div className="product-list" id="product">
      <div className="top">
        <div className="icons">
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />

          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

          <p>
            <b>{filter.length}</b> Products found.
          </p>
        </div>
        {/*search icon */}
        <div>
          <Search value={search} onChange={(e)=> setSearch(e.target.value)}/>
        </div>
        {/* Sort Products */}
        <div className="sort">
          <label>Sort by:</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? "grid" : "list"}>
        {currentProducts?.length === 0 ? (
          <p>No product found.</p>
        ) : (<>{currentProducts?.map((product)=>{
          return(
            <div key={product.id}>
              <ProductItem {...product} grid={grid} product={product}/>
            </div>
          )
        })}</>)}
      </div>
      <Pagination
        productPerPage={ProductPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalProducts={filter.length}
      />
    </div>
  );
}

export default ProductList