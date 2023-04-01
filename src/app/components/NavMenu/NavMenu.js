/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  Container, Nav, NavDropdown, Navbar,
} from 'react-bootstrap';

const NavMenu = () => (
  <div>
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Dashboard</Nav.Link>
            <Nav.Link href="#link">Products</Nav.Link>
            <Nav.Link href="#link">Sales</Nav.Link>
            <Nav.Link href="#link">Orders</Nav.Link>
            <Nav.Link href="#link">Customers</Nav.Link>
            <Nav.Link href="#link">Reports/Analytics</Nav.Link>
            <Nav.Link href="#link">Settings</Nav.Link>
            <Nav.Link href="#link">Support</Nav.Link>
            <Nav.Link href="#link">About</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </div>
);

NavMenu.propTypes = {};

NavMenu.defaultProps = {};

export default NavMenu;
