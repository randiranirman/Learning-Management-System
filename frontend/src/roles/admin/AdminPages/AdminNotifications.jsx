import React from 'react';
import { Card, Typography, Space, Tag, Empty, Badge, Avatar } from 'antd';
import { CheckCircleOutlined, InfoCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, BellOutlined } from '@ant-design/icons';
import { useNotification } from '../../../contexts/NotificationContext';

const { Title, Text, Paragraph } = Typography;

const StudentNotifications = () => {
  const { notifications } = useNotification();
  console.log("🔔 Student Notifications:", notifications);

  const getNotificationIcon = (type) => {
    const iconProps = { style: { fontSize: '16px' } };
    switch (type) {
      case 'success':
        return <CheckCircleOutlined {...iconProps} style={{ color: '#52c41a' }} />;
      case 'info':
        return <InfoCircleOutlined {...iconProps} style={{ color: '#1890ff' }} />;
      case 'warning':
        return <ExclamationCircleOutlined {...iconProps} style={{ color: '#faad14' }} />;
      case 'error':
        return <CloseCircleOutlined {...iconProps} style={{ color: '#ff4d4f' }} />;
      default:
        return <BellOutlined {...iconProps} style={{ color: '#8c8c8c' }} />;
    }
  };

  const getTagColor = (type) => {
    switch (type) {
      case 'success': return 'success';
      case 'info': return 'blue';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'default';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div style={{ padding: '24px', maxWidth: '800px', marginLeft: '24px' }}>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <Avatar 
          icon={<BellOutlined />} 
          style={{ backgroundColor: '#1890ff' }}
          size="large"
        />
        <div>
          <Title level={2} style={{ margin: 0, color: '#262626' }}>
            Notifications
          </Title>
          <Text type="secondary">Stay updated with your latest activities</Text>
        </div>
        {notifications.length > 0 && (
          <Badge 
            count={notifications.length} 
            style={{ marginLeft: 'auto' }}
            showZero={false}
          />
        )}
      </div>

      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        {notifications.length === 0 ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={
              <Text type="secondary">No notifications yet</Text>
            }
            style={{ padding: '40px 0' }}
          />
        ) : (
          notifications.map((notification) => (
            <Card
              key={notification.id}
              hoverable
              style={{
                borderRadius: '8px',
                border: '1px solid #f0f0f0',
                boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03)',
                transition: 'all 0.2s ease'
              }}
              bodyStyle={{ padding: '20px' }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ marginTop: '4px' }}>
                  {getNotificationIcon(notification.type)}
                </div>
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    marginBottom: '8px',
                    flexWrap: 'wrap'
                  }}>
                    <Title level={4} style={{ margin: 0, color: '#262626' }}>
                      {notification.title}
                    </Title>
                    <Tag color={getTagColor(notification.type)} style={{ margin: 0 }}>
                      {notification.type}
                    </Tag>
                  </div>
                  
                  <Paragraph 
                    style={{ 
                      margin: '0 0 12px 0', 
                      color: '#595959',
                      lineHeight: '1.6'
                    }}
                  >
                    {notification.message}
                  </Paragraph>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Text 
                      type="secondary" 
                      style={{ fontSize: '12px' }}
                    >
                      {formatTimestamp(notification.timestamp)}
                    </Text>
                  </div>
                </div>
              </div>
            </Card>
          ))
        )}
      </Space>
    </div>
  );
};

export default StudentNotifications;