/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import {
  Modal, Form, Button, Nav,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { PropTypes } from 'prop-types';
import { loginUser } from '../../redux/reducers/authSlice';
import 'react-toastify/dist/ReactToastify.css';
import { showToastify } from '../Toastify';
import ToastContext from '../ToastContext';

const Login = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setLoginModalOpen,
  } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setShowToast } = useContext(ToastContext);
  const [validated, setValidated] = useState(false);
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);

  const handleSubmit = (event) => {
    setShowToast(true);
    event.preventDefault();
    event.stopPropagation();
    const userData = {
      email,
      password,
    };
    dispatch(loginUser(userData)).then((response) => {
      setShowToast(true);
      console.log('response ====>', response);
      if (response.error) {
        showToastify(`Login failure!! ${response.payload}`, 'error');
      } else {
        setLoginModalOpen(false);
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
    }).catch((error) => {
      showToastify(error.message, 'error');
    });
    setValidated(true);
  };

  return (
    <>
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
            <Modal.Footer>
              <span><Nav.Link href="/email">Forgotten your password?</Nav.Link></span>
              <Button variant="primary" type="submit">
                Login
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

Login.propTypes = {
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setLoginModalOpen: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};

Login.defaultProps = {};

export default Login;
