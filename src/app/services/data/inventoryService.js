import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const InventoryService = {
  addProduct: (product) => axios.post(`${API_URL}api/v1/products/addProduct`, product, authHeader()),
  getProducts: (categoryId, storeId) => axios.get(`${API_URL}api/v1/products/getProducts/${storeId}/${categoryId}`, authHeader()),
  getUniqueListOfCountries: (storeId) => axios.get(`${API_URL}api/v1/products/getUniqueListOfCountries/${storeId}`, authHeader()),
  getUniqueProducts: (storeId, categoryId, country) => axios.get(`${API_URL}api/v1/products/getUniqueProducts/${storeId}/${categoryId}/${country}`, authHeader()),
  getUniqueManufacturers: (storeId, categoryId, country, productName) => axios.get(`${API_URL}api/v1/products/getUniqueManufacturers/${storeId}/${categoryId}/${country}/${productName}`, authHeader()),
};

export default InventoryService;
