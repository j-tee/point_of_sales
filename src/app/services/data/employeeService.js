import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const EmployeeService = {
  addEmployees: (employee) => axios.post(`${API_URL}api/v1/employees/addEmployee`, employee, authHeader()),
  getEmployees: (shopId) => axios.get(`${API_URL}api/v1/employees/${shopId}`, authHeader()),
  updateEmployee: (employee) => axios.put(`${API_URL}api/v1/employees/updateEmployee`, employee, authHeader()),
  deleteEmployee: (id) => axios.delete(`${API_URL}api/v1/employees/${id}`, authHeader()),
};

export default EmployeeService;
