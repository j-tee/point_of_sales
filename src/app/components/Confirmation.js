import React, { useContext, useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import ToastContext from './ToastContext';
import { showToastify } from './Toastify';

const Confirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState();
  const { setShowToast } = useContext(ToastContext);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const result = searchParams.get('result');

    if (result === 'success') {
      setMessage('Confirmation was successful');
      setShowToast(true);
      showToastify('Confirmation was successful', 'success');
    } else if (result === 'failure') {
      setMessage('Confirmation failed');
      showToastify('Confirmation failed', 'success');
    } else {
      setMessage('Unknown Error');
      showToastify('Unknown error', 'information');
    }
  }, [location.search, navigate, setShowToast]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      navigate('/');
    }
  }, [countdown, navigate]);

  return (
    <Container className="pt-5 mt-5">
      <h6>{message}</h6>
      <p>
        Redirecting to the home page in
        {' '}
        <strong>
          {countdown}
          {' '}
          seconds
        </strong>
        ...
      </p>
    </Container>
  );
};

export default Confirmation;
