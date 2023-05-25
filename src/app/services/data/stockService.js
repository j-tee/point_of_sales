import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const StockService = {
  getStocks: (storeId) => axios.get(`${API_URL}api/v1/stocks/getStocks/${storeId}/`, authHeader()),
  getStock: (Id) => axios.get(`${API_URL}api/v1/stocks/getStock/${Id}`, authHeader()),
  addStock: (stock) => axios.post(`${API_URL}api/v1/stocks/addStock`, stock, authHeader()),
  updateStock: (stock) => axios.put(`${API_URL}api/v1/stocks/updateStock`, stock, authHeader()),
  deleteStock: (id) => axios.delete(`${API_URL}api/v1/stocks/deleteStock/${id}`, authHeader()),
};

export default StockService;
