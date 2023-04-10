/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import PropTypes from 'prop-types';
import Customer from '../Customer/Customer';
import { getOrders } from '../../redux/reducers/orderSlice';
import OrderLineItem from '../OrderLineItem/OrderLineItem';

const Order = (storeId, productId) => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const orderOject = {
    customer_id: 0,
    store_id: storeId,
    status: 'pending',
  };

  const updateOrderObject = (id) => {
    orderOject.customerId = id;
  };

  useEffect(() => {
    const params = {
      storeId,
      customerId: orderOject.customer_id,
    };
    if (params.customerId > 0) {
      dispatch(getOrders(params));
    }
  }, [dispatch, orderOject, storeId]);
  return (
    <>
      <Customer updateOrderObject={updateOrderObject} />
      <div>
        {orders && orders.map((order) => (
          <div key={order.id}>
            <h4>
              status:
              {' '}
              {order.status}
              total amount:
              {' '}
              {order.total}
            </h4>
            <OrderLineItem orderId={order.id} productId={productId} />
          </div>
        ))}
      </div>
    </>
  );
};

Order.propTypes = {};

Order.defaultProps = {};

export default Order;
