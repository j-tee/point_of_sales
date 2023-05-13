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
      if (response.headers.authorization) {
        localStorage.setItem('header', JSON.stringify(response.headers));
        const header = JSON.parse(localStorage.getItem('header'));
        console.log('headers information=> ', header);
        localStorage.setItem('user', JSON.stringify(response.data.data));
      }

      return response.data;
    });

  const resetMessage = () => undefined;

  const logout = () => axios.delete(`${API_URL}logout`, {
    headers: JSON.parse(localStorage.getItem('header')),
    body: JSON.stringify({ user: JSON.parse(localStorage.getItem('user')) }),
  })
    .then((response) => {
      localStorage.removeItem('user');
      localStorage.removeItem('header');
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
    resetMessage,
  };
};

export default AuthService();
