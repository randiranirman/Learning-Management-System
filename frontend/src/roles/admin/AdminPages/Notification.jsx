import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Space, Modal, Typography, message, Tag, Descriptions } from 'antd';
import { EyeOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Title } = Typography;
const REGISTER_API_URL = 'https://localhost:7293/api/StudentRegistration/pending'; // Replace with your API URL



const Notification = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const getPendingRegistrations = async () => {
    try {
      const response = await axios.get(`${REGISTER_API_URL}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching pending registrations:", error);
      throw error;
    }
  };

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const data = await getPendingRegistrations();
        // Ensure data is always an array
        const registrationsArray = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
        setRegistrations(registrationsArray);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        message.error('Failed to fetch registrations');
        setRegistrations([]); // Reset to empty array on error
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const handleView = (record) => {
    setSelectedRegistration(record);
    setIsModalVisible(true);
  };

  const handleApprove = async (studentRegistrationId) => {
    setActionLoading(true);
    try {
      await axios.post(`${REGISTER_API_URL}/approve/${studentRegistrationId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      setRegistrations(prevRegistrations => 
        Array.isArray(prevRegistrations) 
          ? prevRegistrations.filter(reg => reg.studentRegistrationId !== studentRegistrationId)
          : []
      );
      message.success('Registration approved successfully');
    } catch (error) {
      console.error('Error approving registration:', error);
      message.error('Failed to approve registration');
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (studentRegistrationId) => {
    setActionLoading(true);
    try {
      await axios.post(`${REGISTER_API_URL}/reject/${studentRegistrationId}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      setRegistrations(prevRegistrations => 
        Array.isArray(prevRegistrations) 
          ? prevRegistrations.filter(reg => reg.studentRegistrationId !== studentRegistrationId)
          : []
      );
      message.success('Registration rejected');
    } catch (error) {
      console.error('Error rejecting registration:', error);
      message.error('Failed to reject registration');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (studentRegistrationId) => {
    setActionLoading(true);
    try {
      await axios.delete(`${REGISTER_API_URL}/${studentRegistrationId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
      });
      setRegistrations(prevRegistrations => 
        Array.isArray(prevRegistrations) 
          ? prevRegistrations.filter(reg => reg.studentRegistrationId !== studentRegistrationId)
          : []
      );
      message.success('Registration deleted');
    } catch (error) {
      console.error('Error deleting registration:', error);
      message.error('Failed to delete registration');
    } finally {
      setActionLoading(false);
    }
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'studentId',
      key: 'studentId',
    },
    {
      title: 'Index Number',
      dataIndex: 'indexNumber',
      key: 'indexNumber',
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: 'Subject',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag color={status === 0 ? 'orange' : status === 1 ? 'green' : 'red'}>
          {status === 0 ? 'Pending' : status === 1 ? 'Approved' : 'Rejected'}
        </Tag>
      ),
    },
    {
      title: 'Registered Date',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            style={{ color: '#1890ff' }}
            disabled={actionLoading}
          />
          <Button
            type="text"
            icon={<CheckOutlined />}
            onClick={() => handleApprove(record.studentRegistrationId)}
            style={{ color: '#52c41a' }}
            loading={actionLoading}
            disabled={record.status !== 0}
          />
          <Button
            type="text"
            icon={<CloseOutlined />}
            onClick={() => handleReject(record.studentRegistrationId)}
            style={{ color: '#ff4d4f' }}
            loading={actionLoading}
            disabled={record.status !== 0}
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.studentRegistrationId)}
            style={{ color: '#ff4d4f' }}
            loading={actionLoading}
          />
        </Space>
      ),
    },
  ];

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
        <Title level={3} style={{ marginBottom: '24px', color: '#1f1f1f' }}>
          Student Registration Management
        </Title>
        <Table
          columns={columns}
          dataSource={Array.isArray(registrations) ? registrations : []}
          rowKey={(record) => record.studentRegistrationId || record.key || Math.random()}
          loading={loading}
          pagination={{ pageSize: 10 }}
          style={{ background: '#fff', borderRadius: '8px' }}
          locale={{
            emptyText: loading ? 'Loading...' : 'No registrations found'
          }}
        />
      </Card>

      <Modal
        title="Student Registration Details"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>,
          selectedRegistration && selectedRegistration.status === 0 && (
            <Space key="actions">
              <Button
                key="approve"
                type="primary"
                icon={<CheckOutlined />}
                onClick={() => {
                  handleApprove(selectedRegistration.studentRegistrationId);
                  setIsModalVisible(false);
                }}
                loading={actionLoading}
              >
                Approve
              </Button>
              <Button
                key="reject"
                danger
                icon={<CloseOutlined />}
                onClick={() => {
                  handleReject(selectedRegistration.studentRegistrationId);
                  setIsModalVisible(false);
                }}
                loading={actionLoading}
              >
                Reject
              </Button>
            </Space>
          ),
        ]}
        width={600}
        style={{ top: 20 }}
      >
        {selectedRegistration && (
          <Descriptions bordered column={1} size="small">
            <Descriptions.Item label="Registration ID">
              {selectedRegistration.studentRegistrationId}
            </Descriptions.Item>
            <Descriptions.Item label="Student ID">
              {selectedRegistration.studentId}
            </Descriptions.Item>
            <Descriptions.Item label="Index Number">
              {selectedRegistration.indexNumber}
            </Descriptions.Item>
            <Descriptions.Item label="Class">
              {selectedRegistration.className}
            </Descriptions.Item>
            <Descriptions.Item label="Subject">
              {selectedRegistration.subjectName}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <Tag color={selectedRegistration.status === 0 ? 'orange' : selectedRegistration.status === 1 ? 'green' : 'red'}>
                {selectedRegistration.status === 0 ? 'Pending' : selectedRegistration.status === 1 ? 'Approved' : 'Rejected'}
              </Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Registered At">
              {new Date(selectedRegistration.registeredAt).toLocaleString()}
            </Descriptions.Item>
            {selectedRegistration.approvedAt && (
              <Descriptions.Item label="Approved At">
                {new Date(selectedRegistration.approvedAt).toLocaleString()}
              </Descriptions.Item>
            )}
            {selectedRegistration.approvedByAdminId && (
              <Descriptions.Item label="Approved By Admin ID">
                {selectedRegistration.approvedByAdminId}
              </Descriptions.Item>
            )}
            {selectedRegistration.remarks && (
              <Descriptions.Item label="Remarks">
                {selectedRegistration.remarks}
              </Descriptions.Item>
            )}
          </Descriptions>
        )}
      </Modal>
    </div>
  );
};

export default Notification;