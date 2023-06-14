/* eslint-disable react/prop-types */
import { Details, Edit } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import {
  Alert, Button, Col, Container, Form, Modal, Row, Table,
} from 'react-bootstrap';
import { Trash3 } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { showToastify } from './Toastify';
import { addDamages, getDamages } from '../redux/reducers/inventorySlice';
import ToastContext from './ToastContext';

const DamageModal = (props) => {
  const {
    isOpen, damages, productId, onRequestClose, calculateModalPosition, setDamageModalOpen, qty,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  const [category, setCategory] = useState();
  const [quantity, setQuantity] = useState(qty);
  const [damageDate, setDamageDate] = useState();
  const { setShowToast } = useContext(ToastContext);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
      setDamageModalOpen(true);
    }
  }, [isOpen, calculateModalPosition, setDamageModalOpen]);

  const handleDamageSubmit = () => {
    const damageObj = {
      damages: {
        category,
        product_id: productId,
        damage_date: damageDate,
        quantity,
      },
    };
    dispatch(addDamages(damageObj)).then((res) => {
      setShowToast(true);
      if (!res.error) {
        showToastify('Database successfully updated', 'success');
        dispatch(getDamages(productId));
      } else if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to update database, Data was not saved', 'error');
        }
      }
    });
  };
  return (
    <Container>
      <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <Modal.Title>Damages</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="d-flex justify-content-between align-items-center">
              <Col>
                <Form.Group>
                  <Form.Control as="select" value={category} onChange={(e) => setCategory(e.target.value)}>
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
                  <Form.Control type="date" placeholder="Damage Date" value={damageDate} onChange={(e) => setDamageDate(e.target.value)} required />
                </Form.Group>
              </Col>
              <Col>
                <Button onClick={handleDamageSubmit}>Submit</Button>
              </Col>
            </Row>
          </Form>
          <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {damages ? (damages.map((damage) => (
                <tr key={damage.id}>
                  <td>{damage.id}</td>
                  <td>{damage.category}</td>
                  <td>{damage.quantity}</td>
                  <td className="d-flex justify-content-between align-items-center">
                    <Button variant="outline"><Trash3 color="white" size={16} /></Button>
                    <Button variant="outline"><Edit color="white" size={16} /></Button>
                    <Button variant="outline"><Details color="white" size={16} /></Button>
                  </td>
                </tr>
              ))) : <Alert>No Records Found!!!</Alert>}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer />
      </Modal>
    </Container>
  );
};

export default DamageModal;
