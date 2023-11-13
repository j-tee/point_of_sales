/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateDamages } from '../redux/reducers/inventorySlice';
import { showToastify } from './Toastify';
import ToastContext from './ToastContext';

const EditDamageModal = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setEditDamageModalOpen, damage,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState();
  const [damageDate, setDamageDate] = useState();
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen && damage) {
      setModalTop(calculateModalPosition());
      setEditDamageModalOpen(true);
      setCategory(damage.attributes.category);
      setDamageDate(damage.attributes.damage_date);
      setQuantity(damage.attributes.quantity);
    }
  }, [isOpen, calculateModalPosition, damage, setEditDamageModalOpen]);

  const handleDamageSubmit = () => {
    setShowToast(true);
    const damages = {
      id: damage.id,
      product_id: damage.attributes.product_id,
      category,
      quantity,
      damage_date: damageDate,
    };
    dispatch(updateDamages({ damages })).then((res) => {
      if (!res.error) {
        showToastify('Damages information updated', 'sucess');
        setEditDamageModalOpen(false);
      } else if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to update information on selected record', 'error');
        }
      }
    });
  };
  return (
    <Container>
      <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit Details of
            {' '}
            {damage && damage.attributes.product_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="d-flex justify-content-between align-items-center">
              <Col>
                <Form.Group>
                  <Form.Control as="select" name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">---Select Category---</option>
                    <option value="Breakages">Breakages</option>
                    <option value="Theft">Theft</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="number"
                    placeholder="Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control type="date" name="damage_date" placeholder="Damage Date" value={damageDate} onChange={(e) => setDamageDate(e.target.value)} required />
                </Form.Group>
              </Col>
              <Col>
                <Button onClick={handleDamageSubmit}>Submit</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EditDamageModal;
