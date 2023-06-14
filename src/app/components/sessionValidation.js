import { showToastify } from './Toastify';

const sessionInfo = localStorage.getItem('header');

const SessionValidation = {
  validateToken: () => {
    if (sessionInfo) {
      const { authorization } = JSON.parse(sessionInfo);
      const token = authorization.split('Bearer ')[1];

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(window.atob(base64));

      const expirationTime = new Date(decodedToken.exp * 1000);

      if (expirationTime < new Date()) {
        // Perform necessary actions like logging out the user or redirecting
        localStorage.removeItem('user');
        localStorage.removeItem('headers');
        showToastify('Session has expired!', 'error');
        return false;
      }
      return true;
    }
    showToastify('No session information found! You must log in!!', 'error');
    return false;
  },
};

export default SessionValidation;
