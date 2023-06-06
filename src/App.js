/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NavMenu from './app/components/NavMenu/NavMenu';
import Home from './app/components/Home/Home';
import Dashboard from './app/components/Dashboard/Dashboard';
import Product from './app/components/Product/Product';
import Sale from './app/components/Sale/Sale';
import Report from './app/components/Report/Report';
import Setting from './app/components/Setting/Setting';
import Support from './app/components/Support/Support';
import About from './app/components/About/About';
import Inventory from './app/components/Inventory/Inventory';
import Employee from './app/components/Employee/Employee';
import Receipt from './app/components/Receipt';
import Toast, { showToastify } from './app/components/Toastify';
import { ToastProvider } from './app/components/ToastContext';
import Email from './app/components/Email';
import Header from './app/components/Header';
import ResetPasswordComponent from './app/components/ResetPasswordComponent';
import OrderDetails from './app/components/Order/OrderDetails';
import CustomerDetail from './app/components/CustomerDetail';
import PaymentDetails from './app/components/PaymentDetails';
// import { resetMessage } from './app/redux/reducers/authSlice';

function App() {
  const { message, isSuccessful } = useSelector((state) => state.auth);
  // const dispatch = useDispatch();
  useEffect(() => {
    if (message !== undefined && message !== null && isSuccessful === true) {
      showToastify(message, isSuccessful ? 'success' : 'danger');
      // setRegisterModalOpen(false);
      // dispatch(resetMessage());
    }
  }, [message, isSuccessful]);
  return (
    <ToastProvider>
      <NavMenu />
      <Toast />
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/orders" element={<OrderDetails />} />
        <Route path="/customers" element={<CustomerDetail />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/email" element={<Email />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/payments" element={<PaymentDetails />} />
        <Route path="/receipt/:orderId" element={<Receipt />} />
        <Route path="/resetPassword/:resetPasswordToken" element={<ResetPasswordComponent />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
