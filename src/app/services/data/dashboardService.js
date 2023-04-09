import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;
const DashboardService = {
  getStores: (id) => axios.get(`${API_URL}api/v1/dashboard/${id}`),
  getUserBoard: () => axios.get(`${API_URL}user`, authHeader()),
  getModeratorBoard: () => axios.get(`${API_URL}mod`, authHeader()),
  getAdminBoard: () => axios.get(`${API_URL}admin`, authHeader()),
};

export default DashboardService;
