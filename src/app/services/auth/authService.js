import axios from 'axios';

const API_URL = 'http://localhost:3000/';

const AuthService = () => {
  const login = (username, password) => axios
    .post(`${API_URL}login`, { username, password })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });

  const logout = () => {
    localStorage.removeItem('user');
  };

  const register = (username, email, password) => axios.post(`${API_URL}signup`, {
    username,
    email,
    password,
  });

  return {
    login,
    logout,
    register,
  };
};

export default AuthService();
