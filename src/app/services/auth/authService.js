/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import axios from 'axios';
import authHeader from '../../helpers/authHeader';

const API_URL = process.env.REACT_APP_API_BASE_URL;

const AuthService = () => {
  const login = (email, password) => axios
    .post(`${API_URL}login`,
      {
        user: {
          email,
          password,
        },
      })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });

  const logout = () => axios.delete(`${API_URL}logout`, {
    headers: authHeader,
  })
    .then((response) => {
      localStorage.removeItem('user');
      return response.data;
    });

  const register = (username, email, password) => axios.post(`${API_URL}signup`,
    {
      user: {
        username,
        email,
        password,
      },
    });

  return {
    login,
    logout,
    register,
  };
};

export default AuthService();
