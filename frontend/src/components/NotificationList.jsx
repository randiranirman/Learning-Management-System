import React from 'react';
import { List, Avatar, Button, Popconfirm, Divider, Empty, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNotification } from '../contexts/NotificationContext';

const getTimeAgo = (timestamp) => {
  const now = new Date();
  const time = new Date(timestamp);
  const diffInMs = now - time;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) {
    return 'Just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
};

const NotificationList = ({ notifications: propNotifications }) => {
    // Mock notifications data since the context may not have them yet
    const mockNotifications = propNotifications || [
        {
            id: 1,
            title: "Welcome to the Learning Management System",
            message: "Your account has been successfully created. Start exploring the platform!",
            type: "success",
            read: false,
            timestamp: new Date().toISOString()
        },
        {
            id: 2,
            title: "Assignment Due Soon",
            message: "You have an assignment due in 2 days. Don't forget to submit it on time.",
            type: "warning",
            read: false,
            timestamp: new Date(Date.now() - 60000 * 30).toISOString() // 30 minutes ago
        },
        {
            id: 3,
            title: "System Maintenance",
            message: "Scheduled maintenance will occur this weekend from 2 AM to 4 AM.",
            type: "info",
            read: true,
            timestamp: new Date(Date.now() - 60000 * 60 * 2).toISOString() // 2 hours ago
        }
    ];

    const notifications = mockNotifications;

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'success':
                return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
            case 'error':
                return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
            case 'warning':
                return <ExclamationCircleOutlined style={{ color: '#faad14' }} />;
            default:
                return <InfoCircleOutlined style={{ color: '#1890ff' }} />;
        }
    };

    const getNotificationColor = (type) => {
        switch (type) {
            case 'success':
                return '#52c41a';
            case 'error':
                return '#ff4d4f';
            case 'warning':
                return '#faad14';
            default:
                return '#1890ff';
        }
    };

    const markAsRead = (id) => {
        console.log('Marking notification as read:', id);
        // This would typically update the notification state
    };

    const clearAllNotifications = () => {
        console.log('Clearing all notifications');
        // This would typically clear all notifications
    };

    return (
        <div>
            {notifications.length > 0 ? (
                <List
                    itemLayout="horizontal"
                    dataSource={notifications}
                    renderItem={notification => (
                        <List.Item
                            style={{
                                backgroundColor: notification.read ? '#f5f5f5' : '#ffffff',
                                borderLeft: `4px solid ${getNotificationColor(notification.type)}`,
                                marginBottom: '8px',
                                padding: '16px',
                                borderRadius: '4px'
                            }}
                            actions={[
                                <Button
                                    type="link"
                                    icon={<CheckOutlined />}
                                    onClick={() => markAsRead(notification.id)}
                                    disabled={notification.read}
                                    size="small"
                                    key="mark-read"
                                >
                                    {notification.read ? 'Read' : 'Mark as Read'}
                                </Button>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar 
                                        icon={getNotificationIcon(notification.type)}
                                        style={{ backgroundColor: '#f0f0f0' }}
                                    />
                                }
                                title={
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <span style={{ fontWeight: notification.read ? 'normal' : 'bold' }}>
                                            {notification.title || 'Notification'}
                                        </span>
                                        <Tag color={getNotificationColor(notification.type)} size="small">
                                            {(notification.type || 'info').toUpperCase()}
                                        </Tag>
                                        {!notification.read && (
                                            <Tag color="red" size="small">NEW</Tag>
                                        )}
                                    </div>
                                }
                                description={
                                    <div>
                                        <div style={{ marginBottom: '4px' }}>
                                            {notification.message || 'No message'}
                                        </div>
                                        <small style={{ color: '#999' }}>
                                            {getTimeAgo(notification.timestamp)}
                                        </small>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Empty 
                    image={<BellOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />}
                    description={
                        <span style={{ color: '#999' }}>
                            No notifications yet
                        </span>
                    }
                />
            )}
            {notifications.length > 0 && (
                <>
                    <Divider />
                    <div style={{ textAlign: 'center' }}>
                        <Button 
                            type="primary" 
                            danger 
                            onClick={clearAllNotifications}
                            icon={<DeleteOutlined />}
                        >
                            Clear All Notifications
                        </Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default NotificationList;
