import './App.css';
import {Routes, Route} from "react-router-dom"
import Home from "./pages/home/Home"
import Contact from "./pages/contact/Contact"
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Reset from './pages/auth/Reset'
import Navbar from "./components/navbar/Navbar"
import Footer from "./components/footer/Footer"
import Cart from "./pages/cart/Cart"
import Admin from "./pages/admin/Admin"
import AdminOnlyRoute from './components/adminonlyroute/AdminOnlyRoute';
import ProductDetails from "./components/product/productdetails/ProductDetails"
import CheckoutDetails from './pages/checkout/CheckoutDetails';
import Checkout from './pages/checkout/Checkout';
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess"
import OrderHistory from './pages/orderHistory/OrderHistory';
import OrderDetails from './pages/orderdetails/OrderDetails';
import ReviewProduct from './components/reviewproduct/ReviewProduct';
import NotFound from './pages/notfound/NotFound';

function App() {
  return (
    <div className="App">
      <Navbar/>
        <Routes>
          <Route path='/' element={<><Home/></>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/reset' element={<Reset/>}/>
          <Route path='/admin/*' element={<AdminOnlyRoute><Admin/></AdminOnlyRoute>}/>
          <Route path='/product-details/:id' element={<ProductDetails/>}/>
          <Route path='/checkout-details' element={<CheckoutDetails/>}/>
          <Route path='/checkout' element={<Checkout/>}/>
          <Route path='/checkout-success' element={<CheckoutSuccess/>}/>
          <Route path='/order-history' element={<OrderHistory/>}/>
          <Route path='/order-details/:id' element={<OrderDetails/>}/>
          <Route path='/review-product/:id' element={<ReviewProduct/>}/>
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
