// NotificationContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { startSignalRConnection, stopSignalRConnection, getConnectionState, joinGroup, leaveGroup } from '../utils/notificationService';
import { AuthContext } from '../auth/authContext'; // Import your AuthContext
import 'react-toastify/dist/ReactToastify.css';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

const NotificationProvider = ({ children }) => {
  const [connectionState, setConnectionState] = useState('Disconnected');
  const [isInitialized, setIsInitialized] = useState(false);
  const { isAuth, userRole } = useContext(AuthContext); // Use your auth context

  const [notifications, setNotifications] = useState([]);
  // add new notification 
  const addNotification = (notification) => {
    setNotifications((prev) => [...prev, notification]);
    console.log("🔔 New notification added:", notification);
  }

  // Initialize SignalR connection when user is authenticated
  useEffect(() => {
    const initializeSignalR = async () => {
      if (isAuth && userRole && !isInitialized) {
        try {
          // Get userId from localStorage using the exact key from authService
          const userId = localStorage.getItem("UserId");
          
          console.log('🚀 Initializing SignalR for role:', userRole, 'userId:', userId);
          await startSignalRConnection(userId, addNotification);
          setIsInitialized(true);
          console.log('✅ SignalR connection initialized');
        } catch (error) {
          console.error('❌ Failed to initialize SignalR:', error);
        }
      }
    };

    initializeSignalR();
  }, [isAuth, userRole, isInitialized]);


  
  // Monitor connection state
  useEffect(() => {
    if (!isInitialized) return;

    const checkConnection = setInterval(() => {
      const state = getConnectionState();
      setConnectionState(state);
    }, 2000);

    return () => clearInterval(checkConnection);
  }, [isInitialized]);

  // Cleanup on unmount or logout
  useEffect(() => {
    return () => {
      if (isInitialized) {
        stopSignalRConnection();
        setIsInitialized(false);
      }
    };
  }, []);

  // Handle logout - stop connection
  useEffect(() => {
    if (!isAuth && isInitialized) {
      stopSignalRConnection();
      setIsInitialized(false);
      setConnectionState('Disconnected');
      console.log('🛑 SignalR connection stopped due to logout');
    }
  }, [isAuth, isInitialized]);

  const contextValue = {
    connectionState,
    isInitialized,
    notifications,
    joinGroup: async (groupType, userId = null) => {
      if (connectionState === 'Connected') {
        await joinGroup(groupType, userId);
      }
    },
    leaveGroup: async (groupType, userId = null) => {
      if (connectionState === 'Connected') {
        await leaveGroup(groupType, userId);
      }
    },
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      
      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="custom-toast-container"
      />
      
      {/* Optional: Connection Status Indicator */}
      {isAuth && (
        <div className="signalr-status" style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          zIndex: 9999,
          backgroundColor: connectionState === 'Connected' ? '#4CAF50' : '#f44336',
          color: 'white',
          display: process.env.NODE_ENV === 'development' ? 'block' : 'none' // Only show in development
        }}>
          🔗 {connectionState}
        </div>
      )}
    </NotificationContext.Provider>
  );
};

export default NotificationProvider;