import React from 'react';
import {
  List,
  Typography,
  Button,
  Tag,
  Space,
  Avatar,
  Card,
  Badge,
  Popover,
  Spin,
  Empty
} from 'antd';
import {
  CheckOutlined,
  CloseOutlined,
  UserOutlined,
  BookOutlined
} from '@ant-design/icons';
import { approveRegistration, rejectRegistration } from '../../../utils/studentRegistrationService';
import Swal from 'sweetalert2';

const { Text, Title } = Typography;

const AdminPendingRegistrations = ({ pendingRegistrations, loading, onRefresh }) => {

  const handleApprove = async (registrationId, studentData) => {
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
        onRefresh();
      }
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Failed to approve registration. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  const handleReject = async (registrationId, studentData) => {
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
          onRefresh();
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

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <Spin size="large" />
        <Text type="secondary" style={{ marginLeft: 8 }}>Loading pending registrations...</Text>
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
      itemLayout="vertical"
      size="large"
      bordered
      dataSource={pendingRegistrations}
      renderItem={(item) => (
        <List.Item
          key={item.studentRegistrationId}
          extra={
            <Space direction="vertical">
              <Button 
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => handleApprove(item.studentRegistrationId, item)}
              >
                Approve
              </Button>
              <Button 
                icon={<CloseOutlined />}
                danger
                onClick={() => handleReject(item.studentRegistrationId, item)}
              >
                Reject
              </Button>
            </Space>
          }
        >
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={<Text strong>Student ID: {item.studentId}</Text>}
            description={
              <Space direction="vertical">
                <Text type="secondary">Class: {item.className}</Text>
                {item.subjects && item.subjects.length > 0 && (
                  <Text type="secondary">Subjects: {item.subjects.map(subject => subject.subjectName).join(', ')}</Text>
                )}
                <Popover content={<Text>{formatTime(item.registeredAt)}</Text>}>
                  <Tag icon={<BookOutlined />} color="geekblue">
                    Registered {formatTime(item.registeredAt)}
                  </Tag>
                </Popover>
              </Space>
            }
          />
        </List.Item>
      )}
    />
  );
};

export default AdminPendingRegistrations;

