import React, { useState } from 'react';
import {
  Card,
  Typography,
  Badge,
  Divider,
  Button,
  Space,
  Tabs,
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
  UserOutlined,
  BookOutlined,
  SearchOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import NotificationList from '../../../components/NotificationList';

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const AdminNotifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const { token } = theme.useToken();

  // Mock data for admin notifications
  const mockNotifications = [
    {
      id: 1,
      title: "New Student Registration",
      message: "A new student has registered and is pending approval.",
      type: "info",
      read: false,
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: "System Update Complete",
      message: "The learning management system has been successfully updated to version 2.1.",
      type: "success",
      read: false,
      timestamp: new Date(Date.now() - 60000 * 45).toISOString()
    },
    {
      id: 3,
      title: "Server Maintenance Alert",
      message: "Scheduled maintenance will occur this weekend. Please notify users.",
      type: "warning",
      read: true,
      timestamp: new Date(Date.now() - 60000 * 120).toISOString()
    },
    {
      id: 4,
      title: "New Teacher Registration",
      message: "A new teacher has submitted their registration for review.",
      type: "info",
      read: false,
      timestamp: new Date(Date.now() - 60000 * 180).toISOString()
    }
  ];

  const getNotificationStats = () => {
    const total = mockNotifications.length;
    const unread = mockNotifications.filter(n => !n.read).length;
    const registrationNotifications = mockNotifications.filter(n => 
      n.type === 'info' && n.title.includes('Registration')
    ).length;
    const errorNotifications = mockNotifications.filter(n => n.type === 'error').length;

    return { total, unread, registrationNotifications, errorNotifications };
  };

  const stats = getNotificationStats();

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const refreshData = () => {
    console.log('Refreshing admin notifications...');
  };

  const markAllAsRead = () => {
    console.log('Marking all notifications as read...');
  };

  const clearAllNotifications = () => {
    console.log('Clearing all notifications...');
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
                  Admin Notifications
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Manage all system notifications and user registrations
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
              title="Registration Alerts"
              value={stats.registrationNotifications}
              prefix={<UserOutlined />}
              valueStyle={{ color: token.colorWarning }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card size="small">
            <Statistic
              title="System Alerts"
              value={stats.errorNotifications}
              prefix={<BookOutlined />}
              valueStyle={{ color: token.colorInfo }}
            />
          </Card>
        </Col>
      </Row>

      {/* Connection Status */}
      <Card size="small" style={{ marginBottom: '24px' }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Space>
              <Text strong>System Status:</Text>
              <Badge 
                status="success"
                text="Online"
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

      {/* Main Content Tabs */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={handleTabChange}
          size="large"
          tabBarStyle={{ marginBottom: '24px' }}
        >
          <TabPane 
            tab={
              <Space>
                <BellOutlined />
                All Notifications
                {stats.unread > 0 && <Badge count={stats.unread} size="small" />}
              </Space>
            } 
            key="all"
          >
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
                    Showing {mockNotifications.length} of {stats.total} notifications
                  </Text>
                </Col>
              </Row>
            </div>
            
            <NotificationList notifications={mockNotifications} />
          </TabPane>
          
          <TabPane 
            tab={
              <Space>
                <UserOutlined />
                Pending Registrations
                <Badge count={2} size="small" />
              </Space>
            } 
            key="pending"
          >
            <div style={{ padding: '20px', textAlign: 'center' }}>
              <Text type="secondary">Pending registrations management coming soon.</Text>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AdminNotifications;
