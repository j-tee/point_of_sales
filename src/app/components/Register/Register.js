/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import {
  Modal, Form, Button, Alert,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/reducers/authSlice';

const Register = (props) => {
  const {
    isOpen, setRegisterModalOpen, onRequestClose, calculateModalPosition,
  } = props;
  const { message, isSuccessful } = useSelector((state) => state.auth);
  const [validated, setValidated] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
      } else {
        const userData = {
          username: name,
          email,
          password,
          password_confirmation: confirmPassword,
        };
        dispatch(registerUser(userData)).then(() => {
          setRegisterModalOpen(false);
        }).catch((error) => {
          setError(error);
          console.error('An error occurred:', error);
        });
      }
    }
    setValidated(true);
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
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
            <Alert show={(message !== '')} dismissible variant={isSuccessful ? 'sucess' : 'danger'}>
              <p>
                {message}
              </p>
            </Alert>
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
