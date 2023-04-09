import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const OrderService = {
  getOrders: (storeId, customerId) => axios.get(`${API_URL}api/v1/orders/getOrders/${storeId}/${customerId}`, authHeader()),
  getOrder: (orderId) => axios.get(`${API_URL}api/v1/orders/getOrder/${orderId}`, authHeader()),
  addOrder: (order) => axios.post(`${API_URL}api/v1/orders/addOrder`, order, authHeader()),
  updateOrder: (order) => axios.put(`${API_URL}api/v1/orders/updateOrder`, order, authHeader()),
  deleteOrder: (id) => axios.delete(`${API_URL}api/v1/orders/deleteOrder/${id}`, authHeader()),
};

export default OrderService;
