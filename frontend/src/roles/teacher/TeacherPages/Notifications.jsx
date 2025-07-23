import React, { useState } from 'react';
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
import NotificationList from '../../../components/NotificationList';

const { Title, Text } = Typography;

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = theme.useToken();

  // Mock data for teacher notifications
  const mockNotifications = [
    {
      id: 1,
      title: "New Assignment Submission",
      message: "Student John has submitted his assignment for review.",
      type: "info",
      read: false,
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      title: "Upcoming Parent-Teacher Meeting",
      message: "Please prepare the report for the upcoming meeting scheduled next week.",
      type: "warning",
      read: true,
      timestamp: new Date(Date.now() - 60000 * 45).toISOString()
    },
    {
      id: 3,
      title: "Quiz Published Successfully",
      message: "Your quiz 'Algebra Basics' has been published and is now available to students.",
      type: "success",
      read: false,
      timestamp: new Date(Date.now() - 60000 * 120).toISOString()
    }
  ];

  const getNotificationStats = () => {
    const total = mockNotifications.length;
    const unread = mockNotifications.filter(n => !n.read).length;

    return { total, unread };
  };

  const stats = getNotificationStats();

  const refreshData = () => {
    console.log('Refreshing teacher notifications...');
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
                  Teacher Notifications
                </Title>
                <Text type="secondary" style={{ fontSize: '16px' }}>
                  Stay informed about student submissions and schedule updates
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
          </Row>
        </div>

        <Divider />

        <NotificationList notifications={mockNotifications} />
      </Card>
    </div>
  );
};

export default Notifications;
