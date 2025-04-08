import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from './components/products/products';
import Cart from './components/cart/cart';
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

function App() {
  return (
    <div>
    
<Router>
    <Routes>
      
      <Route path="/" element={<Products />} />
      <Route path='/productdetails' element={<ProductDetails/>}/>
      <Route path='/proceedtopay' element={<ProceedtoPay />}/>
      <Route path='/chicken' element={<Chicken />}/>
      <Route path='/kadai' element={<Kadai />}/>
      <Route path='/egg' element={<Egg />}/>
      <Route path='/cart' element={<OrderDetails />}/>
      <Route path='/selectaddress' element={<SelectAddress />}/>
      <Route path='/deliveryaddress' element={<DeliveryAddress />}/>
      <Route path='/paymentoption' element={<PaymentOption />}/>
      <Route path='/orderconfirmation' element={<OrderConfirmation />}/>


    </Routes>
    </Router>
  </div>
  );
}

export default App;