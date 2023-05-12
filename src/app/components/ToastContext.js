/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [showToast, setShowToast] = useState(false);

  return (
    <ToastContext.Provider value={{ showToast, setShowToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
