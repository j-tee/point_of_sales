/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, FormLabel, FormControl, Row,
} from 'react-bootstrap';
import Casual from 'casual-browserify';
import { addCustomer, resetCustomer, updateCustomer } from '../../redux/reducers/customerSlice';

const Customer = ({ setAddToCartButtonStatus }) => {
  const { customer } = useSelector((state) => state.customer) || {};
  // const [customerId, setCustomerId] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [initialLoad, setInitialLoad] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  // console.log('New storeId from customer:=>', storeId);
  // console.log('New productId from customer:=>', productId);
  // console.log('CUSTOMER=>', customer);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      customer.name = name;
      customer.email = email;
      customer.phone = phone;
      customer.address = address;
      dispatch(updateCustomer({
        id: customer.id, name, email, phone, address,
      }));
    }
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };
  const startTransaction = () => {
    if (!isChecked && initialLoad) {
      setAddToCartButtonStatus(false);
      const customerObject = {
        name: `${Casual.first_name} ${Casual.last_name}`,
        email: Casual.email,
        phone: Casual.phone,
        address: `${Casual.address} ${Casual.city}, ${Casual.state_abbr} ${Casual.zip}`,
      };
      dispatch(addCustomer(customerObject));
      setInitialLoad(false);
    }
  };
  const completeTransaction = () => {
    setAddToCartButtonStatus(true);
    dispatch(resetCustomer());
    setInitialLoad(true);
  };
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
