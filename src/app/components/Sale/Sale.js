import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Card, Col, Container, Form, Row, Table,
} from 'react-bootstrap';
import { getInventorySummary, getStocks, getUniqueProductNamesByCategory } from '../../redux/reducers/inventorySlice';
import { showToastify } from '../Toastify';
import { getShops } from '../../redux/reducers/shopSlice';
import { getCategories } from '../../redux/reducers/categorySlice';

const Sale = () => {
  const { summary, names } = useSelector((state) => state.inventory);
  const { outlets } = useSelector((state) => state.shop);
  const [storeId, setStoreId] = useState();
  const { stocks } = useSelector((state) => state.inventory);
  const [stockId, setStockId] = useState();
  const { categories } = useSelector((state) => state.category);
  const [categoryId, setCategoryId] = useState();
  const [productName, setProductName] = useState();
  const [params, setParams] = useState({
    storeId: 0,
    stockId: 0,
    categoryId: 0,
    productName: null,
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getShops(0)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to load shops for drop down list', 'error');
        }
      }
    });
  }, []);
  useEffect(() => {
    dispatch(getInventorySummary(params)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to load balance sheet information ', 'error');
        }
      }
    });
  }, [dispatch, params]);

  const handleShopChange = (e) => {
    const { value } = e.target;
    setStoreId(value);
    setParams((prevParams) => ({
      ...prevParams,
      storeId: value,
    }));
    dispatch(getCategories(value)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Failed to load categories for drop down list', 'error');
        }
      }
    });
    dispatch(getStocks(value)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rejected') {
          showToastify('Couldnot load stocks for drop down list', 'error');
        }
      }
    });
  };
  const handleStockChange = (e) => {
    const { value } = e.target;
    setStockId(value);
    setParams((prevParams) => ({
      ...prevParams,
      stockId: value,
    }));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setCategoryId(value);
    setParams((prevParams) => ({
      ...prevParams,
      categoryId: value,
    }));
    dispatch(getUniqueProductNamesByCategory(value)).then((res) => {
      if (res.error) {
        if (res.error.message === 'Rehected') {
          showToastify('Failed to list of product names', 'error');
        }
      }
    });
  };

  const handleProductNameChange = (e) => {
    const { value } = e.target;
    setProductName(value);
    setParams((prevParams) => ({
      ...prevParams,
      productName: value,
    }));
  };
  return (
    <Container>
      <Form>
        <Row className="d-flex justify-content-between align-items-center mt-5">
          <Col>
            <Form.Group>
              <Form.Control as="select" value={storeId} onChange={(E) => handleShopChange(E)}>
                <option value=" ">---Select Shop---</option>
                {outlets && outlets.map((shop) => (
                  <option value={shop.id} key={shop.id}>{shop.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" value={stockId} onChange={(E) => handleStockChange(E)}>
                <option value=" ">---Select Stock---</option>
                {stocks && stocks.map((stock) => (
                  <option value={stock.id} key={stock.id}>
                    {stock.id}
                    {' '}
                    {stock.stock_date}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" value={categoryId} onChange={(e) => handleCategoryChange(e)}>
                <option value=" ">---Select Category---</option>
                {categories && categories.map((category) => (
                  <option value={category.id} key={category.id}>{category.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" value={productName} onChange={(e) => handleProductNameChange(e)}>
                <option value=" ">---Select Product---</option>
                {names && names.map((name) => (
                  <option value={name} key={name}>{name}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Card className="mt-5">
        <Table>
          <thead>
            <tr>
              <th>Cost of Products</th>
              <th>Cost of Damages</th>
              <th>Cost of Expiries</th>
              <th>Expected Revenue</th>
              <th>Expected Balance</th>
              <th>Bad Debt</th>
            </tr>
          </thead>
          <tbody>
            {summary ? (summary.map((data) => (
              <tr key={data.attributes.id}>
                <td>{data.attributes.total_cost}</td>
                <td>{data.attributes.cost_of_damages}</td>
                <td>{data.attributes.cost_of_expired_products}</td>
                <td>{data.attributes.expected_revenue}</td>
                <td>{data.attributes.expected_balance}</td>
                <td>{data.attributes.bad_debt}</td>
              </tr>
            ))) : <Alert>No data found</Alert>}
          </tbody>
        </Table>
      </Card>
      <Card className="mt-5">
        <Table>
          <thead>
            <tr>
              <th>Cost of Products Sold</th>
              <th>Actual Revenue</th>
              <th>Actual Balance</th>
              <th>Bad Debt</th>
              <th>Net Income</th>
            </tr>
          </thead>
          <tbody>
            {summary ? (summary.map((data) => (
              <tr key={data.attributes.id}>
                <td>{data.attributes.cost_of_quantity_sold}</td>
                <td>{data.attributes.actual_revenue}</td>
                <td>{data.attributes.current_balance}</td>
                <td>{data.attributes.bad_debt}</td>
                <td>{data.attributes.net_income}</td>
              </tr>
            ))) : <Alert>No data found</Alert>}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
};

Sale.propTypes = {};

Sale.defaultProps = {};

export default Sale;
