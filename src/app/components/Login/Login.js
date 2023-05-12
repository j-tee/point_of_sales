/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { loginUser } from '../../redux/reducers/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { showToastify } from '../Toastify';

const Login = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setLoginModalOpen,
  } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    // add validation logic here
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (password !== confirmPassword) {
        // setError();
        showToastify('Password mismatch', 'error');
        // toast.error('Passwords do not match');
      } else {
        // perform registration logic here
        const userData = {
          email,
          password,
        };

        dispatch(loginUser(userData)).then(() => {
          setLoginModalOpen(false);
          showToastify('Login successful!', 'success');
          const user = localStorage.getItem('user');
          navigate(location.pathname);
        }).catch((error) => {
          // toast.error(error.message);
          showToastify('error.message', 'error');
        });
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} size="sm" style={{ marginTop: `${modalTop}px` }}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Login.propTypes = {};

Login.defaultProps = {};

export default Login;
