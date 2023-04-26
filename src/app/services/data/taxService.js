/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const TaxService = {
  getTaxes: (storeId, orderId) => axios.get(`${API_URL}api/v1/taxes/getTaxes/${storeId}/${orderId}`, authHeader()),
  getAllTaxes: (storeId) => axios.get(`${API_URL}api/v1/taxes/${storeId}`, authHeader()),
  addTax: (taxObject) => axios.post(`${API_URL}api/v1/taxes/registerStore`, taxObject, authHeader()),
  deleteTax: (id) => axios.delete(`${API_URL}api/v1/taxes/deleteShop/${id}`, authHeader()),
  updateTax: (id, tax) => axios.put(`${API_URL}api/v1/taxes/updateShop/${id}`, tax, authHeader()),
  getTax: (id) => axios.get(`${API_URL}api/v1/taxes/getShop/${id}`, authHeader()),
};

export default TaxService;
