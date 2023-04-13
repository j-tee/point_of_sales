import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const OrderLineService = {
  getOrderLineItems: (orderId, customerId, productId) => axios.get(`${API_URL}api/v1/order_line_items/getOrderLineItems/${orderId}/${customerId}/${productId}`, authHeader()),
  getOrderLineItem: (itemId) => axios.get(`${API_URL}api/v1/order_line_items/getOrderLineItem/${itemId}`, authHeader()),
  addOrderLineItem: (item) => axios.post(`${API_URL}api/v1/order_line_items/addOrderLineItem`, item, authHeader()),
  updateOrderLineItem: (item) => axios.put(`${API_URL}api/v1/order_line_items/updateOrderLineItem`, item, authHeader()),
  deleteOrderLineItem: (id) => axios.delete(`${API_URL}api/v1/order_line_items/deleteOrderLineItem/${id}`, authHeader()),
};

export default OrderLineService;
