/* eslint-disable default-case */
/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-extraneous-dependencies */
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Col, Form, Row } from 'react-bootstrap';
// import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getUniqueListOfCountries, getUniqueManufacturers, getUniqueProducts } from '../redux/reducers/inventorySlice';
import { getCategories } from '../redux/reducers/categorySlice';

function ProductSearch({ outlets, handleProductSearch }) {
  const { countries, names, manufacturers } = useSelector((state) => state.inventory, shallowEqual);
  const { categories } = useSelector((state) => state.category, shallowEqual);
  const [country, setCountry] = useState('');
  const [categoryId, setCategoryId] = useState(0);
  const [manufacturer, setManufacturer] = useState('');
  const [name, setName] = useState('');
  const [expDate, setExpDate] = useState('');
  const [storeId, setStoreId] = useState('');
  const dispatch = useDispatch();

  const handleCountryChange = useCallback((event) => {
    const { value } = event.target;
    setCountry(value);
  }, []);

  const handleCategoryChange = useCallback((event) => {
    const { value } = event.target;
    setCategoryId(value);
  }, []);

  const handleProductChange = useCallback((event) => {
    const { value } = event.target;
    setName(value);
  }, []);

  const handleManufacturerChange = useCallback((event) => {
    const { value } = event.target;
    setManufacturer(value);
  }, []);

  const handleDateChange = useCallback((event) => {
    const { value } = event.target;
    setExpDate(value);
  }, []);

  const handleStoreChange = useCallback((event) => {
    const { value } = event.target;
    setStoreId(value);
  }, []);

  const searchParams = useMemo(() => ({
    country,
    categoryId,
    productName: name,
    manufacturer,
    expDate,
    storeId,
  }), [country, categoryId, name, manufacturer, expDate, storeId]);

  useEffect(() => {
    handleProductSearch(searchParams);
  }, [searchParams, handleProductSearch]);

  useEffect(() => {
    if (country && categoryId > 0) {
      dispatch(getUniqueProducts({ storeId, categoryId, country }));
    }
    if (country && name && categoryId > 0) {
      dispatch(getUniqueManufacturers({
        storeId, categoryId, country, productName: name,
      }));
    }
  }, [country, name, categoryId, expDate, storeId, manufacturer, dispatch]);

  useEffect(() => {
    dispatch(getUniqueListOfCountries(storeId));
    dispatch(getCategories(storeId));
  }, [dispatch, storeId]);
  return (
    <Form>
      <Row>
        <Col className="pb-2" xs={4}>
          <Form.Group>
            <Form.Control as="select" value={storeId} onChange={handleStoreChange} name="store">
              <option value="">-- Select Shop/Store --</option>
              {outlets && outlets.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="pb-2" xs={4}>
          <Form.Group>
            <Form.Control as="select" value={categoryId} onChange={handleCategoryChange} name="category">
              <option value="">-- Category --</option>
              {categories && categories.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="pb-2" xs={4}>
          <Form.Group>
            <Form.Control as="select" value={country} onChange={handleCountryChange} name="contry">
              <option value="">-- Select Country --</option>
              {countries && countries.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col xs={4}>
          <Form.Group>
            <Form.Control as="select" value={name} onChange={handleProductChange} name="product_names">
              <option value="">-- Product Name --</option>
              {names && names.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col xs={4}>
          <Form.Group>
            <Form.Control as="select" value={manufacturer} onChange={handleManufacturerChange} name="manufacturer">
              <option value="">-- Manufacturer --</option>
              {manufacturers && manufacturers.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
        <Col className="pb-2" xs={4}>
          <Form.Group>
            <Form.Control type="date" name="expiry_date" value={expDate} onChange={handleDateChange} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

ProductSearch.propTypes = {};

export default ProductSearch;
