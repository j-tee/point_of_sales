/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ToastContext from './ToastContext';
import { addUserToRole, removeRole } from '../redux/reducers/authSlice';
import { showToastify } from './Toastify';

const RoleModal = (props) => {
  const { message } = useSelector((state) => state.auth);
  const [modalTop, setModalTop] = useState(0);
  const [role, setRole] = useState();
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  const {
    user, isOpen, setRoleModalOpen, onRequestClose, calculateModalPosition, roles,
  } = props;

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition, dispatch, setShowToast]);

  const handleAddUserToRole = (event) => {
    setShowToast(true);
    event.preventDefault();
    event.stopPropagation();
    if (user) {
      const roleObj = {
        users_roles: {
          user_id: user.id,
          role_id: role,
        },
      };
      dispatch(addUserToRole(roleObj))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('User added to role successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify(message || 'User may have already been added to the selected role', 'error');
            }
          }
        });
      setRoleModalOpen(true);
    } else {
      showToastify('User either not logged in or the session has expired', 'error');
    }
  };

  const handleRemoveRole = () => {
    const roleObj = {
      user_id: user.id,
      role_id: role,
    };
    dispatch(removeRole(roleObj)).then((res) => {
      setShowToast(true);
      if (!res.error) {
        showToastify('Removed user from role successfully', 'success');
      } else if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to remove user from role', 'error');
        }
      }
    });
  };

  return (
    <Container>
      <Form>
        <Modal show={isOpen} onHide={onRequestClose} size="md" style={{ marginTop: `${modalTop}px` }}>
          <Modal.Header closeButton>
            <span><h4>Select a Role</h4></span>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Row>
                <Col>
                  <Form.Control as="select" name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">---Select Role---</option>
                    {roles && roles.map((role) => (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col className="d-flex justify-content-between align-items-center">
                  <Button onClick={(e) => handleAddUserToRole(e)}>Add Role</Button>
                  <Button onClick={() => handleRemoveRole()}>Remove Role</Button>
                </Col>
              </Row>
            </Form.Group>
          </Modal.Body>
        </Modal>
      </Form>
    </Container>
  );
};
RoleModal.defaultProps = {};
export default RoleModal;
