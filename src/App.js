/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from 'react-router-dom';
import NavMenu from './app/components/NavMenu/NavMenu';
import Home from './app/components/Home/Home';
import Dashboard from './app/components/Dashboard/Dashboard';
import Product from './app/components/Product/Product';
import Sale from './app/components/Sale/Sale';
import Order from './app/components/Order/Order';
import Customer from './app/components/Customer/Customer';
import Report from './app/components/Report/Report';
import Setting from './app/components/Setting/Setting';
import Support from './app/components/Support/Support';
import About from './app/components/About/About';
import Inventory from './app/components/Inventory/Inventory';
import Employee from './app/components/Employee/Employee';
import Receipt from './app/components/Receipt';
import Toast from './app/components/Toastify';
import { ToastProvider } from './app/components/ToastContext';

function App() {
  return (
    <ToastProvider>
      <NavMenu />
      <Toast />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/employees" element={<Employee />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/receipt/:orderId" element={<Receipt />} />
      </Routes>
    </ToastProvider>
  );
}

export default App;
