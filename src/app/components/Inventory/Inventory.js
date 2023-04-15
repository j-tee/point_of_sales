/* eslint-disable no-debugger */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {
  Container, Row, Col, Form, Button, ListGroup, Alert, Table,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProducts } from '../../redux/reducers/inventorySlice';
import { getShops } from '../../redux/reducers/shopSlice';
import { getCategories } from '../../redux/reducers/categorySlice';
import ProductSearch from '../ProductSearch';

const Inventory = () => {
  // localStorage.clear();
  const user = JSON.parse(localStorage.getItem('user'));
  const { outlets } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);
  const { products } = useSelector((state) => state.inventory) ?? [];
  // console.log('PRODUCTS=>', products);
  // const [products, setProducts] = useState([]);
  const [countryOptions, setCountryOptions] = useState([]);
  const [storeId, setStoreId] = useState(0);
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);
  const [expDate, setExpDate] = useState();
  const [manufacturer, setManufacturer] = useState('');
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [unitCost, setUnitCost] = useState(0);
  const [mnfDate, setMnfDate] = useState();
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    store_id: '',
    product_name: '',
    unit_price: '',
    qty_in_stock: '',
    exp_date: '',
    manufacturer: '',
    description: '',
    country: '',
    unit_cost: '',
    mnf_date: '',
    category_id: '',
  });

  const [notifications, setNotifications] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'store_id': {
        setStoreId(value);
        dispatch(getCategories(parseInt(value, 10)));
        break;
      }
      case 'product_name': {
        setProductName(value);
        break;
      }
      case 'category_id': {
        setCategoryId(value);
        const param = {};
        param.storeId = storeId;
        param.categoryId = categoryId;
        dispatch(getProducts(param));
        break;
      }
      case 'unit_price': {
        setUnitPrice(value);
        break;
      }
      case 'qty_in_stock': {
        setQtyInStock(value);
        break;
      }
      case 'unit_cost': {
        setUnitCost(value);
        break;
      }
      case 'country': {
        setCountry(value);
        break;
      }
      case 'description': {
        setDescription(value);
        break;
      }
      case 'manufacturer': {
        setManufacturer(value);
        break;
      }
      case 'exp_date': {
        setExpDate(value);
        break;
      }
      case 'mnf_date': {
        setMnfDate(value);
        break;
      }
    }
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    dispatch(addProduct(newProduct));
    setNewProduct({
      store_id: '',
      product_name: '',
      unit_price: '',
      qty_in_stock: '',
      exp_date: '',
      description: '',
      manufacturer: '',
      country: '',
      unit_cost: '',
      mnf_date: '',
      category_id: '',
    });
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
    dispatch(getProducts({ storeId: 0, categoryId: 0 }));
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
  }, [newProduct]);

  return (
    <Container>
      <Row className="pt-5 mt-5">
        <Col sm={3}>
          <h3>Add Product</h3>
          <hr />
          <Form onSubmit={handleAddProduct}>
            <Form.Group>
              <Form.Label>Shops/Stores</Form.Label>
              <Form.Control as="select" name="store_id" value={storeId} onChange={handleChange} required>
                <option value="">-- Select Store/Shop --</option>
                {outlets.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="category_id" value={categoryId} onChange={handleChange} required>
                <option value="">-- Select Category --</option>
                {categories.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="product_name" value={productName} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" name="description" value={description} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Price</Form.Label>
              <Form.Control type="number" name="unit_price" value={unitPrice} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Unit Cost</Form.Label>
              <Form.Control type="number" name="unit_cost" value={unitCost} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" name="qty_in_stock" value={qtyInStock} onChange={handleChange} required />
            </Form.Group>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" name="expiry_date" value={expDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Manufacture Date</Form.Label>
              <Form.Control type="date" name="mnf_date" value={mnfDate} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Manufacturer</Form.Label>
              <Form.Control type="text" name="manufacturer" value={manufacturer} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control as="select" name="country" value={country} onChange={handleChange}>
                <option value="">-- Select Country --</option>
                {countryOptions.map((option) => (
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
          <h3>Inventory</h3>
          <hr />
          <ProductSearch storeId={storeId} />
          <hr />
          {products.length === 0 ? (
            <Alert variant="info">No products added</Alert>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Qty In Stock</th>
                  <th>Inventory Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td><strong>{product.product_name}</strong></td>
                    <td>{product.description}</td>
                    <td>{product.qty_in_stock}</td>
                    <td>{new Date(product.created_at).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                    <td>
                      {product.exp_date && new Date(product.exp_date) < new Date() ? (
                        <Alert variant="danger">Expired!</Alert>
                      ) : null}
                      <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(product.id)}>Delete</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
          {getExpiringProducts().length > 0 ? (
            <Alert variant="warning">
              The following products are expiring soon:
              {' '}
              {getExpiringProducts().map((product) => product.product_name).join(', ')}
            </Alert>
          ) : null}
          {getLowStockProducts().length > 0 ? (
            <Alert variant="warning">
              The following products are running low on stock:
              {' '}
              {getLowStockProducts().map((product) => product.product_name).join(', ')}
            </Alert>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Inventory;
