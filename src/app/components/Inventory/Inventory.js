/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button, ListGroup, Alert,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../redux/reducers/inventorySlice';
import { getShops } from '../../redux/reducers/shopSlice';

const Inventory = () => {
  // localStorage.clear();
  const user = JSON.parse(localStorage.getItem('user'));
  const { outlets } = useSelector((state) => state.shop);
  // const { categories } = useSelector((state) => state.category);
  const [products, setProducts] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    store_id: '',
    product_name: '',
    unit_price: '',
    qty_in_stock: '',
    exp_date: '',
    manufacturer: '',
    country: '',
    unit_cost: '',
    mnf_date: '',
    category_id: '',
  });
  const categoryOptions = [
    { label: '-- Select Category --', value: '' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Food', value: 'food' },
    { label: 'Beauty', value: 'beauty' },
  ];

  const [notifications, setNotifications] = useState([]);

  const handleChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    setProducts([...products, {
      product_name: newProduct.name,
      unit_price: newProduct.price,
      qty_in_stock: newProduct.quantity,
      exp_date: newProduct.expiryDate,
      manufacturer: newProduct.manufacturer,
      country: newProduct.country,
      unit_cost: newProduct.unit_cost,
      mnf_date: newProduct.mnf_date,
      category_id: newProduct.category_id,
    }]);
    setNewProduct({
      product_name: '',
      unit_price: '',
      qty_in_stock: '',
      exp_date: '',
      manufacturer: '',
      country: '',
      unit_cost: '',
      mnf_date: '',
      category_id: '',
    });
    dispatch(addProduct(product));
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((product) => product.id !== productId));
  };

  const handleSetNotification = (event) => {
    event.preventDefault();
    const notification = {
      type: event.target.type.value,
      value: event.target.value.value,
    };
    setNotifications([...notifications, notification]);
    event.target.reset();
  };

  const handleRemoveNotification = (index) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };

  const getExpiringProducts = () => {
    const now = new Date();
    return products.filter((product) => product.expiryDate && new Date(product.expiryDate) < now);
  };

  const getLowStockProducts = () => products.filter((product) => product.quantity < 10);
  useEffect(() => {
    if (user) {
      dispatch(getShops(user.id));
    }
    // Fetch country data from API
    axios.get('https://restcountries.com/v2/all')
      .then((response) => {
        const countries = response.data.map((country) => ({ label: country.name, value: country.alpha3Code }));
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Col sm={3}>
          <h3>Add Product</h3>
          <Form onSubmit={handleAddProduct}>
            <Form.Group>
              <Form.Label>Shops/Stores</Form.Label>
              <Form.Control as="select" name="store_id" value={newProduct.store_id} onChange={handleChange} required>
                <option value="">-- Select Store/Shop --</option>
                {outlets.map((option) => (
                  <option key={option.id} value={option.name}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={newProduct.name} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={newProduct.description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="quantity" value={newProduct.quantity} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" name="expiryDate" value={newProduct.expiryDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control type="text" name="manufacturer" value={newProduct.manufacturer} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control as="select" name="country" value={newProduct.country} onChange={handleChange} required>
                <option value="">-- Select Country --</option>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Unit Cost</Form.Label>
              <Form.Control type="number" name="unit_cost" value={newProduct.unit_cost} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Manufacture Date</Form.Label>
              <Form.Control type="date" name="mnf_date" value={newProduct.mnf_date} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category_id" value={newProduct.category_id} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit">
              Add
            </Button>
          </Form>
          <hr />
          <h3>Notifications</h3>
          <Form onSubmit={handleSetNotification}>
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control as="select" name="type" required>
                <option value="">Select a type</option>
                <option value="expiry">Expiry Date</option>
                <option value="lowstock">
                  Low Stock

                </option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Value</Form.Label>
              <Form.Control type="text" name="value" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Set
            </Button>
          </Form>
          <hr />
          <h3>Notifications List</h3>
          {notifications.length === 0 ? (
            <Alert variant="info">No notifications set</Alert>
          ) : (
            <ListGroup>
              {notifications.map((notification, index) => (
                <ListGroup.Item key={index}>
                  {notification.type === 'expiry' ? (
                    <span>
                      Notify me when a product is expiring in
                      {' '}
                      {notification.value}
                      {' '}
                      days
                    </span>
                  ) : (
                    <span>
                      Notify me when a product has less than
                      {' '}
                      {notification.value}
                      {' '}
                      in stock
                    </span>
                  )}
                  <Button className="float-right" variant="danger" size="sm" onClick={() => handleRemoveNotification(index)}>
                    Remove
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col sm={9}>
          <h3>Product List</h3>
          {products.length === 0 ? (
            <Alert variant="info">No products added</Alert>
          ) : (
            <ListGroup>
              {products.map((product) => (
                <ListGroup.Item key={product.id}>
                  <strong>{product.name}</strong>
                  {' '}
                  -
                  {' '}
                  {product.description}
                  {' '}
                  (
                  {product.quantity}
                  {' '}
                  left)
                  {product.expiryDate && new Date(product.expiryDate) < new Date() ? (
                    <Alert variant="danger" className="float-right">Expired!</Alert>
                  ) : null}
                  <Button className="float-right" variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    Delete
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          {getExpiringProducts().length > 0 ? (
            <Alert variant="warning">
              The following products are expiring soon:
              {' '}
              {getExpiringProducts().map((product) => product.name).join(', ')}
            </Alert>
          ) : null}
          {getLowStockProducts().length > 0 ? (
            <Alert variant="warning">
              The following products are running low on stock:
              {' '}
              {getLowStockProducts().map((product) => product.name).join(', ')}
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Inventory;
