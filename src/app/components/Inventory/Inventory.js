/* eslint-disable no-debugger */
/* eslint-disable default-case */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import {
  Container, Row, Col, Form, Button, ListGroup, Alert, Table, DropdownButton, Dropdown,
} from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, getProducts, getStocks } from '../../redux/reducers/inventorySlice';
import { getShops } from '../../redux/reducers/shopSlice';
import { getCategories } from '../../redux/reducers/categorySlice';
import PaginationComponent from '../Pagination';

const Inventory = () => {
  // localStorage.clear();
  const { stocks } = useSelector((state) => state.inventory);
  const user = JSON.parse(localStorage.getItem('user'));
  const { outlets } = useSelector((state) => state.shop);
  const { categories } = useSelector((state) => state.category);
  const { products, pagination } = useSelector((state) => state.inventory) ?? [];
  const [totalPages, setTotalPages] = useState(0);
  const [countryOptions, setCountryOptions] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [storeId, setStoreId] = useState(0);
  const [stock, setStockId] = useState(0);
  const [productName, setProductName] = useState('');
  const [params, setParams] = useState({
    storeId: 0,
    categoryId: 0,
    page: 1,
    perPage: 10,
  });
  const [categoryId, setCategoryId] = useState('');
  const [unitPrice, setUnitPrice] = useState(0);
  const [qtyInStock, setQtyInStock] = useState(0);
  const [expDate, setExpDate] = useState();
  const [manufacturer, setManufacturer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [description, setDescription] = useState('');
  const [country, setCountry] = useState('');
  const [unitCost, setUnitCost] = useState(0);
  const [mnfDate, setMnfDate] = useState();
  const [stockDate, setStockDate] = useState('');
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

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      perPage: newItemsPerPage,
      page: 1,
    }));
  }, []);

  const memoizedParams = useMemo(() => params, [params]);

  const handleProductFetch = useCallback(() => {
    dispatch(getProducts(memoizedParams))
      .then(() => {
        setTotalPages(Math.ceil(pagination.totalItems / itemsPerPage));
      });
  }, [dispatch, memoizedParams, pagination.totalItems, itemsPerPage]);

  useEffect(() => {
    handleProductFetch();
  }, [currentPage, itemsPerPage, handleProductFetch]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'store_id': {
        setStoreId(value);
        dispatch(getCategories(parseInt(value, 10)));
        dispatch(getStocks(parseInt(value, 10)));
        setParams((prevParams) => ({
          ...prevParams,
          store_id: value,
        }));
        handleProductFetch();
        break;
      }
      case 'stock_id': {
        setStockId(value);
        setParams((prevParams) => ({
          ...prevParams,
          stock_id: value,
        }));
        handleProductFetch();
        break;
      }
      case 'product_name': {
        setProductName(value);
        setParams((prevParams) => ({
          ...prevParams,
          product_name: value,
        }));
        handleProductFetch();
        break;
      }
      case 'category_id': {
        setCategoryId(value);
        setParams((prevParams) => ({
          ...prevParams,
          categoy_id: value,
        }));
        handleProductFetch();
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
        setParams((prevParams) => ({
          ...prevParams,
          country: value,
        }));
        handleProductFetch();
        break;
      }
      case 'description': {
        setDescription(value);
        break;
      }
      case 'manufacturer': {
        setManufacturer(value);
        setParams((prevParams) => ({
          ...prevParams,
          manufacturer: value,
        }));
        handleProductFetch();
        break;
      }
      case 'exp_date': {
        setExpDate(value);
        setParams((prevParams) => ({
          ...prevParams,
          exp_date: value,
        }));
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

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    dispatch(addProduct(newProduct));
    setNewProduct({
      store_id: '',
      stock_id: '',
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
    dispatch(getStocks(storeId));
  }, [dispatch, storeId]);

  useEffect(() => {
    dispatch(getStocks(storeId));
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
  }, []);

  const handleStockDateChange = (e) => {
    setStockDate(e.target.value);
  };

  const handleAddStock = () => {

  };

  return (
    <Container>
      <Row className="pt-5 mt-5">
        <Col sm={3}>
          <Row>
            <h1>Add Product</h1>
            <hr />
          </Row>
          <Row>
            <Form onSubmit={handleAddProduct}>
              <Form.Group>
                <Form.Control as="select" value={stock} name="stock" onChange={handleChange}>
                  <option value="">-- Select Stock --</option>
                  {stocks.map((option) => (
                    <option key={option.id} value={option.id}>
                      {option.id}
                      {' '}
                          &nbsp;
                      {' '}
                      {option.stock_date}
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
                    <option key={option.value} value={option.label}>
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
          </Row>
        </Col>
        <Col sm={9}>
          <Row>
            <h1>Stock</h1>
            <hr />
            <Form onSubmit={handleAddStock}>
              <Row className="pe-5 ps-5 m-3">
                <Col md={9}>
                  <Row>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Control as="select" name="store_id" value={storeId} onChange={handleChange} required>
                          <option value="">-- Select Store/Shop --</option>
                          {outlets.map((option) => (
                            <option key={option.id} value={option.id}>
                              {option.name}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Control type="date" name="stock_date" value={stockDate} onChange={handleStockDateChange} required />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col md={3}>
                  <Button>New Stock Entry</Button>
                </Col>
              </Row>
            </Form>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Stock ID</th>
                  <th>Stock Date</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                {stocks && stocks.map((stock) => (
                  <tr key={stock.i}>
                    <td>{stock.id}</td>
                    <td>{stock.stock_date}</td>
                    <td>&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <hr />
          </Row>
          <Row>
            <Row>
              <Col md={3}>
                <h1>Inventory</h1>
              </Col>
              <Col md={9}>
                &nbsp;
              </Col>
            </Row>
            {products.length === 0 ? (
              <Alert variant="info">No products added</Alert>
            ) : (
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Manufacturer</th>
                    <th>Qty In Stock</th>
                    <th>Country</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td><strong>{product.attributes.product_name}</strong></td>
                      <td>{product.attributes.manufacturer}</td>
                      <td>{product.attributes.qty_in_stock}</td>
                      <td>{product.attributes.country}</td>
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
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <PaginationComponent
                params={params}
                activePage={currentPage}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={pagination?.totalItems || 0}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                totalPages={totalPages}
                hideDisabled={totalPages === 0}
                hideNavigation={totalPages === 1}
              />
              <DropdownButton className="mb-2" id="dropdown-items-per-page" title={`Items per page: ${itemsPerPage}`}>
                <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
                <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
              </DropdownButton>
            </div>
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
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Inventory;
