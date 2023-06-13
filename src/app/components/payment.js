/* eslint-disable max-len */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Col, Form, Modal, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPayment } from '../redux/reducers/paymentSlice';
import ToastContext from './ToastContext';
import { showToastify } from './Toastify';

const Payment = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setPaymentModalOpen,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  const { customer } = useSelector((state) => state.customer);
  const { lineItems } = useSelector((state) => state.orderline);
  const [amount, setAmount] = useState(0);
  const [paymentObject, setPaymentObject] = useState({});
  const [paymentType, setPaymentType] = useState('cash');
  const [orderId, setOrderId] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const { setShowToast } = useContext(ToastContext);

  useEffect(() => {
    if (isOpen) {
      setModalTop(calculateModalPosition());
      setAmount(lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.amount_payable), 0));
      setOrderId(lineItems[0].attributes.order_id);
      setPaymentType('cash');
    }
  }, [isOpen, calculateModalPosition, lineItems]);

  const handlePaymentSubmit = (event) => {
    setSubmitted(true, () => { // Use callback function with setSubmitted
      event.preventDefault();
      setPaymentModalOpen(false);
    });
  };

  const handleButtonClick = () => {
    setPaymentObject((prevParams) => ({
      ...prevParams,
      amount,
      payment_type: paymentType,
      order_id: orderId,
    }));
  };

  useEffect(() => {
    if (Object.keys(paymentObject).length > 0) {
      dispatch(addPayment(paymentObject))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('Payment added successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to add payment', 'error');
            }
          }
          navigate(`/receipt/${orderId}`); // Fix template string
        });
    }
  }, [paymentObject, dispatch, submitted, navigate, orderId]); // Include storeId and orderId in dependencies

  return (
    <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
      <Modal.Header closeButton>
        <Modal.Title className="text-muted">
          Order Confirmation and Payment -
          {' '}
          {customer.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Product</th>
              <th>Total Cost</th>
              <th>Discount</th>
              <th>Tax</th>
              <th>Amt Payable</th>
            </tr>
          </thead>
          <tbody>
            {lineItems.length > 0 ? (
              lineItems.map((item) => (
                <tr key={item.attributes.id}>
                  <td>{item.attributes.product_name}</td>
                  <td>
                    GHS
                    {parseFloat(item.attributes.total_amount).toFixed(2)}
                  </td>
                  <td>
                    GHS
                    {parseFloat(item.attributes.total_discount).toFixed(2)}
                  </td>
                  <td>
                    GHS
                    {parseFloat(item.attributes.total_tax).toFixed(2)}
                  </td>
                  <td>
                    GHS
                    {parseFloat(item.attributes.amount_payable).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No line items found.</td>
              </tr>
            )}
            <tr>
              <td>TOTAL</td>
              <td>
                GHS
                {' '}
                {lineItems && lineItems.reduce((acc, item) => acc + Number(item.attributes.total_amount), 0).toFixed(2)}
              </td>
              <td>
                GHS
                {' '}
                {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.total_discount), 0).toFixed(2)}
              </td>
              <td>
                GHS
                {' '}
                {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.total_tax), 0).toFixed(2)}
              </td>
              <td>
                GHS
                {' '}
                {lineItems && lineItems.reduce((acc, item) => acc + parseFloat(item.attributes.amount_payable), 0).toFixed(2)}

              </td>
            </tr>
          </tbody>
        </Table>
        <Form onSubmit={handlePaymentSubmit}>
          <Row>
            <Col md={8}>
              <Form.Group>
                <Form.Control type="number" name="amount" disabled value={amount} onChange={(event) => setAmount(event.target.value)} />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Button onClick={handleButtonClick}>Make Payment</Button>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

Payment.propTypes = {};

Payment.defaultProps = {};

export default Payment;
