/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Form, Modal,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { showToastify } from './Toastify';
import { registerUser } from '../redux/reducers/authSlice';
import { getEmployees } from '../redux/reducers/employeeSlice';

const UserAccModal = (props) => {
  const {
    email, isOpen, setUserAccModalOpen, onRequestClose, calculateModalPosition, user, name,
  } = props;

  const [modalTop, setModalTop] = useState(0);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition, email]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setUserAccModalOpen(false);
  };

  const handleSubmit = (event) => {
    // setShowToast(true);
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
        dispatch(registerUser(userData)).then(() => {
          // showToast(message, isSuccessful ? 'sucess' : 'danger');
          dispatch(getEmployees(0));
          setPassword('');
          setConfirmPassword('');
        }).catch((error) => {
          setError(error);
          showToastify(error.message, 'error');
        });
      }
    }
  };

  return (
    <Modal show={isOpen} onHide={onRequestClose} size="md" style={{ marginTop: `${modalTop}px` }}>
      <Modal.Header closeButton>
        <span>User Profile</span>
      </Modal.Header>
      <Modal.Body>
        {user ? (
          <div className="user-profile">
            {/* <img src={user.picture} alt={user.name} /> */}
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        ) : (
          <>
            <Alert>
              {name}
              {' '}
              does not have a user account!!
            </Alert>
            <Form onSubmit={handleSubmit}>
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
              <Button type="submit" className="mt-2">Create Account</Button>
            </Form>

          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleCloseModal}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
UserAccModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setUserAccModalOpen: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};
export default UserAccModal;
