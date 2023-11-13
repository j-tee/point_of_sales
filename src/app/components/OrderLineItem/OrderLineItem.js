/* eslint-disable default-case */
/* eslint-disable max-len */
/* eslint-disable no-debugger */
/* eslint-disable import/no-extraneous-dependencies */
import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  Pagination, Table, DropdownButton, Dropdown, Button, Nav,
} from 'react-bootstrap';
import {
  addOrderLineItem, getOrderLineItem, getOrderLineItems, updateOrderLineItem,
} from '../../redux/reducers/orderlineSlice';
import Payment from '../payment';
import ToastContext from '../ToastContext';
import { showToastify } from '../Toastify';

const OrderLineItem = ({ productId, trigger }) => {
  const { lineItems, pagination } = useSelector((state) => state.orderline);
  const { customer } = useSelector((state) => state.customer);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const { order } = useSelector((state) => state.order) || {};
  const dispatch = useDispatch();
  const [lineItemUpdated, setlineItemUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const { setShowToast } = useContext(ToastContext);
  // const [quantity, setQuantity] = useState(0);
  const calculateModalPosition = () => {
    const navbarHeight = document.querySelector('.navbar').offsetHeight;
    return (window.innerHeight - navbarHeight) / 5;
  };

  useEffect(() => {
    if (trigger && order?.id) {
      dispatch(addOrderLineItem({ product_id: productId, order_id: order.id, quantity: 1 }))
        .then((res) => {
          setShowToast(true);
          if (!res.error) {
            showToastify('Product added to order successfully', 'success');
          } else if (res.error) {
            if (res.error.message === 'Rejected') {
              showToastify('Failed to add product to order', 'error');
            }
          }
          setlineItemUpdated(true);
        });
    }
  }, [dispatch, productId, trigger, order, setShowToast]);

  useEffect(() => {
    if (order.id && customer?.id && productId && trigger) {
      if (lineItemUpdated) {
        dispatch(getOrderLineItems({
          orderId: order?.id, customerId: customer?.id, productId, page: currentPage, perPage: itemsPerPage,
        })).then((res) => {
          setTotalPages(Math.ceil(res.data.pagination.total_items / itemsPerPage));
        });
      }
      setlineItemUpdated(false);
    }
  }, [dispatch, order.id, customer?.id, productId, currentPage, itemsPerPage, lineItemUpdated, trigger]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    setlineItemUpdated(true);
  };

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };
  const hanleQtyUpdate = (update, qty, id) => {
    const orderlineItem = dispatch(getOrderLineItem(id))
      .then(() => {
        switch (update) {
          case 'increase': {
            orderlineItem.quantity = qty + 1;
            break;
          }
          case 'decrease': {
            orderlineItem.quantity = qty - 1;
            break;
          }
        }
        orderlineItem.id = id;
        dispatch(updateOrderLineItem(orderlineItem))
          .then((res) => {
            setShowToast(true);
            if (!res.error) {
              showToastify('Order updated successfully', 'success');
            } else if (res.error) {
              if (res.error.message === 'Rejected') {
                showToastify('Failed to update  order', 'error');
              }
            }
            setlineItemUpdated(true);
          });
      });
  };
  const handleConfirmOrder = () => {
    setPaymentModalOpen(true);
  };

  return (
    <div className="p-3">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Tax</th>
            <th>Unit Price</th>
            <th>Total Cost</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.length > 0 ? (
            lineItems.map((item) => (
              <tr key={item.attributes.id}>
                <td>{item.attributes.product_name}</td>
                <td>
                  <span className="d-flex justify-content-between align-items-center">
                    <Nav.Link onClick={() => hanleQtyUpdate('decrease', item.attributes.quantity, item.attributes.id)} id={`${item.attributes.id}-decrease`} variant="transparent" className="text-white">
                      -
                    </Nav.Link>
                    {item.attributes.quantity}
                    <Nav.Link id={`${item.attributes.id}-increase`} onClick={() => hanleQtyUpdate('increase', item.attributes.quantity, item.attributes.id)} variant="transparent" className="text-white">
                      +
                    </Nav.Link>
                  </span>
                </td>
                <td>
                  GHS
                  {item.attributes.total_tax}
                </td>
                <td>
                  GHS
                  {item.attributes.unit_price}
                </td>
                <td>
                  GHS
                  {item.attributes.total_amount}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No line items found.</td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center">
        <Button onClick={handleConfirmOrder} className="mb-2" style={{ width: '100%' }}>Confirm Order</Button>
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={pagination?.total_items || 0}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          hideDisabled
          hideNavigation={totalPages === 1}
        />
        <DropdownButton id="dropdown-items-per-page" title={`Items per page: ${itemsPerPage}`}>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(5)}>5</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(10)}>10</Dropdown.Item>
          <Dropdown.Item onClick={() => handleItemsPerPageChange(20)}>20</Dropdown.Item>
        </DropdownButton>
      </div>
      <Payment
        isOpen={paymentModalOpen}
        onRequestClose={() => setPaymentModalOpen(false)}
        calculateModalPosition={calculateModalPosition}
        setPaymentModalOpen={setPaymentModalOpen}
      />
    </div>
  );
};

OrderLineItem.propTypes = {
  productId: PropTypes.number.isRequired,
  trigger: PropTypes.number.isRequired,
};

export default OrderLineItem;
