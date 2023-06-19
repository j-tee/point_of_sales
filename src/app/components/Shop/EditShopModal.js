/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import ToastContext from '../ToastContext';
import { updateShop } from '../../redux/reducers/shopSlice';
import { showToastify } from '../Toastify';

const EditShopModal = (props) => {
  const {
    shop, isOpen, setShopUpdateModalOpen, onRequestClose, calculateModalPosition,
  } = props;
  const [updatedName, setUpdatedName] = useState(shop.name);
  const [updatedAddress, setUpdatedAddress] = useState(shop.address);
  const { setShowToast } = useContext(ToastContext);
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();

  const handleUpdateShop = () => {
    const shopObj = {
      ...shop, id: shop.id, name: updatedName, updatedAddress,
    };
    dispatch(updateShop(shopObj)).then((res) => {
      if (!res.error) {
        setShowToast(true);
        showToastify('Shop details successfully updated', 'success');
        setShopUpdateModalOpen(false);
      } else if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to update shop details', 'error');
        }
      }
    });
  };

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
      setUpdatedAddress(shop.address);
      setUpdatedName(shop.name);
    }
  }, [calculateModalPosition, isOpen, shop.address, shop.name]);
  return (
    <Container>
      <Modal show={isOpen} onHide={onRequestClose} size="md" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <span>
            <h4>
              Edit Details of
              {' '}

              {shop.name}
            </h4>
          </span>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateShop}>
            <Row>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter shop name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  required
                />
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  placeholder="Enter shop address"
                  value={updatedAddress}
                  onChange={(e) => setUpdatedAddress(e.target.value)}
                  required
                />
              </Col>
              <Col xs="auto">
                <Button type="submit">Update Shop</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EditShopModal;
