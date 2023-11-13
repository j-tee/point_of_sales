/* eslint-disable max-len */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const InventoryService = {
  getInventorySummary: (storeId, stockId, categoryId, productName) => axios.get(`${API_URL}api/v1/stores/getInventorySummary/${storeId}/${stockId}/${categoryId}/${productName}`, authHeader()),
  addDamages: (obj) => axios.post(`${API_URL}api/v1/products/addDamages`, obj, authHeader()),
  updateDamages: (id, obj) => axios.put(`${API_URL}api/v1/products/updateDamages/${id}`, obj, authHeader()),
  getDamages: (productId, page, perPage) => axios.get(`${API_URL}api/v1/products/getDamages/${productId}/${page}/${perPage}`, authHeader()),
  deleteNotification: (id) => axios.delete(`${API_URL}api/v1/products/removeNotification/${id}`),
  getNotifications: (storeId) => axios.get(`${API_URL}api/v1/products/getNotifications/${storeId}`, authHeader()),
  addNotification: (notification) => axios.post(`${API_URL}api/v1/products/addNotification`, notification, authHeader()),
  getProductWitoutASpecificTax: (taxId) => axios.get(`${API_URL}api/v1/getProductWitoutASpecificTax/${taxId}`, authHeader()),
  addProduct: (product) => axios.post(`${API_URL}api/v1/products/addProduct`, product, authHeader()),
  updateProduct: (id, product) => axios.put(`${API_URL}api/v1/products/updateProduct/${id}`, product, authHeader()),
  addStock: (stock) => axios.post(`${API_URL}api/v1/stocks/addStock`, stock, authHeader()),
  getStock: (id) => axios.get(`${API_URL}api/v1/stocks/getStock/${id}`, authHeader()),
  getProduct: (id) => axios.get(`${API_URL}api/v1/products/getProduct/${id}`, authHeader()),
  getProducts: (storeId, stockId, categoryId, page, perPage, productName, country, manufacturer, expdate) => {
    let url = `${API_URL}api/v1/products/getProducts/${storeId}/${stockId}/${categoryId}/${page}/${perPage}`;
    if (productName !== undefined) {
      url += `/${productName}`;
    }
    if (country !== undefined) {
      url += `/${country}`;
    }
    if (manufacturer !== undefined) {
      url += `/${manufacturer}`;
    }
    if (expdate !== undefined) {
      url += `/${expdate}`;
    }
    return axios.get(url, authHeader());
  },
  getUniqueProductNamesByCategory: (categoryId) => axios.get(`${API_URL}api/v1/products/getUniqueProductNamesByCategory/${categoryId}`, authHeader()),
  getUniqueListOfCountries: (stockId) => axios.get(`${API_URL}api/v1/products/getUniqueListOfCountries/${stockId}`, authHeader()),
  getUniqueProducts: (stockId, categoryId, country) => axios.get(`${API_URL}api/v1/products/getUniqueProducts/${stockId}/${categoryId}/${country}`, authHeader()),
  getUniqueProductNamesByStock: (stockId) => axios.get(`${API_URL}api/v1/products/getUniqueProductNamesByStock/${stockId}`, authHeader()),
  getUniqueManufacturers: (stockId, categoryId, country, productName) => axios.get(`${API_URL}api/v1/products/getUniqueManufacturers/${stockId}/${categoryId}/${country}/${productName}`, authHeader()),
  getStocks: (stockId) => axios.get(`${API_URL}api/v1/stocks/getStocks/${stockId}`, authHeader()),
};

export default InventoryService;
