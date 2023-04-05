/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ShopService = {
  getShops: (id) => axios.get(`${API_URL}api/v1/stores/${id}`, { headers: authHeader() }),
  registerShop: (shopObject) => axios.post(`${API_URL}api/v1/store/registerStore`, shopObject, { headers: authHeader() }),
  deleteShop: (id) => axios.delete(`${API_URL}api/v1/store/deleteShop/${id}`, { headers: authHeader() }),
  updateShop: (id, shop) => axios.put(`${API_URL}api/v1/store/updateShop/${id}`, shop, { headers: authHeader() }),
  getShop: (id) => axios.get(`${API_URL}api/v1/store/getShop/${id}`, { headers: authHeader() }),
};

export default ShopService;
