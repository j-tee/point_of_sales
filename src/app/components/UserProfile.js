/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { getCurrentUser } from '../redux/reducers/authSlice';

const UserProfile = (props) => {
  const {
    isOpen, setRegisterModalOpen, onRequestClose, calculateModalPosition,
  } = props;
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const dispatch = useDispatch();
  const [modalTop, setModalTop] = useState(0);
  useEffect(() => {
    if (!user) {
      dispatch(getCurrentUser()).then((response) => {
        setUser(response.payload);
      });
    }
  }, [dispatch, user]);
  return (
    <Modal show={isOpen} onHide={onRequestClose} size="md" style={{ marginTop: `${modalTop}px` }}>
      <Modal.Header closeButton>
        <span>User Profile</span>
      </Modal.Header>
      <Modal.Body>
        <div className="user-profile">
          <img src={user.picture} alt={user.name} />
          <h2>{user.username}</h2>
          <p>{user.email}</p>
        </div>
      </Modal.Body>
    </Modal>

  );
};

export default UserProfile;
