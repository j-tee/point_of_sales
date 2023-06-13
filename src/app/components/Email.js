/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Container, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { requestPasswordReset } from '../redux/reducers/authSlice';
import ToastContext from './ToastContext';

const Email = () => {
  const { message, isSuccessful } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [validated, setValidated] = useState(false);
  const dispatch = useDispatch();
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(requestPasswordReset(email));
    setValidated(true);
  };
  useEffect(() => {
    if (isSuccessful) {
      setShowToast(true);
    }
  }, [isSuccessful, message, setShowToast]);
  return (
    <Container>
      <Form className="email-form pe-5 ps-5 me-5 ms-5 mt-5" noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Form.Control.Feedback type="invalid">
            Please enter a valid email address.
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Email;
