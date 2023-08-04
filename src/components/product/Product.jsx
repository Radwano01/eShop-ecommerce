import React, { useEffect, useState } from 'react';
import "./product.scss";
import ProductFilter from "./productfilter/ProductFilter";
import ProductList from "./productlist/ProductList";
import useFetchCollection from '../../customHooks/useFetchCollection';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS } from "../../redux/ProductSlice";
import spinner from "../../assets/spinner.jpg";
import { FaCogs } from 'react-icons/fa';

const Product = () => {
  const { data, loading } = useFetchCollection("products");
  const [showFilter, setShowFilter] = useState(false);
  const products = useSelector((state) => state.product.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({
      products: data
    }));
  }, [dispatch, data]);

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  

  return (
    <section>
      <div className={`container ${"product"}`}>
        <aside className={showFilter ? `${"filter"} ${"show"}` : `${"filter"}`}>
          {loading ? null : (<ProductFilter />)}
        </aside>
        <div className="product-content">
          {loading ? <img src={spinner} style={{ width: "50px" }} className='--center-all' alt='spinner'/> : (
            <ProductList product={products} />
          )}
          <div className="product-show-icon" onClick={() => toggleFilter()}>
            <FaCogs size={20} color='orangered' />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Product;
