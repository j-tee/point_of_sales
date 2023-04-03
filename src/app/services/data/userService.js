/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const UserService = {
  getPublicContent: () => axios.get(`${API_URL}all`),
  getUserBoard: () => axios.get(`${API_URL}user`, { headers: authHeader() }),
  getModeratorBoard: () => axios.get(`${API_URL}mod`, { headers: authHeader() }),
  getAdminBoard: () => axios.get(`${API_URL}admin`, { headers: authHeader() }),
};

export default UserService;
