import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import ToastContext from './ToastContext';
import { showToastify } from './Toastify';
import { resetPassword } from '../redux/reducers/authSlice';

const ResetPasswordComponent = () => {
  const [validated, setValidated] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const { resetPasswordToken } = useParams(); // searchParams.get('reset_password_token');
  const handleSubmit = (event) => {
    setShowToast(true);
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === true) {
      if (password !== confirmPassword) {
        showToastify('Password mismatch', 'error');
      } else {
        const pwd = {
          password,
          password_confirmation: confirmPassword,
          reset_password_token: resetPasswordToken,
        };
        dispatch(resetPassword(pwd)).then((res) => {
          // setPassword('');
          // setConfirmPassword('');
          if (!res.error) {
            showToastify('Password reset was successful', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to reset password', 'error');
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
    <Container>
      <Form className="mt-5 pt-5" noValidate validated={validated} onSubmit={handleSubmit}>
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ResetPasswordComponent;
