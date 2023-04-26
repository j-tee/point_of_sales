import React from 'react';
import { useSelector } from 'react-redux';

const Receipt = ({storeId, orderId}) => {
  const {taxes}=useSelector((state) => state.tax);
  return (
    <div>Receipt</div>
  );
};

export default Receipt;
