import { DeleteForeverOutlined, DetailsOutlined, Edit } from '@mui/icons-material';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert, Button, Col, Container, Dropdown, DropdownButton, Form, Row, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getCustomerDetails } from '../redux/reducers/customerSlice';
import { getShops } from '../redux/reducers/shopSlice';
import PaginationComponent from './Pagination';

const CustomerDetail = () => {
  const { customers, pagination } = useSelector((state) => state.customer);
  const { outlets } = useSelector((state) => state.shop);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [storeId, setStoreId] = useState(0);
  const dispatch = useDispatch();
  const [params, setParams] = useState({
    storeId,
    page: 1,
    perPage: 10,
  });
  useEffect(() => {
    dispatch(getCustomerDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
    dispatch(getShops());
  }, [dispatch, itemsPerPage, pagination.total_items, params]);

  const handleShopChange = (event) => {
    const { value } = event.target;
    setStoreId(value);
    setParams((prevParams) => ({
      ...prevParams,
      storeId: value,
    }));
    dispatch(getCustomerDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
    dispatch(getCustomerDetails(params)).then(() => {
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
    dispatch(getCustomerDetails(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  }, [dispatch, itemsPerPage, pagination.total_items, params]);

  return (
    <Container>
      <div className="d-flex align-items-center mt-5">
        <h2>Customers</h2>
      </div>
      <Row>
        <Col md={3}>
          <Form.Control as="select" value={storeId} name="store_id" onChange={handleShopChange}>
            <option value="">---Select Shop---</option>
            {outlets.map((sh) => (
              <option value={sh.id} key={sh.id}>
                {sh.name}
              </option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      <Table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {customers ? customers.map((cust) => (
            <tr key={cust.id}>
              <td>{cust.name}</td>
              <td>{cust.email}</td>
              <td>{cust.phone}</td>
              <td>
                <Button variant="outline-primary" className="no-outline no-border"><Edit /></Button>
&nbsp; &nbsp;
                <Button variant="outline-info" className="no-outline no-border"><DetailsOutlined /></Button>
&nbsp; &nbsp;
                <Button variant="outline-danger" className="no-outline no-border"><DeleteForeverOutlined /></Button>
              </td>
            </tr>
          )) : <Alert>No customers found</Alert>}
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

export default CustomerDetail;
