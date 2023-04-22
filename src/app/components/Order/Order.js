/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useEffect,
  useState,
  useCallback,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addOrder, getOrders } from '../../redux/reducers/orderSlice';

const Order = ({ stockId, trigger }) => {
  const { order } = useSelector((state) => state.order);
  const { customer } = useSelector((state) => state.customer) || {};

  const dispatch = useDispatch();
  // const [orderObject, setOrderObject] = useState({});
  const [params, setParams] = useState({});

  useEffect(() => {
    setParams({
      stock_id: stockId,
      customer_id: customer.id,
      status: 'pending',
      employee_id: 0,
    });
  }, [stockId, customer.id]);

  const dispatchAddOrder = useCallback(() => {
    dispatch(addOrder(params));
  }, [dispatch, params]);

  const dispatchGetOrders = useCallback(() => {
    dispatch(getOrders(params));
  }, [dispatch, params]);

  useEffect(() => {
    if (Object.keys(order).length === 0 && trigger) {
      Promise.all([dispatchAddOrder()])
        .then(() => console.log('Orders added and fetched successfully'))
        .catch((error) => console.log('Error:', error));
    }
  }, [dispatchAddOrder, dispatchGetOrders, params, customer.id, order, trigger]);

  return (
    <>
      <h4>
        {`Order ID: ${order.id ? order.id : 'XXXX'} Customer ID:${customer.id ? customer.id : 'XXXX'}`}
      </h4>
    </>
  );
};

Order.propTypes = {
  stockId: PropTypes.number.isRequired,
  trigger: PropTypes.number.isRequired,
};

export default Order;
