import React, { useState, useEffect } from 'react';
import {
  Badge,
  Button,
  Dropdown,
  Typography,
  List,
  Avatar,
  Empty,
  Divider,
  Space,
  Tag,
  Card,
  Spin,
  theme
} from 'antd';
import {
  BellOutlined,
  UserOutlined,
  CheckOutlined,
  CloseOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  BookOutlined
} from '@ant-design/icons';
import { useNotifications } from '../../../contexts/NotificationContext';
import { approveRegistration, rejectRegistration, getPendingRegistrations } from '../../../utils/studentRegistrationService';
import Swal from 'sweetalert2';

const { Text, Title } = Typography;

const NotificationBell = () => {
  const { 
    notifications, 
    connectionState, 
    markAsRead, 
    markAllAsRead, 
    removeNotification, 
    getUnreadCount 
  } = useNotifications();
  
  const [pendingRegistrations, setPendingRegistrations] = useState([]);
  const [loadingRegistrations, setLoadingRegistrations] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { token } = theme.useToken();

  // Fetch pending registrations when dropdown opens
  useEffect(() => {
    if (dropdownOpen) {
      fetchPendingRegistrations();
    }
  }, [dropdownOpen]);

  const fetchPendingRegistrations = async () => {
    setLoadingRegistrations(true);
    try {
      const registrations = await getPendingRegistrations();
      setPendingRegistrations(registrations || []);
    } catch (error) {
      console.error('Error fetching pending registrations:', error);
    } finally {
      setLoadingRegistrations(false);
    }
  };

  const handleApproveRegistration = async (registrationId, studentData) => {
    const result = await Swal.fire({
      title: 'Approve Registration',
      text: `Are you sure you want to approve this registration for ${studentData?.className || 'this class'}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#52c41a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, approve it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const adminId = parseInt(localStorage.getItem('UserId'));
        const success = await approveRegistration(registrationId, adminId);
        
        if (success) {
          await Swal.fire({
            title: 'Approved!',
            text: 'The registration has been approved successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Remove from pending list
          setPendingRegistrations(prev => 
            prev.filter(reg => reg.studentRegistrationId !== registrationId)
          );
          
          // Mark notification as read if exists
          const relatedNotification = notifications.find(
            n => n.data?.registrationId === registrationId || 
                 n.data?.studentRegistrationId === registrationId
          );
          if (relatedNotification) {
            markAsRead(relatedNotification.id);
          }
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'Failed to approve registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const handleRejectRegistration = async (registrationId, studentData) => {
    const { value: reason, isConfirmed } = await Swal.fire({
      title: 'Reject Registration',
      text: `Why are you rejecting this registration for ${studentData?.className || 'this class'}?`,
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter the reason for rejection...',
      inputValidator: (value) => {
        if (!value) {
          return 'You need to provide a reason for rejection!';
        }
      },
      showCancelButton: true,
      confirmButtonColor: '#ff4d4f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Reject',
      cancelButtonText: 'Cancel'
    });

    if (isConfirmed && reason) {
      try {
        const adminId = parseInt(localStorage.getItem('UserId'));
        const success = await rejectRegistration(registrationId, adminId, reason);
        
        if (success) {
          await Swal.fire({
            title: 'Rejected!',
            text: 'The registration has been rejected.',
            icon: 'success',
            confirmButtonText: 'OK'
          });
          
          // Remove from pending list
          setPendingRegistrations(prev => 
            prev.filter(reg => reg.studentRegistrationId !== registrationId)
          );
          
          // Mark notification as read if exists
          const relatedNotification = notifications.find(
            n => n.data?.registrationId === registrationId || 
                 n.data?.studentRegistrationId === registrationId
          );
          if (relatedNotification) {
            markAsRead(relatedNotification.id);
          }
        }
      } catch (error) {
        await Swal.fire({
          title: 'Error',
          text: 'Failed to reject registration. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success': return <CheckOutlined style={{ color: '#52c41a' }} />;
      case 'error': return <CloseOutlined style={{ color: '#ff4d4f' }} />;
      case 'warning': return <ClockCircleOutlined style={{ color: '#faad14' }} />;
      default: return <UserOutlined style={{ color: '#1890ff' }} />;
    }
  };

  const renderPendingRegistrations = () => {
    if (loadingRegistrations) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Spin size="small" />
          <Text type="secondary" style={{ marginLeft: 8 }}>Loading...</Text>
        </div>
      );
    }

    if (pendingRegistrations.length === 0) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description="No pending registrations"
            style={{ margin: 0 }}
          />
        </div>
      );
    }

    return (
      <List
        size="small"
        dataSource={pendingRegistrations.slice(0, 5)} // Show only first 5
        renderItem={item => (
          <List.Item style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1 }}>
                  <Text strong style={{ fontSize: '13px' }}>
                    Student ID: {item.studentId}
                  </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: '12px' }}>
                    {item.className}
                  </Text>
                </div>
                <Tag color="orange" size="small">
                  Pending
                </Tag>
              </div>
              
              {item.subjects && item.subjects.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    Subjects: {item.subjects.map(s => s.subjectName).join(', ')}
                  </Text>
                </div>
              )}
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text type="secondary" style={{ fontSize: '11px' }}>
                  {formatTime(item.registeredAt)}
                </Text>
                <Space size="small">
                  <Button
                    type="text"
                    size="small"
                    icon={<CheckOutlined />}
                    onClick={() => handleApproveRegistration(item.studentRegistrationId, item)}
                    style={{ color: '#52c41a' }}
                    title="Approve"
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<CloseOutlined />}
                    onClick={() => handleRejectRegistration(item.studentRegistrationId, item)}
                    style={{ color: '#ff4d4f' }}
                    title="Reject"
                  />
                </Space>
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  const renderNotifications = () => {
    const recentNotifications = notifications.slice(0, 10);

    if (recentNotifications.length === 0) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Empty 
            image={Empty.PRESENTED_IMAGE_SIMPLE} 
            description="No notifications"
            style={{ margin: 0 }}
          />
        </div>
      );
    }

    return (
      <List
        size="small"
        dataSource={recentNotifications}
        renderItem={item => (
          <List.Item 
            style={{ 
              padding: '12px 16px', 
              borderBottom: '1px solid #f0f0f0',
              backgroundColor: item.read ? 'transparent' : '#f6ffed',
              cursor: 'pointer'
            }}
            onClick={() => !item.read && markAsRead(item.id)}
          >
            <div style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                <Avatar size="small" icon={getNotificationIcon(item.type)} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Text strong style={{ fontSize: '13px' }}>
                      {item.title}
                    </Text>
                    {!item.read && (
                      <div style={{ 
                        width: '8px', 
                        height: '8px', 
                        borderRadius: '50%', 
                        backgroundColor: token.colorPrimary 
                      }} />
                    )}
                  </div>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block', marginTop: '4px' }}>
                    {item.message}
                  </Text>
                  <Text type="secondary" style={{ fontSize: '11px' }}>
                    {formatTime(item.timestamp)}
                  </Text>
                </div>
              </div>
            </div>
          </List.Item>
        )}
      />
    );
  };

  const dropdownContent = (
    <div style={{ width: '400px', maxHeight: '500px', overflowY: 'auto' }}>
      {/* Header */}
      <div style={{ 
        padding: '16px', 
        borderBottom: '1px solid #f0f0f0',
        background: token.colorBgLayout
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={5} style={{ margin: 0 }}>
            Notifications
          </Title>
          <Space>
            <Tag color={connectionState === 'Connected' ? 'green' : 'red'} size="small">
              {connectionState}
            </Tag>
            {getUnreadCount() > 0 && (
              <Button 
                type="link" 
                size="small" 
                onClick={markAllAsRead}
                style={{ padding: 0, height: 'auto' }}
              >
                Mark all read
              </Button>
            )}
          </Space>
        </div>
      </div>

      {/* Pending Registrations Section */}
      {pendingRegistrations.length > 0 && (
        <>
          <div style={{ padding: '12px 16px', background: '#fff7e6', borderBottom: '1px solid #f0f0f0' }}>
            <Space>
              <BookOutlined style={{ color: '#fa8c16' }} />
              <Text strong style={{ color: '#fa8c16' }}>
                Pending Registrations ({pendingRegistrations.length})
              </Text>
            </Space>
          </div>
          {renderPendingRegistrations()}
          <Divider style={{ margin: 0 }} />
        </>
      )}

      {/* Recent Notifications */}
      <div style={{ padding: '12px 16px', background: token.colorBgLayout, borderBottom: '1px solid #f0f0f0' }}>
        <Text strong>Recent Notifications</Text>
      </div>
      {renderNotifications()}

      {/* Footer */}
      <div style={{ 
        padding: '12px 16px', 
        borderTop: '1px solid #f0f0f0',
        background: token.colorBgLayout,
        textAlign: 'center'
      }}>
        <Button type="link" size="small">
          View All Notifications
        </Button>
      </div>
    </div>
  );

  const unreadCount = getUnreadCount() + pendingRegistrations.length;

  return (
    <Dropdown
      dropdownRender={() => dropdownContent}
      placement="bottomRight"
      trigger={['click']}
      open={dropdownOpen}
      onOpenChange={setDropdownOpen}
    >
      <Button
        type="text"
        icon={
          <Badge 
            count={unreadCount} 
            size="small"
            style={{ backgroundColor: token.colorError }}
          >
            <BellOutlined 
              style={{ 
                fontSize: '18px', 
                color: unreadCount > 0 ? token.colorPrimary : token.colorTextSecondary 
              }} 
            />
          </Badge>
        }
        style={{ 
          border: 'none',
          boxShadow: 'none',
          background: 'transparent'
        }}
      />
    </Dropdown>
  );
};

export default NotificationBell;
