import React from 'react';
import "./admin.scss";
import Navbar from '../../components/admin/adminnavbar/AdminNavbar';
import { Route, Routes } from 'react-router-dom';
import ViewProducts from '../../components/admin/viewproducts/ViewProducts';
import AddProduct from "../../components/admin/addproducts/AddProduct"
import Orders from '../../components/admin/vieworders/ViewOrders';
import Home from '../../components/admin/home/Home';
import OrderDetails from '../../components/admin/orderdetails/OrderDetails';

const Admin = () => {
  return (
    <div className='admin'>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="adminrouteoptinos">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/all-products" element={<ViewProducts />} />
          <Route path="/add-product/:id" element={<AddProduct />} />
          <Route path="/view-orders" element={<Orders />} />
          <Route path='/order-details/:id' element={<OrderDetails/>}/>
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
