import React from 'react';
import { Card, Typography, Badge, Divider } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { useNotifications } from '../../../contexts/NotificationContext';
import NotificationList from '../../../components/NotificationList';

const { Title, Text } = Typography;

const Notifications = () => {
  const { notifications, getUnreadCount, connectionState } = useNotifications();

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Card
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <BellOutlined style={{ fontSize: '24px', marginRight: '12px', color: '#1890ff' }} />
          <Title level={2} style={{ margin: 0, color: '#1f1f1f' }}>
            Teacher Notifications
          </Title>
          <Badge 
            count={getUnreadCount()} 
            style={{ marginLeft: '16px' }}
            showZero={false}
          />
        </div>
        
        <div style={{ marginBottom: '16px' }}>
          <Text type="secondary">
            Connection Status: 
            <span style={{ 
              color: connectionState === 'Connected' ? '#52c41a' : '#ff4d4f',
              fontWeight: 'bold',
              marginLeft: '8px'
            }}>
              {connectionState}
            </span>
          </Text>
        </div>
        
        <Divider />
        
        <NotificationList />
      </Card>
    </div>
  );
};

export default Notifications;
