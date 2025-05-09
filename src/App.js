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
import ScrollTop from './components/AutoScroll';
import BankSearch from './components/payment/netbank';
import DebitCardForm from './components/payment/DebitCardForm';
import ImageDashboard from './components/AdminDashboard/ImageDashboard';
import DashboardContent from './components/AdminDashboard/DashboardContent';
import DashboardLayout from './components/AdminDashboard/DashboardLayout';
import OrderList from './components/AdminDashboard/orderlist';
import ProtectedRoute from './components/protectedRoute';
import CategoryList from './components/AdminDashboard/categorylist';
import StoreInformation from './components/AdminDashboard/storeinformation';
import CustomerList from './components/AdminDashboard/CustomerList';
import AccountSettings from './components/AdminDashboard/AccountSettings';

function App() {
  const location = useLocation();
  const excludedRoutes = ['/search', '/adminlogin', '/admindashboard', '/orderconfirmation','/dashboard',
    '/dashboard/orderlist', '/dashboard/admindashboard','/dashboard/imagedashboard','/dashboard/accountsettings', "/dashboard/categorylist", "/dashboard/customerlist", "/dashboard/storeinformation"];

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
        {/* <Route path="/admindashboard" element={<AdminProductDashboard />} /> */}
        <Route path="/netbank" element={<BankSearch />} />
        <Route path="/debitcard" element={<DebitCardForm />} />
        <Route path="/imagedashboard" element={<ImageDashboard />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardContent />} /> {/* Default page */}

          <Route path="orderlist" element={<OrderList />} />
          <Route path="admindashboard" element={<AdminProductDashboard />} />
          <Route path="imagedashboard" element={<ImageDashboard />} />
          <Route path="categorylist" element={<CategoryList />} />
          <Route path="storeinformation" element={<StoreInformation />} />
          <Route path="customerlist" element={<CustomerList />} />
          <Route path="accountsettings" element={<AccountSettings/>} />




        </Route>
        <Route
          path="/dashboard/orderlist"
          element={
            <ProtectedRoute>
              <OrderList />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!excludedRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <ScrollTop />
      <App />
    </Router>
  );
}