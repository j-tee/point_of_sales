import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const PaymentService = {
  getPayments: (paymentId, orderId, storeId) => axios.get(`${API_URL}api/v1/payments/getPayments/${paymentId}/${orderId}/${storeId}`, authHeader()),
  getPayment: (paymentId) => axios.get(`${API_URL}api/v1/payments/getPayment/${paymentId}`, authHeader()),
  addPayment: (payment) => axios.post(`${API_URL}api/v1/payments/addPayment`, payment, authHeader()),
  updatePayment: (payment) => axios.put(`${API_URL}api/v1/payments/updatePayment`, payment, authHeader()),
  deletePayment: (id) => axios.delete(`${API_URL}api/v1/payments/deletePayment/${id}`, authHeader()),
  getPaymentDetails: (storeId, stockId, customerId, employeeId, startDate, endDate, page, perPage) => axios.get(`${API_URL}api/v1/payments/getPaymentDetails/${storeId}/${stockId}/${customerId}/${employeeId}/${startDate}/${endDate}/${page}/${perPage}`, authHeader()),
};

export default PaymentService;
