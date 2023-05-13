/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap';
// import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ShoppingCartIcon from '../ShoppingCartIcon';
import { logoutUser } from '../../redux/reducers/authSlice';
import { showToastify } from '../Toastify';
import ToastContext from '../ToastContext';

const CartContext = createContext();

const NavMenu = () => {
  const [user, setUser] = useState();
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  const { showToast, setShowToast } = useContext(ToastContext);

  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };
  const handleLogoutClick = () => {
    dispatch(logoutUser()).then((response) => {
      if (response.error) {
        showToastify(response.payload, 'error');
      } else {
        setShowToast(true);
        // showToastify('You have been successfully logged out', 'success');
        setUser('');
      }
    });
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  useEffect(() => {
    // localStorage.clear();
    if (!user) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, [user, setUser]);
  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Sales Forge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menu-font fw-bolder">
              <Nav.Link href="/dashboard">DASHBOARD</Nav.Link>
              <Nav.Link href="/products">SALES</Nav.Link>
              <Nav.Link href="/inventory">INVENTORY</Nav.Link>
              <Nav.Link href="/sales">BALANCE SHEET</Nav.Link>
              <Nav.Link href="/orders">ORDERS</Nav.Link>
              <Nav.Link href="/customers">CUSTOMERS</Nav.Link>
              <Nav.Link href="/employees">EMPLOYEES</Nav.Link>
              <Nav.Link href="/reports">REPORTS/ANALYTICS</Nav.Link>
              <Nav.Link href="/settings">SETTINGS</Nav.Link>
              <Nav.Link href="support">SUPPORT</Nav.Link>
              <Nav.Link href="/about">ABOUT</Nav.Link>
              <Nav.Link href="/shoppingcart">
                <CartContext.Provider value={{ cart, setCart }}>
                  <div>
                    <ShoppingCartIcon cartCount={cart.length} />
                  </div>
                </CartContext.Provider>
              </Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown bg="primary" title={(user !== undefined) && (user) ? `Welcome ${user.username}` : 'User'} id="basic-nav-dropdown" className="pe-5 me-5">
                {user ? (
                  <>
                    <Nav.Link to="/profile">Your Profile</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link onClick={() => handleLogoutClick()}>Logout</Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link onClick={() => handleLoginClick()}>Login</Nav.Link>
                    <Nav.Link onClick={() => handleRegisterClick()}>Signup</Nav.Link>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Register
        isOpen={registerModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        onRequestClose={() => setRegisterModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
      />
      <Login
        isOpen={loginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setLoginModalOpen={setLoginModalOpen}
      />
    </div>
  );
};

NavMenu.propTypes = {};

NavMenu.defaultProps = {};

export default NavMenu;
