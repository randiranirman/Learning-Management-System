import React, { createContext, useContext, useState, useEffect } from 'react';
import signalRService from '../services/signalRService';

const NotificationContext = createContext();

export const useNotifications = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotifications must be used within a NotificationProvider');
    }
    return context;
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [connectionState, setConnectionState] = useState('Disconnected');
    const [isInitialized, setIsInitialized] = useState(false);

    // Initialize SignalR connection
    useEffect(() => {
        const initializeSignalR = async () => {
            try {
                // Check if user is authenticated
                const token = localStorage.getItem('accessToken');
                const userId = localStorage.getItem('UserId');
                const userRole = localStorage.getItem('UserRole');

                if (token && userId && userRole) {
                    await signalRService.initializeConnection();
                    setConnectionState(signalRService.getConnectionState());
                    setIsInitialized(true);

                    // Set up custom notification handlers
                    signalRService.onNotification('NewRegistration', handleNewRegistration);
                    signalRService.onNotification('RegistrationApproved', handleRegistrationApproved);
                    signalRService.onNotification('RegistrationRejected', handleRegistrationRejected);
                    signalRService.onNotification('NewAssignment', handleNewAssignment);
                    signalRService.onNotification('GeneralNotification', handleGeneralNotification);
                }
            } catch (error) {
                console.error('Failed to initialize SignalR:', error);
                setConnectionState('Failed');
            }
        };

        initializeSignalR();

        // Cleanup on unmount
        return () => {
            if (isInitialized) {
                signalRService.disconnect();
            }
        };
    }, []);

    // Monitor connection state
    useEffect(() => {
        const interval = setInterval(() => {
            if (signalRService.connection) {
                setConnectionState(signalRService.getConnectionState());
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isInitialized]);

    // Notification handlers
    const handleNewRegistration = (data) => {
        const notification = {
            id: Date.now(),
            type: 'info',
            title: 'New Registration',
            message: `Student ID ${data.studentId} has requested registration for ${data.className}`,
            timestamp: new Date(),
            data: data,
            read: false
        };
        addNotification(notification);
    };

    const handleRegistrationApproved = (data) => {
        const notification = {
            id: Date.now(),
            type: 'success',
            title: 'Registration Approved',
            message: `Your registration for ${data.className} has been approved`,
            timestamp: new Date(),
            data: data,
            read: false
        };
        addNotification(notification);
    };

    const handleRegistrationRejected = (data) => {
        const notification = {
            id: Date.now(),
            type: 'error',
            title: 'Registration Rejected',
            message: `Your registration for ${data.className} was rejected`,
            timestamp: new Date(),
            data: data,
            read: false
        };
        addNotification(notification);
    };

    const handleNewAssignment = (data) => {
        const notification = {
            id: Date.now(),
            type: 'info',
            title: 'New Assignment',
            message: `New assignment "${data.title}" posted for ${data.subjectName}`,
            timestamp: new Date(),
            data: data,
            read: false
        };
        addNotification(notification);
    };

    const handleGeneralNotification = (data) => {
        const notification = {
            id: Date.now(),
            type: data.type || 'info',
            title: data.title || 'Notification',
            message: data.message,
            timestamp: new Date(),
            data: data,
            read: false
        };
        addNotification(notification);
    };

    // Add notification to state
    const addNotification = (notification) => {
        setNotifications(prev => [notification, ...prev]);
    };

    // Mark notification as read
    const markAsRead = (notificationId) => {
        setNotifications(prev => 
            prev.map(notification => 
                notification.id === notificationId 
                    ? { ...notification, read: true }
                    : notification
            )
        );
    };

    // Mark all notifications as read
    const markAllAsRead = () => {
        setNotifications(prev => 
            prev.map(notification => ({ ...notification, read: true }))
        );
    };

    // Remove notification
    const removeNotification = (notificationId) => {
        setNotifications(prev => 
            prev.filter(notification => notification.id !== notificationId)
        );
    };

    // Clear all notifications
    const clearAllNotifications = () => {
        setNotifications([]);
    };

    // Get unread count
    const getUnreadCount = () => {
        return notifications.filter(n => !n.read).length;
    };

    // Reconnect SignalR
    const reconnectSignalR = async () => {
        try {
            await signalRService.disconnect();
            await signalRService.initializeConnection();
            setConnectionState(signalRService.getConnectionState());
        } catch (error) {
            console.error('Failed to reconnect SignalR:', error);
        }
    };

    const value = {
        notifications,
        connectionState,
        isInitialized,
        addNotification,
        markAsRead,
        markAllAsRead,
        removeNotification,
        clearAllNotifications,
        getUnreadCount,
        reconnectSignalR
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export default NotificationProvider;
