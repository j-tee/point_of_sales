import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CustomerService = {
  getCustomers: (storeId) => axios.get(`${API_URL}api/v1/customers/getCustomers/${storeId}`, authHeader()),
  getCustomer: (customerId) => axios.get(`${API_URL}api/v1/customers/getCustomer/${customerId}`, authHeader()),
  addCustomer: (customer) => axios.post(`${API_URL}api/v1/customers/addCustomer`, customer, authHeader()),
  updateCustomer: (customer) => axios.put(`${API_URL}api/v1/customers/updateCustomer`, customer, authHeader()),
  deleteCustomer: (id) => axios.delete(`${API_URL}api/v1/customers/deleteCustomer/${id}`, authHeader()),
};

export default CustomerService;
