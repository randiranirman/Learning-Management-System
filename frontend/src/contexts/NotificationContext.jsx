// context/NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import signalRService from "../services/signalRService";
import { ToastContainer } from "react-toastify";
import { getUserRole, getIdFromToken } from "../utils/authService";

export const NotificationContext = createContext();

// Custom hook to use notification context
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [connectionState, setConnectionState] = useState('Disconnected');
  const [isLoading, setIsLoading] = useState(false);

  const userRole = getUserRole();
  const userId = getIdFromToken(localStorage.getItem('accessToken'));

  useEffect(() => {
    const initializeSignalR = async () => {
      try {
        // Pass userRole and userId to initialize connection properly
        const success = await signalRService.initializeConnection(userRole, userId);
        
        if (success) {
          setConnectionState('Connected');
          console.log(`SignalR initialized successfully for ${userRole} user`);
        } else {
          setConnectionState('Disconnected');
        }
        
      } catch (error) {
        console.error('Failed to initialize SignalR:', error);
        setConnectionState('Disconnected');
      }
    };

    // Only initialize if we have both user role and user ID (or if user is admin)
    if (userRole && (userId || userRole === 'Admin')) {
      initializeSignalR();
    }

    // Cleanup function
    return () => {
      signalRService.stopConnection();
    };
  }, [userRole, userId]);

  // Add a notification to the local state
  const addNotification = useCallback((notification) => {
    const newNotification = {
      id: Date.now() + Math.random(), // Simple unique ID
      timestamp: new Date(),
      read: false,
      ...notification
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  }, []);

  // Mark notification as read
  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  }, []);

  // Clear all notifications
  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Get unread count
  const getUnreadCount = useCallback(() => {
    return notifications.filter(notif => !notif.read).length;
  }, [notifications]);

  // Reconnect SignalR
  const reconnectSignalR = useCallback(async () => {
    setConnectionState('Reconnecting');
    try {
      await signalRService.reconnect();
      setConnectionState('Connected');
    } catch (error) {
      console.error('Failed to reconnect SignalR:', error);
      setConnectionState('Disconnected');
    }
  }, []);

  const value = {
    notifications,
    connectionState,
    isLoading,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearAllNotifications,
    getUnreadCount,
    reconnectSignalR
  };

  return (
    <NotificationContext.Provider value={value}>
      <ToastContainer position="top-right" autoClose={8000} />
      {children}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;
