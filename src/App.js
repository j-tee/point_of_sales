/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

function App() {
  return (
    <>
      <NavMenu />
      <ToastContainer position="top-center" theme="colored" />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/products" element={<Product />} />
        <Route path="/sales" element={<Sale />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/customers" element={<Customer />} />
        <Route path="/reports" element={<Report />} />
        <Route path="/settings" element={<Setting />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </>
  );
}

export default App;
