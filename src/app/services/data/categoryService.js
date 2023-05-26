import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const CategoryService = {
  getCategories: (storeId) => axios.get(`${API_URL}api/v1/categories/getCategories/${storeId}`, authHeader()),
  addCategory: (category) => axios.post(`${API_URL}api/v1/categories/addCategory`, category, authHeader()),
  updateCategory: (category) => axios.put(`${API_URL}api/categories/v1/updateCategories`, category, authHeader()),
  deleteCategory: (id) => axios.put(`${API_URL}api/v1/categories/deleteCategories/${id}`, authHeader()),
};

export default CategoryService;
