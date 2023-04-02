/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavMenu from './app/components/NavMenu/NavMenu';
import Home from './app/components/Home/Home';

function App() {
  return (
    <>
      <NavMenu />
      <Router>
        <ToastContainer position="top-center" theme="colored" />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
