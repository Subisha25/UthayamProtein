import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Products from './components/products/products';
import ProductDetails from './components/products/productdetails';
import Cart from './components/cart/cart';
import DeliveryAddress from './components/deliveryaddress/deliveryaddress';
import PaymentOption from './components/payment/payment';
import OrderConfirmation from './components/OrderConfirmation/orderConfirmation';

function App() {
  return (
    <div>
    
<Router>
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path='/productdetails' element={<ProductDetails/>}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/deliveryaddress' element={<DeliveryAddress />}/>
      <Route path='/paymentoption' element={<PaymentOption />}/>
      <Route path='/orderconfirmation' element={<OrderConfirmation />}/>


    </Routes>
    </Router>
  </div>
  );
}

export default App;