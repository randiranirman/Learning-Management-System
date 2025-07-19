import React from 'react';
import { List, Avatar, Button, Popconfirm, Divider, Empty, Tag } from 'antd';
import { CheckOutlined, DeleteOutlined, BellOutlined, CheckCircleOutlined, ExclamationCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNotifications } from '../contexts/NotificationContext';
import moment from 'moment';

const NotificationList = ({ notifications: propNotifications }) => {
    const {
        notifications: contextNotifications,
        markAsRead,
        removeNotification,
        clearAllNotifications
    } = useNotifications();

    // Use prop notifications if provided, otherwise use context notifications
    const notifications = propNotifications || contextNotifications;

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
                                >
                                    {notification.read ? 'Read' : 'Mark as Read'}
                                </Button>,
                                <Popconfirm
                                    title="Are you sure you want to delete this notification?"
                                    onConfirm={() => removeNotification(notification.id)}
                                    okText="Yes"
                                    cancelText="No"
                                >
                                    <Button type="link" icon={<DeleteOutlined />} danger size="small" />
                                </Popconfirm>
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
                                            {notification.title}
                                        </span>
                                        <Tag color={getNotificationColor(notification.type)} size="small">
                                            {notification.type.toUpperCase()}
                                        </Tag>
                                        {!notification.read && (
                                            <Tag color="red" size="small">NEW</Tag>
                                        )}
                                    </div>
                                }
                                description={
                                    <div>
                                        <div style={{ marginBottom: '4px' }}>
                                            {notification.message}
                                        </div>
                                        <small style={{ color: '#999' }}>
                                            {moment(notification.timestamp).fromNow()}
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
