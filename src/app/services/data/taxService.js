/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const TaxService = {
  getTaxesOnAProduct: (productId) => axios.get(`${API_URL}api/v1/getTaxesOnAProduct/${productId}`),
  getProductWithoutTaxes: (storeId, taxId, page, perPage) => axios.get(`${API_URL}api/v1/taxes/getProductWithoutTaxes/${storeId}/${taxId}/${page}/${perPage}`, authHeader()),
  getTaxedProducts: (storeId, taxId, page, perPage) => axios.get(`${API_URL}api/v1/taxes/getTaxedProducts/${storeId}/${taxId}/${page}/${perPage}`, authHeader()),
  applyTax: (taxId) => axios.post(`${API_URL}api/v1/taxes/applyTax/${taxId}`, authHeader()),
  applyTaxToSpecificProducts: (taxId, products) => axios.post(`${API_URL}api/v1/applyTaxToSpecificProducts/${taxId}`, products, authHeader()),
  getTaxList: (storeId) => axios.get(`${API_URL}api/v1/taxes/getTaxList/${storeId}`, authHeader()),
  getTaxes: (orderId) => axios.get(`${API_URL}api/v1/taxes/getTaxes/${orderId}`, authHeader()),
  getAllTaxes: (storeId) => axios.get(`${API_URL}api/v1/taxes/${storeId}`, authHeader()),
  addTax: (taxObject) => axios.post(`${API_URL}api/v1/taxes/addTax`, taxObject, authHeader()),
  deleteTax: (id) => axios.delete(`${API_URL}api/v1/taxes/deleteTax/${id}`, authHeader()),
  updateTax: (id, tax) => axios.put(`${API_URL}api/v1/taxes/updateTax/${id}`, tax, authHeader()),
  getTax: (id) => axios.get(`${API_URL}api/v1/taxes/getTax/${id}`, authHeader()),
};

export default TaxService;
