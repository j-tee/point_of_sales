/* eslint-disable import/no-extraneous-dependencies */
import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  Github, Linkedin, Twitter,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import Register from '../Register/Register';
import Login from '../Login/Login';
import ShoppingCartIcon from '../ShoppingCartIcon';
import { logoutUser } from '../../redux/reducers/authSlice';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';
import UserProfile from '../UserProfile';
import SessionValidation from '../sessionValidation';

const CartContext = createContext();

const NavMenu = () => {
  const { user } = useSelector((state) => state.auth);
  const [userObject, setUserObject] = useState(user);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [userProfileModalOpen, setUserProfileModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const { showToast, setShowToast } = useContext(ToastContext);
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();

  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };
  const handleUserProfileClick = () => {
    setUserProfileModalOpen(true);
  };
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };
  const handleLogoutClick = () => {
    dispatch(logoutUser()).then((response) => {
      setShowToast(true);
      if (response.error) {
        localStorage.removeItem('user');
        localStorage.removeItem('headers');
        setUserObject('');
        showToastify('User log out action failed. Session may have already expired: All previous session data will be deleted', 'error');
      } else {
        showToastify('User logged out successfully', 'success');
        setUserObject('');
        localStorage.clear();
      }
    });
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  useEffect(() => {
    setUserObject(JSON.parse(localStorage.getItem('user')));
    console.log('userObject in useEffect=======', userObject);
  }, []);
  useEffect(() => {
    if (userObject) {
      if (!SessionValidation.validateToken()) {
        setShowToast(true);
        localStorage.clear();
        showToastify('Session has expired', 'error');
      }
    }
  }, [setShowToast, userObject]);
  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Sales Forge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto menu-font fw-bolder">
              <Link to="/dashboard">DASHBOARD</Link>
              <Link to="/products">SALES</Link>
              <Link to="/inventory">INVENTORY</Link>
              <Link to="/sales">BALANCE SHEET</Link>
              <Link to="/orders">ORDERS</Link>
              <Link to="/customers">CUSTOMERS</Link>
              <Link to="/employees">EMPLOYEES</Link>
              <Link to="/payments">PAYMENTS</Link>
              <Link to="/reports">REPORTS/ANALYTICS</Link>
              <Link to="/settings">SETTINGS</Link>
              <Link to="support">SUPPORT</Link>
              <Link to="/about">ABOUT</Link>
              <Link to="/shoppingcart">
                <CartContext.Provider value={{ cart, setCart }}>
                  <div>
                    <ShoppingCartIcon cartCount={cart.length} />
                  </div>
                </CartContext.Provider>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="sub-menu">
        <span className="social">
          <Linkedin className="linked-in" color="royalblue" size={16} />
          &nbsp;
          <Github color="royalblue" size={14} />
          &nbsp;
          <Twitter color="royalblue" size={16} />
        </span>
        <span>
          <NavDropdown bg="primary" title={userObject ? `Welcome ${userObject.username}` : 'Log In/Sign Up'} id="basic-nav-dropdown" className="pe-5 me-5">
            {userObject ? (
              <>
                <Nav.Link onClick={() => handleUserProfileClick()}>Your Profile</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link onClick={() => handleLogoutClick()}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link onClick={() => handleLoginClick()}>Login</Nav.Link>
                <NavDropdown.Divider />
                <Nav.Link onClick={() => handleRegisterClick()}>Signup</Nav.Link>
              </>
            )}
          </NavDropdown>
        </span>
      </div>
      <UserProfile
        isOpen={userProfileModalOpen}
        setUserProfileModalOpen={setUserProfileModalOpen}
        onRequestClose={() => setUserProfileModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
      />
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
