/* eslint-disable max-len */
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerList } from '../../redux/reducers/customerSlice';
import { getEmployees } from '../../redux/reducers/employeeSlice';
import { getShops } from '../../redux/reducers/shopSlice';
import { getOrderDetails } from '../../redux/reducers/orderSlice';
import { getStocks } from '../../redux/reducers/inventorySlice';
import PaginationComponent from '../Pagination';
import UpdatePaymentModal from '../UpdatePaymentModal';

const OrderDetails = () => {
  const { outlets } = useSelector((state) => state.shop);
  const { stocks } = useSelector((state) => state.inventory);
  const { customers } = useSelector((state) => state.customer);
  const { employees } = useSelector((state) => state.employee);
  const { orderDetails, pagination } = useSelector((state) => state.order);
  const [stockId, setStockId] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const [customerId, setCustomerId] = useState(0);
  const [employeeId, setEmployeeId] = useState(0);
  const [status, setStatus] = useState('Complete');
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [updatePaymentModalOpen, setUpdatePaymentModalOpen] = useState(false);
  const [amtDue, setAmtDue] = useState(0);
  const [orderId, setOrderId] = useState(0);
  const [params, setParams] = useState({
    storeId,
    customerId,
    employeeId,
    status,
    stockId,
    page: 1,
    perPage: 10,
  });

  const getOrderPayments = () => {
    dispatch(getOrderDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  };

  useEffect(() => {
    dispatch(getOrderDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
    dispatch(getCustomerList(0));
    dispatch(getEmployees(0));
    dispatch(getShops(0));
    dispatch(getStocks(storeId));
  }, [customerId, dispatch, employeeId, itemsPerPage, pagination.total_items, params, status, stockId, storeId]);

  const handleCustomerChange = (event) => {
    const { value } = event.target;
    setCustomerId(value);
    setParams((prevParams) => ({
      ...prevParams,
      customerId: value,
    }));
    dispatch(getOrderDetails(params));
  };

  const handleEmployeeChange = (event) => {
    const { value } = event.target;
    setEmployeeId(value);
    setParams((prevParams) => ({
      ...prevParams,
      employeeId: value,
    }));
    dispatch(getOrderDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  };

  const handleStoreChange = useCallback((event) => {
    const { value } = event.target;
    setStoreId(value);
    dispatch(getStocks(value));
    dispatch(getEmployees(value));
    // dispatch(getCustomers(value));
    setParams((prevParams) => ({
      ...prevParams,
      storeId: value,
    }));
    dispatch(getOrderDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  }, [dispatch, itemsPerPage, pagination.total_items, params]);

  const handleStatusChange = (event) => {
    const { value } = event.target;
    setStatus(value);
    setParams((prevParams) => ({
      ...prevParams,
      status: value,
    }));
    dispatch(getOrderDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  };

  const handleStockChange = (event) => {
    const { value } = event.target;
    setStockId(value);
    setParams((prevParams) => ({
      ...prevParams,
      stockId: value,
    }));
    dispatch(getCustomerList(value));
    dispatch(getOrderDetails(params)).then(() => {
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
  }, []);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
  };

  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };

  const handleOpneModal = (orderId, amount) => {
    setAmtDue(amount);
    setOrderId(orderId);
    setUpdatePaymentModalOpen(true);
  };

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
              <Form.Control as="select" value={status} onChange={handleStatusChange} name="contry">
                <option value="">-- Select Status --</option>
                <option value="Pending">Pending</option>
                <option value="Complete">Complete</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Table>
        <thead>
          <tr>
            <th>
              Order ID
            </th>
            <th>Customer</th>
            {/* <th>Status</th> */}
            <th>Total Cost</th>
            <th>Total Tax</th>
            <th>Amt Payable</th>
            <th>Payment</th>
          </tr>
        </thead>
        <tbody>
          {orderDetails ? (orderDetails.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.attributes.customer_name}</td>
              {/* <td>{order.attributes.status}</td> */}
              <td>{order.attributes.total_cost}</td>
              <td>{order.attributes.total_tax}</td>
              <td>{order.attributes.amt_payable}</td>
              <td>
                {order.attributes.total_payment && order.attributes.status === 'Complete' ? order.attributes.total_payment
                  : (
                    <Button onClick={() => handleOpneModal(order.id, order.attributes.amt_payable)}>
                      Make Payment
                    </Button>
                  )}

              </td>
            </tr>
          ))) : (<Alert>No orders found</Alert>)}
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
      <UpdatePaymentModal
        getOrderPayments={getOrderPayments}
        amtDue={amtDue}
        orderId={orderId}
        isOpen={updatePaymentModalOpen}
        onRequestClose={() => setUpdatePaymentModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setUpdatePaymentModalOpen={setUpdatePaymentModalOpen}
      />
    </Container>
  );
};

export default OrderDetails;
