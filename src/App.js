// import './App.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Products from './components/products/products';
// import Cart from './components/cart/cart';
// import DeliveryAddress from './components/deliveryaddress/deliveryaddress';
// import PaymentOption from './components/payment/payment';
// import OrderConfirmation from './components/OrderConfirmation/orderConfirmation';
// import OrderDetails from './components/orderdetails/orderdetails';
// import SelectAddress from './components/selectaddress/selectadress';
// import ProductDetails from './components/products/productdetails';
// import ProceedtoPay from './components/selectaddress/proceedtopay';
// import Chicken from './components/banner/chicken';
// import Kadai from './components/banner/kadai';
// import Egg from './components/banner/egg';
// import Footer from './components/footer/footer';
// import Banner from './components/banner/banner';
// import AllSwitches from './components/banner/all';

// function App() {
//   return (
//     <div>
    
// <Router>
//     <Routes>
//     <Route path="/" element={<Banner />} />
//     <Route path="/all" element={<AllSwitches />} />

//       <Route path="/products" element={<Products />} />
//       <Route path='/productdetails' element={<ProductDetails/>}/>
//       <Route path='/proceedtopay' element={<ProceedtoPay />}/>
//       <Route path='/chicken' element={<Chicken />}/>
//       <Route path='/kadai' element={<Kadai />}/>
//       <Route path='/egg' element={<Egg />}/>
//       <Route path='/cart' element={<OrderDetails />}/>
//       <Route path='/selectaddress' element={<SelectAddress />}/>
//       <Route path='/deliveryaddress' element={<DeliveryAddress />}/>
//       <Route path='/paymentoption' element={<PaymentOption />}/>
//       <Route path='/orderconfirmation' element={<OrderConfirmation />}/>


//     </Routes>
//     </Router>
//     <Footer />
//   </div>
//   );
// }

// export default App;


import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Products from './components/products/products';
import DeliveryAddress from './components/deliveryaddress/deliveryaddress';
import PaymentOption from './components/payment/payment';
import OrderConfirmation from './components/OrderConfirmation/orderConfirmation';
import OrderDetails from './components/orderdetails/orderdetails';
import SelectAddress from './components/selectaddress/selectadress';
import ProductDetails from './components/products/productdetails';
import ProceedtoPay from './components/selectaddress/proceedtopay';
import Chicken from './components/banner/chicken';
import Kadai from './components/banner/kadai';
import Egg from './components/banner/egg';
import Footer from './components/footer/footer';
import Banner from './components/banner/banner';
import AllSwitches from './components/banner/all';
import Search from './components/banner/search';
import AdminLogin from './components/adminlogin/adminlogin';
import Cart from './components/cart/cart';
import AdminProductDashboard from './components/AdminDashboard/AdminDashboard';

function App() {
  const location = useLocation();
  const excludedRoutes = ['/search'];

  return (
    <div>
      <Routes>
        <Route path="/" element={<Banner />} />
        <Route path="/all" element={<AllSwitches />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productdetails" element={<ProductDetails />} />
        <Route path="/proceedtopay" element={<ProceedtoPay />} />
        <Route path="/chicken" element={<Chicken />} />
        <Route path="/kadai" element={<Kadai />} />
        <Route path="/egg" element={<Egg />} />
        <Route path="/orderdetails" element={<OrderDetails />} />
        <Route path="/selectaddress" element={<SelectAddress />} />
        <Route path="/deliveryaddress" element={<DeliveryAddress />} />
        <Route path="/paymentoption" element={<PaymentOption />} />
        <Route path="/orderconfirmation" element={<OrderConfirmation />} />
        <Route path="/search" element={<Search />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admindashboard" element={<AdminProductDashboard />} />


      </Routes>
      {!excludedRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}