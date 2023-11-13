/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, FormLabel, FormControl, Row,
} from 'react-bootstrap';
// import Casual from 'casual-browserify';
import {
  addCustomer, getCustomer, getCustomers, resetCustomer,
} from '../../redux/reducers/customerSlice';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';

const Customer = ({ setAddToCartButtonStatus, storeId }) => {
  const { customer, customers } = useSelector((state) => state.customer) || {};
  // const [customerId, setCustomerId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [customerId, setCustomerId] = useState(0);
  const dispatch = useDispatch();
  const { setShowToast } = useContext(ToastContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      const customer = {
        name, email, phone, store_id: storeId, address,
      };
      dispatch(addCustomer(customer))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('new customer created successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to add customer. Please make sure a shop/store is selected', 'error');
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          }
          dispatch(getCustomers(storeId));
        });
    }
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };
  const startTransaction = () => {
    if (!isChecked && initialLoad) {
      setAddToCartButtonStatus(false);
      const customerObject = {
        name: 'N/A',
        email: 'N/A',
        phone: 'N/A',
        address: 'N/A',
        store_id: storeId,
      };
      dispatch(addCustomer(customerObject))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('New customer created successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to add customer. Please make sure a shop/store is selected', 'error');
              setTimeout(() => {
                window.location.reload();
              }, 5000);
            }
          }
        });
      setInitialLoad(false);
    }
  };
  const completeTransaction = () => {
    setAddToCartButtonStatus(true);
    dispatch(resetCustomer());
    setInitialLoad(true);
    window.location.reload();
  };

  const handleCustomerChange = (event) => {
    setAddToCartButtonStatus(false);
    const { value } = event.target;
    setCustomerId(value);
    dispatch(getCustomer(parseInt(value, 10)))
      .then((res) => {
        setName(res.payload.name);
        setAddress(res.payload.address);
        setPhone(res.payload.phone);
        setEmail(res.payload.email);
      });
  };

  useEffect(() => {
    dispatch(getCustomers(storeId));
  }, [dispatch, storeId]);
  return (
    <div>
      <Row className="pe-3 ps-3">
        {Object.keys(customer).length === 0 ? <Button variant="success" onClick={startTransaction}>Start Transaction</Button>
          : <Button variant="danger" onClick={completeTransaction}>Close Transaction</Button>}
      </Row>
      <Row className="pe-3 ps-3 pt-2">
        <Form>
          <Form.Check
            type="checkbox"
            id="customer-details-checkbox"
            label="Take customer details"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </Form>
      </Row>
      <Row>
        {isChecked ? (
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control as="select" value={customerId} name="customer_id" onChange={handleCustomerChange}>
                <option value="">---select customer---</option>
                {customers.map((cust) => (
                  <option key={cust.id} value={cust.id}>
                    {cust.id}
                    {' '}
                    {cust.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <FormGroup>
              <FormLabel>Name</FormLabel>
              <FormControl
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Phone</FormLabel>
              <FormControl
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <FormLabel>Address</FormLabel>
              <FormControl
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </FormGroup>
            <Button type="submit">Create Customer</Button>
          </Form>
        ) : null}
      </Row>
    </div>
  );
};
Customer.propTypes = {};
export default Customer;
