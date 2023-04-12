/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

const OrderLineItem = ({ productId }) => {
  const { order } = useSelector((state) => state.order) || {};
  const dispatch = useDispatch();
  useEffect(() =>{

  })
  return (
    <div>
      <h1>Order Line Items</h1>
      {order.id}
      {' '}
      {productId}
    </div>
  );
};

OrderLineItem.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default OrderLineItem;
