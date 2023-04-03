/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from 'react';
import {
  Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Register from '../Register/Register';
import Login from '../Login/Login';

const NavMenu = () => {
  const { user } = useSelector((state) => state.auth) ?? {};
  console.log('USER=>', user);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };
  const handleRegisterClick = () => {
    setRegisterModalOpen(true);
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };
  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/">Sales Forge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/products">Products</Nav.Link>
              <Nav.Link href="/sales">Sales</Nav.Link>
              <Nav.Link href="/orders">Orders</Nav.Link>
              <Nav.Link href="/customers">Customers</Nav.Link>
              <Nav.Link href="/reports">Reports/Analytics</Nav.Link>
              <Nav.Link href="/settings">Settings</Nav.Link>
              <Nav.Link href="support">Support</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown bg="primary" title={user ? `Welcome ${user.username}` : 'User'} id="basic-nav-dropdown" className="pe-5 me-5">
                {user ? (
                  <>
                    <NavDropdown.Item>
                      <Nav.Link to="/profile">Your Profile</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item>
                      <Nav.Link to="/logout">Logout</Nav.Link>
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <Nav.Link to="/login" onClick={() => handleLoginClick()}>Login</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link to="/register" onClick={() => handleRegisterClick()}>Signup</Nav.Link>
                    </NavDropdown.Item>
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
