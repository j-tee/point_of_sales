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
              <Nav.Link href="/dashboard">DASHBOARD</Nav.Link>
              <Nav.Link href="/products">PRODUCTS</Nav.Link>
              <Nav.Link href="/inventory">INVENTORY</Nav.Link>
              <Nav.Link href="/sales">SALES</Nav.Link>
              <Nav.Link href="/orders">ORDERS</Nav.Link>
              <Nav.Link href="/customers">CUSTOMERS</Nav.Link>
              <Nav.Link href="/reports">REPORTS/ANALYTICS</Nav.Link>
              <Nav.Link href="/settings">SETTINGS</Nav.Link>
              <Nav.Link href="support">SUPPORT</Nav.Link>
              <Nav.Link href="/about">ABOUT</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown bg="primary" title={user ? `Welcome ${user.username}` : 'User'} id="basic-nav-dropdown" className="pe-5 me-5">
                {user ? (
                  <>
                    <Nav.Link to="/profile">Your Profile</Nav.Link>
                    <NavDropdown.Divider />
                    <Nav.Link to="/logout">Logout</Nav.Link>
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
