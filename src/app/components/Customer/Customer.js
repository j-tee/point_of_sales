/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button, Form, FormGroup, FormLabel, FormControl, Row,
} from 'react-bootstrap';
import Casual from 'casual-browserify';
import { addCustomer, updateCustomer } from '../../redux/reducers/customerSlice';

const Customer = ({ updateOrderObject }) => {
  const { customer } = useSelector((state) => state.customer) ?? {};
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      customer.name = name;
      customer.email = email;
      customer.phone = phone;
      customer.address = address;
    }
    dispatch(updateCustomer(customer)).then(() => {
      updateOrderObject(customer.id);
    });
    setName('');
    setEmail('');
    setPhone('');
    setAddress('');
  };
  // const customerObject = {
  //   name, email, phone, address,
  // };

  useEffect(() => {
    console.log('useEffect called');
    if (!isChecked) {
      const customerObject = {
        name: `${Casual.first_name} ${Casual.last_name}`,
        email: Casual.email,
        phone: Casual.phone,
        address: `${Casual.address} ${Casual.city}, ${Casual.state_abbr} ${Casual.zip}`,
      };
      dispatch(addCustomer(customerObject));
    }
  }, [isChecked]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div>
      <Row>
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

export default Customer;
