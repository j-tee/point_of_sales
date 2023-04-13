/* eslint-disable max-len */
/* eslint-disable no-debugger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Table } from 'react-bootstrap';
import { addOrderLineItem, getOrderLineItems } from '../../redux/reducers/orderlineSlice';

const OrderLineItem = ({ productId, trigger }) => {
  const { lineItems } = useSelector((state) => state.orderline);
  const { customer } = useSelector((state) => state.customer);
  const { order } = useSelector((state) => state.order) || {};
  const { lineItem } = useSelector((state) => state.orderline) || {};
  const [orderObject, setOrderObject] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (trigger && order.id) {
      dispatch(addOrderLineItem({ product_id: productId, order_id: order.id, quantity: 1 }));
    }
  }, [dispatch, productId, trigger, order.id]);

  useEffect(() => {
    // debugger;
    setOrderObject(order);
    dispatch(getOrderLineItems({ orderId: order.id, customerId: customer.id, productId }));
  }, [dispatch, lineItem, order.id, productId, trigger, order, orderObject.id, customer.id]);
  return (
    <div className="p-3">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>TranID</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

OrderLineItem.propTypes = {
  productId: PropTypes.number.isRequired,
  trigger: PropTypes.number.isRequired,
};

export default OrderLineItem;
