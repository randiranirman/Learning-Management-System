import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Badge,
  Divider,
  Button,
  Space,
  Row,
  Col,
  Statistic,
  Select,
  Input,
  theme
} from 'antd';
import {
  BellOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { useNotifications } from '../../../contexts/NotificationContext';
import NotificationList from '../../../components/NotificationList';

const { Title, Text } = Typography;

const StudentNotifications = () => {
  const { 
    notifications, 
    getUnreadCount, 
    connectionState, 
    markAllAsRead,
    clearAllNotifications,
    reconnectSignalR
  } = useNotifications();
  
  const [filteredNotifications, setFilteredNotifications] = useState(notifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { token } = theme.useToken();

  useEffect(() => {
    filterNotifications();
  }, [notifications, searchTerm, filterType]);

  const filterNotifications = () => {
    let filtered = notifications;

    // Filter by type
    if (filterType !== 'all') {
      if (filterType === 'unread') {
        filtered = filtered.filter(n => !n.read);
      } else {
        filtered = filtered.filter(n => n.type === filterType);
      }
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredNotifications(filtered);
  };

  const getNotificationStats = () => {
    const total = notifications.length;
    const unread = notifications.filter(n => !n.read).length;
    const approvedRegistrations = notifications.filter(n => 
      n.type === 'success' && n.title.includes('Approved')
    ).length;
    const rejectedRegistrations = notifications.filter(n => 
      n.type === 'error' && n.title.includes('Rejected')
    ).length;

    return { total, unread, approvedRegistrations, rejectedRegistrations };
  };

  const stats = getNotificationStats();

  const refreshData = () => {
    if (connectionState !== 'Connected') {
      reconnectSignalR();
    }
  };

  return (
    <div style={{ padding: '24px', background: token.colorBgLayout, minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <BellOutlined style={{ 
                fontSize: '28px', 
                marginRight: '16px', 
                color: token.colorPrimary 
              }} />
              <div>
                <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
                  My Notifications
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Stay updated with your registration status and important announcements
                </Text>
              </div>
            </div>
          </Col>
          <Col>
            <Space>
              <Badge 
                count={stats.unread} 
                style={{ backgroundColor: token.colorError }}
                showZero={false}
              >
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={refreshData}
                >
                  Refresh
                </Button>
              </Badge>
            </Space>
          </Col>
        </Row>
      </div>

      {/* Statistics Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Total Notifications"
              value={stats.total}
              prefix={<BellOutlined />}
              valueStyle={{ color: token.colorText }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Unread"
              value={stats.unread}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: token.colorError }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Approved Registrations"
              value={stats.approvedRegistrations}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: token.colorSuccess }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="Rejected Registrations"
              value={stats.rejectedRegistrations}
              prefix={<ExclamationCircleOutlined />}
              valueStyle={{ color: token.colorError }}
            />
          </Card>
        </Col>
      </Row>

      {/* Connection Status */}
      <Card size="small" style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Text strong>Connection Status:</Text>
              <Badge 
                status={connectionState === 'Connected' ? 'success' : 'error'} 
                text={connectionState}
              />
            </Space>
          </Col>
          <Col>
            <Space>
              {stats.unread > 0 && (
                <Button 
                  type="primary" 
                  size="small" 
                  onClick={markAllAsRead}
                  icon={<CheckCircleOutlined />}
                >
                  Mark All Read ({stats.unread})
                </Button>
              )}
              {stats.total > 0 && (
                <Button 
                  danger 
                  size="small" 
                  onClick={clearAllNotifications}
                >
                  Clear All
                </Button>
              )}
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card>
        {/* Filters for notifications */}
        <div style={{ marginBottom: '16px' }}>
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input
                placeholder="Search notifications..."
                prefix={<SearchOutlined />}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                allowClear
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                style={{ width: '100%' }}
                placeholder="Filter by type"
                value={filterType}
                onChange={setFilterType}
              >
                <Select.Option value="all">All Types</Select.Option>
                <Select.Option value="unread">Unread Only</Select.Option>
                <Select.Option value="info">Info</Select.Option>
                <Select.Option value="success">Success</Select.Option>
                <Select.Option value="warning">Warning</Select.Option>
                <Select.Option value="error">Error</Select.Option>
              </Select>
            </Col>
            <Col xs={24} sm={24} md={8}>
              <Text type="secondary">
                Showing {filteredNotifications.length} of {stats.total} notifications
              </Text>
            </Col>
          </Row>
        </div>
        
        <Divider />
        
        <NotificationList notifications={filteredNotifications} />
      </Card>
    </div>
  );
};

export default StudentNotifications;
