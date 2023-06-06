/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { useDispatch } from 'react-redux';
import { addPayment } from '../redux/reducers/paymentSlice';

const UpdatePaymentModal = (props) => {
  const {
    amtDue, orderId, isOpen, setUpdatePaymentModalOpen, onRequestClose, calculateModalPosition, getOrderPayments,
  } = props;
  const [paymentType, setPaymentType] = useState('Cash');
  // const [params, setParams] = useState();
  const [modalTop, setModalTop] = useState(0);
  const dispatch = useDispatch();

  const handlePaymentTypeChange = (e) => {
    const { value } = e.target;
    setPaymentType(value);
  };

  const handleMakePayment = (e) => {
    e.preventDefault();
    // setParams((prevParams) => ({
    //   ...prevParams,
    //   amount: amtDue,
    //   order_id: orderId,
    //   payment_type: paymentType,
    // }));
    dispatch(addPayment({ payment: { amount: amtDue, order_id: orderId, payment_type: paymentType } }))
      .then(() => {
        setUpdatePaymentModalOpen(false);
        getOrderPayments();
      });
  };

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
    }
  }, [isOpen, calculateModalPosition]);

  return (
    <Container>
      <Form>
        <Modal show={isOpen} onHide={onRequestClose} size="md" style={{ marginTop: `${modalTop}px` }}>
          <Modal.Header closeButton>
            <span><h2>Payment</h2></span>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>Order ID</Col>
              <Col>Amount Due</Col>
              <Col>&nbsp;</Col>
            </Row>
            <Row>
              <Col><h4>{orderId}</h4></Col>
              <Col><h4>{amtDue}</h4></Col>
              <Col>
                <Form.Group>
                  <Form.Control as="select" value={paymentType} onChange={handlePaymentTypeChange} name="store">
                    <option value="">-- Select Payment Type --</option>
                    <option value="Credit/Debit Card">Credit/Debit Card</option>
                    <option value="Mobile Money">Mobile Money</option>
                    <option value="Cash">Cash</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleMakePayment}>Make Payment</Button>
          </Modal.Footer>
        </Modal>
      </Form>
    </Container>
  );
};
UpdatePaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  calculateModalPosition: PropTypes.func.isRequired,
  setUpdatePaymentModalOpen: PropTypes.func.isRequired,
  amtDue: PropTypes.number.isRequired,
  orderId: PropTypes.number.isRequired,
  getOrderPayments: PropTypes.func.isRequired,
};
export default UpdatePaymentModal;
