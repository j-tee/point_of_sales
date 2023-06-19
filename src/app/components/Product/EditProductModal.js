/* eslint-disable max-len */
/* eslint-disable default-case */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from 'react';
import {
  Button, Col, Container, Form, Modal, Row,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { getStocks, updateProduct } from '../../redux/reducers/inventorySlice';
import { getCategories } from '../../redux/reducers/categorySlice';
import { showToastify } from '../Toastify';
import ToastContext from '../ToastContext';

const EditProductModal = (props) => {
  const {
    isOpen, onRequestClose, calculateModalPosition, setProductModalOpen, product, user, outlets,
  } = props;
  const [modalTop, setModalTop] = useState(0);
  const { categories } = useSelector((state) => state.category);
  const [storeId, setStoreId] = useState(0);
  const dispatch = useDispatch();
  const [stockId, setStockId] = useState();
  const { stocks } = useSelector((state) => state.inventory);
  const [productName, setProductName] = useState();
  const [categoryId, setCategoryId] = useState();
  const { setShowToast } = useContext(ToastContext);
  const [unitPrice, setUnitPrice] = useState();
  const [countryOptions, setCountryOptions] = useState([]);
  const [qtyInStock, setQtyInStock] = useState();
  const [expDate, setExpDate] = useState();
  const [manufacturer, setManufacturer] = useState();
  const [description, setDescription] = useState();
  const [country, setCountry] = useState();
  const [unitCost, setUnitCost] = useState();
  const [mnfDate, setMnfDate] = useState();
  const [productObj, setProductObj] = useState(product);

  useEffect(() => {
    if (isOpen && product) {
      setModalTop(calculateModalPosition());
      setStockId(product.attributes.stock_id);
      setCategoryId(product.attributes.category_id);
      setCountry(product.attributes.country);
      setDescription(product.attributes.description);
      setUnitCost(product.attributes.unit_cost);
      setUnitPrice(product.attributes.unit_price);
      setExpDate(product.attributes.exp_date);
      setManufacturer(product.attributes.manufacturer);
      setMnfDate(product.attributes.mnf_date);
      setProductName(product.attributes.product_name);
      setQtyInStock(product.attributes.qty_in_stock);
    }
  }, [isOpen, calculateModalPosition, product]);

  const handleProductUpdate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowToast(true);
    dispatch(updateProduct(productObj)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to update product details', 'error');
          window.location.reload();
        }
      }
      if (!res.error) {
        showToastify('Product details successully updated', 'success');
      }
    });
    setProductModalOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'store_id': {
        setStoreId(value);
        dispatch(getCategories(parseInt(value, 10)));
        dispatch(getStocks(parseInt(value, 10)));
        break;
      }
      case 'stock_id': {
        setStockId(value);
        break;
      }
      case 'product_name': {
        setProductName(value);
        break;
      }
      case 'category_id': {
        setCategoryId(value);
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
    setProductObj({
      ...productObj,
      [name]: value,
      id: product.id,
    });
  };
  const handleStoreChange = (event) => {
    // setInitLoad(false);
    const { value } = event.target;
    setStoreId(parseInt(value, 10));
    dispatch(getStocks(value));
  };
  useEffect(() => {
    // dispatch(getShops(user.id));
    // Fetch country data from API
    axios.get('https://restcountries.com/v2/all')
      .then((response) => {
        const countries = response.data.map((country) => ({ label: country.name, value: country.alpha3Code }));
        setCountryOptions(countries);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch, storeId, user]);
  return (
    <Container>
      <Modal show={isOpen} onHide={onRequestClose} size="lg" style={{ marginTop: `${modalTop}px` }}>
        <Modal.Header closeButton>
          <Modal.Title>
            Edit details of
            {' '}
            {product && product.attributes.product_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleProductUpdate}>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Control as="select" name="store_id" value={storeId} onChange={handleStoreChange}>
                    <option value="">-- Select Store/Shop --</option>
                    {outlets.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.id}
                        {' '}
                        {option.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control as="select" name="category_id" value={categoryId} onChange={handleChange}>
                    <option value="">-- Select Category --</option>
                    {categories.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Control as="select" value={stockId} name="stock_id" onChange={handleChange}>
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
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" name="product_name" value={productName} onChange={handleChange} required />
                </Form.Group>

              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" name="description" value={description} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" name="unit_price" value={unitPrice} onChange={handleChange} required />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Unit Cost</Form.Label>
                  <Form.Control type="number" name="unit_cost" value={unitCost} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control type="number" name="qty_in_stock" value={qtyInStock} onChange={handleChange} required />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control type="date" name="exp_date" value={expDate} onChange={handleChange} />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Manufacture Date</Form.Label>
                  <Form.Control type="date" name="mnf_date" value={mnfDate} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Manufacturer</Form.Label>
                  <Form.Control type="text" name="manufacturer" value={manufacturer} onChange={handleChange} />
                </Form.Group>
              </Col>
              <Col md={4}>
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
              </Col>
            </Row>
            <Row>
              <Col md={4}>&nbsp;</Col>
              <Col md={4}>
               &nbsp;
              </Col>
              <Col md={4} className="ps-5 pt-5">
                {' '}
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                  Update Product
                </Button>

              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default EditProductModal;
