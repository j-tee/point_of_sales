/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { getTaxes } from '../redux/reducers/taxSlice';
import { ComponentToPrint } from './print/ComponentToPrint';

const Receipt = () => {
  const { taxes } = useSelector((state) => state.tax);
  const { lineItems } = useSelector((state) => state.orderline);
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const componentRef = useRef();
  const navigate = useNavigate();
  const handleRectToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useEffect(() => {
    dispatch(getTaxes(orderId));
  }, [orderId, dispatch]);

  useEffect(() => {
    if (taxes) {
      handleRectToPrint();
    }
    navigate('/products');
  }, []);
  return (
    <div style={{ display: 'none' }}>
      <ComponentToPrint taxes={taxes} lineItems={lineItems} ref={componentRef} />
    </div>
  );
};

export default Receipt;
