/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Modal, Form, Button,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../redux/reducers/authSlice';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';

const Register = (props) => {
  const {
    isOpen, setRegisterModalOpen, onRequestClose, calculateModalPosition,
  } = props;
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { setShowToast } = useContext(ToastContext);
  const [error, setError] = useState('');
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);

  const handleSubmit = (event) => {
    setShowToast(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (password !== confirmPassword) {
        showToastify('Password mismatch', 'error');
      } else {
        const userData = {
          username: name,
          email,
          password,
          password_confirmation: confirmPassword,
        };
        dispatch(registerUser(userData)).then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('You registration was successfully completed. You will receive an email with a link to confirm your account', 'sucess');
            setEmail('');
            setName('');
            setPassword('');
            setConfirmPassword('');
            setRegisterModalOpen(false);
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Your registration has failed, The email address you provided may have already been taken', 'error');
            }
          }
        }).catch((error) => {
          setError(error);
          showToastify(error.message, 'error');
        });
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} size="sm" style={{ marginTop: `${modalTop}px` }}>
      <Modal.Header closeButton>
        <Modal.Title>Register</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please enter your name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please enter a valid email address.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please enter a password.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            <Form.Control.Feedback type="invalid">
              Please confirm your password.
            </Form.Control.Feedback>
            {error && <div className="text-danger">{error}</div>}
          </Form.Group>

          <Modal.Footer>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Register;
