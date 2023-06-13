/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert,
  Col, Container, Dropdown, DropdownButton, Form, Row, Table,
} from 'react-bootstrap';
import { getShops } from '../redux/reducers/shopSlice';
import { getPaymentDetails } from '../redux/reducers/paymentSlice';
import PaginationComponent from './Pagination';
import { getStocks } from '../redux/reducers/inventorySlice';
import { getCustomers } from '../redux/reducers/customerSlice';
import { getEmployees } from '../redux/reducers/employeeSlice';

const PaymentDetails = () => {
  const { payments, pagination } = useSelector((state) => state.payment);
  const { outlets } = useSelector((state) => state.shop);
  const { employees } = useSelector((state) => state.employee);
  const { customers } = useSelector((state) => state.customer);
  const { stocks } = useSelector((state) => state.inventory);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [stockId, setStockId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [startDate, setStartDate] = useState(() => {
    const currentDate = new Date();
    const oneWeekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    return oneWeekAgo.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    const currentDate = new Date();
    return currentDate.toISOString().split('T')[0];
  });
  const dispatch = useDispatch();

  const [params, setParams] = useState({
    storeId,
    customerId,
    employeeId,
    stockId,
    startDate,
    endDate,
    page: 1,
    perPage: 10,
  });

  const handleStoreChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setStoreId(value);
    setParams((prevParams) => ({
      ...prevParams,
      storeId: value,
    }));
    dispatch(getStocks(value));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleStockChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setStockId(value);
    setParams((prevParams) => ({
      ...prevParams,
      stockId: value,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleCustomerChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setCustomerId(value);
    setParams((prevParams) => ({
      ...prevParams,
      customerId: value,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleEmployeeChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setEmployeeId(value);
    setParams((prevParams) => ({
      ...prevParams,
      employeeId: value,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleStartDateChange = (e) => {
    const { value } = e.target;
    setStartDate(value);
    setParams((prevParams) => ({
      ...prevParams,
      startDate: value,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleEndDateChange = (e) => {
    const { value } = e.target;
    setEndDate(value);
    setParams((prevParams) => ({
      ...prevParams,
      endDate: value,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  };

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      perPage: newItemsPerPage,
      page: 1,
    }));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  }, []);

  useEffect(() => {
    dispatch(getShops(0));
    dispatch(getCustomers(0));
    dispatch(getEmployees(0));
    dispatch(getPaymentDetails(params))
      .then(() => {
        setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
      });
  }, [dispatch, itemsPerPage, pagination.total_items, params]);
  return (
    <Container>
      <Form>
        <Row>
          <Col className="pb-2" xs={3}>
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
          <Col className="pb-2" xs={3}>
            <Form.Group>
              <Form.Control as="select" value={stockId} onChange={handleStockChange} name="store">
                <option value="">-- Select Stock --</option>
                {stocks && stocks.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.id}
                    {' '}
                    {option.stock_date}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="pb-2" xs={3}>
            <Form.Group>
              <Form.Control as="select" value={customerId} onChange={handleCustomerChange} name="category">
                <option value="">-- Customer --</option>
                {customers && customers.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="pb-2" xs={3}>
            <Form.Group>
              <Form.Control as="select" value={employeeId} onChange={handleEmployeeChange} name="contry">
                <option value="">-- Select Employee --</option>
                {employees && employees.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.attributes.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col className="pb-2" xs={6}>
            <Form.Group>
              <Form.Control type="date" placeholder="Start Date" value={startDate} onChange={handleStartDateChange} required />
            </Form.Group>
          </Col>
          <Col className="pb-2" xs={6}>
            <Form.Control type="date" placeholder="End Date" value={endDate} onChange={handleEndDateChange} required />
          </Col>
        </Row>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Mode of Payment</th>
            <th>Amount Due</th>
            <th>Amt Paid</th>
            <th>Date of Payment</th>
            <th>Employee</th>
          </tr>
        </thead>
        <tbody>
          {payments ? payments.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.attributes.order_id}</td>
              <td>{payment.attributes.customer_name}</td>
              <td>{payment.attributes.payment_type}</td>
              <td>{payment.attributes.amt_due}</td>
              <td>
                {payment.attributes.amount}
              </td>
              <td>{payment.attributes.payment_date}</td>
              <td>{payment.attributes.employee}</td>
            </tr>
          )) : <Alert>No payments found</Alert>}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <PaginationComponent
          params={params}
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={pagination?.total_items || 0}
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
    </Container>
  );
};

export default PaymentDetails;
