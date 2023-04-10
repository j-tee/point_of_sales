/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';

const OrderLineItem = ({ orderId, productId }) => {
  console.log(orderId, productId);
  return (
    <div>
      <h1>Order Line Items</h1>
      {orderId}
      {' '}
      {productId}
    </div>
  );
};

OrderLineItem.propTypes = {
  orderId: PropTypes.number.isRequired,
  productId: PropTypes.number.isRequired,
};

export default OrderLineItem;
