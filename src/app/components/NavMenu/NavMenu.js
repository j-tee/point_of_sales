/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const NavMenu = () => {
  const { user } = useSelector((state) => state.auth.user) ?? {};
  return (
    <div>
      <Navbar bg="primary" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Sales Forge</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link to="/">Dashboard</Nav.Link>
              <Nav.Link href="#link">Products</Nav.Link>
              <Nav.Link href="#link">Sales</Nav.Link>
              <Nav.Link href="#link">Orders</Nav.Link>
              <Nav.Link href="#link">Customers</Nav.Link>
              <Nav.Link href="#link">Reports/Analytics</Nav.Link>
              <Nav.Link href="#link">Settings</Nav.Link>
              <Nav.Link href="#link">Support</Nav.Link>
              <Nav.Link href="#link">About</Nav.Link>
            </Nav>
            <Nav>
              <NavDropdown bg="primary" title="User" id="basic-nav-dropdown" className="pe-5 me-5">
                {user && (
                <>
                  <NavDropdown.Item><Nav.Link to="/user">User</Nav.Link></NavDropdown.Item>
                  <NavDropdown.Item>
                    <Nav.Link to="/user">User</Nav.Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </>
                )}
                {user ? (
                  <>
                    <NavDropdown.Item><Nav.Link to="/user">User</Nav.Link></NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link to="/profile">{user.username}</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item><Nav.Link to="/logout">Logout</Nav.Link></NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                  </>
                ) : (
                  <>
                    <NavDropdown.Item>
                      <Nav.Link to="/login">Login</Nav.Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Nav.Link to="/register">Signup</Nav.Link>
                    </NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

NavMenu.propTypes = {};

NavMenu.defaultProps = {};

export default NavMenu;
