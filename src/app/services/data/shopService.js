/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const ShopService = {
  getShops: (id) => axios.get(`${API_URL}api/v1/stores/${id}`, authHeader()),
  registerShop: (shopObject) => axios.post(`${API_URL}api/v1/stores/registerStore`, shopObject, authHeader()),
  deleteShop: (id) => axios.delete(`${API_URL}api/v1/stores/deleteShop/${id}`, authHeader()),
  updateShop: (id, shop) => axios.put(`${API_URL}api/v1/stores/updateShop/${id}`, shop, authHeader()),
  getShop: (id) => axios.get(`${API_URL}api/v1/stores/getShop/${id}`, authHeader()),
};

export default ShopService;
