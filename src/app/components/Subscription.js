/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import {
  Alert, Button, Container, Dropdown, DropdownButton, Table,
} from 'react-bootstrap';
import {
  addAPIUser,
  addSubscription, getAPIUser, getRates, getSubscriptions,
} from '../redux/reducers/subscriptionSlice';
import PaginationComponent from './Pagination';
import { showToastify } from './Toastify';
import ToastContext from './ToastContext';

const Subscription = () => {
  const {
    rates, subscriptions, pagination,
  } = useSelector((state) => state.momo);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const dispatch = useDispatch();
  const { setShowToast } = useContext(ToastContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const key = process.env.REACT_APP_OCP_APIM_SUBSCRIPTION_PRIMARY_KEY;
  // const apiUserUrl = process.env.MOMO_API_USER_URL;
  // const tokenUrl = process.env.TOKEN_URL;
  const data = { providerCallbackHost: process.env.REACT_APP_CALL_BACK_URL };
  const refId = uuidv4();
  const headers = {
    'Content-Type': 'application/json',
    'X-Reference-Id': refId,
    'Ocp-Apim-Subscription-Key': key,
  };
  const [params, setParams] = useState({
    id: user.id,
    page: 1,
    perPage: 10,
  });

  useEffect(() => {
    dispatch(getRates());
    dispatch(getSubscriptions(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  }, []);

  const handleItemsPerPageChange = useCallback((newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
    setParams((prevParams) => ({
      ...prevParams,
      perPage: newItemsPerPage,
      page: 1,
    }));
    dispatch(getSubscriptions(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  }, [dispatch, itemsPerPage, pagination.total_items, params]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setParams((prevParams) => ({
      ...prevParams,
      page: pageNumber,
    }));
    dispatch(getSubscriptions(params)).then(() => {
      setTotalPages(Math.ceil(pagination.total_items / itemsPerPage));
    });
  };

  const handleSelectPackageChange = (rate) => {
    const subscription = {
      subscription_rate_id: rate.id,
      start_date: null,
      end_date: null,
    };
    dispatch(addSubscription({ subscription }))
      .then((res) => {
        setShowToast(true);
        if (!res.error) {
          dispatch(getSubscriptions(params));
          showToastify('Subscription added successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Subscription failed', 'error');
          }
        }
      });
  };

  const handleSubscription = () => {
    dispatch(addAPIUser({ headers, data: JSON.stringify(data) }))
      .then((res) => {
        setShowToast(true);
        if (!res.error) {
          dispatch(getSubscriptions(params));
          showToastify('API User  added successfully', 'success');
        } else if (res.error) {
          if (res.error.message === 'Rejected') {
            showToastify('Failed to add API User', 'error');
          }
        }
        dispatch(getAPIUser({ refId, headers }));
      });
  };
  return (
    <Container>
      <h2>Packages</h2>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Amount</th>
            <th>Frequency</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {rates ? (rates.map((rate) => (
            <tr key={rate.id}>
              <td>{rate.id}</td>
              <td>{rate.rate}</td>
              <td>{rate.frequency}</td>
              <td><Button onClick={() => handleSelectPackageChange(rate)}>Select Package</Button></td>
            </tr>
          ))) : <Alert>No data found</Alert>}
        </tbody>
      </Table>
      <h2>Subscriptions</h2>
      <Table>
        <thead>
          <tr>
            <th>Stores</th>
            <th>Fee</th>
            <th>Discount</th>
            <th>Taxes</th>
            <th>Amt Due</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          {subscriptions ? (subscriptions.map((sub) => (
            <tr key={sub.id}>
              <td>{sub.attributes.num_stores}</td>
              <td>{sub.attributes.subscription_amount}</td>
              <td>{sub.attributes.discount_amount}</td>
              <td>{sub.attributes.tax_amount}</td>
              <td>{sub.attributes.amt_due}</td>
              <td>{sub.attributes.start_date}</td>
              <td>{sub.attributes.end_date}</td>
              <th>
                {sub.attributes.paid ? <span>Paid</span> : (
                  <span className="d-flex justify-content-between align-items-center">
                    <Button onClick={() => handleSubscription()}>Subscribe</Button>
                    <Button>Cancel</Button>
                  </span>
                )}
              </th>
            </tr>
          ))) : <Alert>No subscriptions Found</Alert>}
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

export default Subscription;
