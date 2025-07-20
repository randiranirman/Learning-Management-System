// context/NotificationContext.jsx
import React, { createContext, useEffect } from "react";
import signalRService from "../services/signalRService";
import { ToastContainer } from "react-toastify";

export const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  useEffect(() => {
    signalRService.initializeConnection();
  }, []);

  return (
    <NotificationContext.Provider value={{}}>
      <ToastContainer position="top-right" autoClose={8000} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
