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

function App() {
  return (
    <div>
    
<Router>
    <Routes>
      
      <Route path="/" element={<Products />} />
      <Route path='/productdetails' element={<ProductDetails/>}/>
      <Route path='/proceedtopay' element={<ProceedtoPay />}/>

      {/* <Route path='/cart' element={<Cart />}/> */}
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