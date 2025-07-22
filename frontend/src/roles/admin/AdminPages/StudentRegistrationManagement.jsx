import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Tag,
  Modal,
  message,
  Tabs,
  Badge,
  Tooltip,
  Input,
  Select,
  DatePicker,
  Row,
  Col,
  Statistic,
  Typography,
  Spin,
  Descriptions,
  Avatar,
  Divider
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined,
  DeleteOutlined,
  CheckOutlined,
  CloseOutlined,
  TeamOutlined
} from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const BASE_API_URL = 'https://localhost:7293/api/StudentRegistration';
const REGISTER_API_URL = `${BASE_API_URL}/pending`;
const APPROVE_API_URL = BASE_API_URL;

const StudentRegistrationManagement = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const adminId = parseInt(localStorage.getItem("UserId"));

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

  console.log("Admin ID from localStorage:", adminId);
  
  // Validate adminId
  if (!adminId || isNaN(adminId)) {
    console.error("Invalid admin ID:", adminId);
  }

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const data = await getPendingRegistrations();
        const registrationsArray = Array.isArray(data) ? data : (data?.data && Array.isArray(data.data) ? data.data : []);
        setRegistrations(registrationsArray);
      } catch (error) {
        console.error('Error fetching registrations:', error);
        message.error('Failed to fetch registrations');
        setRegistrations([]);
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
    if (!adminId || isNaN(adminId)) {
      message.error("Invalid admin ID. Please log in again.");
      return;
    }
    
    setActionLoading(true);
    try {
      console.log(`Making API call to: ${APPROVE_API_URL}/${studentRegistrationId}/approve?adminId=${adminId}`);
      await axios.post(
        `${APPROVE_API_URL}/${studentRegistrationId}/approve?adminId=${adminId}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        }
      );
      setRegistrations((prevRegistrations) =>
        Array.isArray(prevRegistrations)
          ? prevRegistrations.filter(
              (reg) => reg.studentRegistrationId !== studentRegistrationId
            )
          : []
      );
      await Swal.fire({
        title: "Success",
        text: "Registration approved successfully",
        icon: "success",
        confirmButtonText: "OK",
      });
      message.success("Registration approved successfully");
    } catch (error) {
      console.error("Error approving registration:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        message.error(`Failed to approve registration: ${error.response.data?.message || error.response.status}`);
      } else {
        message.error("Failed to approve registration");
      }
      await Swal.fire("Error", "Failed to approve registration", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async (studentRegistrationId) => {
    setActionLoading(true);
    try {
      await axios.post(`${BASE_API_URL}/${studentRegistrationId}/reject`, null, {
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
      await axios.delete(`${BASE_API_URL}/${studentRegistrationId}`, {
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

  // Filter registrations based on search and status
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSearch = searchText === '' || 
      reg.studentId?.toLowerCase().includes(searchText.toLowerCase()) ||
      reg.indexNumber?.toLowerCase().includes(searchText.toLowerCase()) ||
      reg.className?.toLowerCase().includes(searchText.toLowerCase()) ||
      reg.subjectName?.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || reg.status.toString() === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Statistics
  const totalRegistrations = registrations.length;
  const pendingCount = registrations.filter(reg => reg.status === 0).length;
  const approvedCount = registrations.filter(reg => reg.status === 1).length;
  const rejectedCount = registrations.filter(reg => reg.status === 2).length;

  const getStatusConfig = (status) => {
    const configs = {
      0: { color: '#faad14', text: 'Pending', bgColor: '#fff7e6', borderColor: '#ffd666' },
      1: { color: '#52c41a', text: 'Approved', bgColor: '#f6ffed', borderColor: '#b7eb8f' },
      2: { color: '#ff4d4f', text: 'Rejected', bgColor: '#fff2f0', borderColor: '#ffb3b3' }
    };
    return configs[status] || configs[0];
  };

  const columns = [
    {
      title: 'Student',
      key: 'student',
      width: 200,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar 
            size={32} 
            icon={<UserOutlined />} 
            style={{ 
              backgroundColor: '#667eea',
              fontSize: '14px'
            }}
          />
          <div>
            <Text style={{ fontWeight: 500, display: 'block', color: '#262626' }}>
              {record.studentId}
            </Text>
            <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
              {record.indexNumber}
            </Text>
          </div>
        </div>
      ),
    },
    {
      title: 'Academic',
      key: 'academic',
      width: 220,
      render: (_, record) => (
        <div>
          <Text style={{ 
            fontWeight: 500, 
            display: 'block',
            color: '#262626',
            marginBottom: '2px'
          }}>
            {record.className}
          </Text>
          <Text style={{ fontSize: '12px', color: '#8c8c8c' }}>
            {record.subjectName}
          </Text>
        </div>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status) => {
        const config = getStatusConfig(status);
        return (
          <Tag 
            style={{
              color: config.color,
              backgroundColor: config.bgColor,
              borderColor: config.borderColor,
              border: `1px solid ${config.borderColor}`,
              borderRadius: '16px',
              padding: '2px 8px',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {config.text}
          </Tag>
        );
      },
      filters: [
        { text: 'Pending', value: 0 },
        { text: 'Approved', value: 1 },
        { text: 'Rejected', value: 2 },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Date',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      width: 120,
      render: (text) => (
        <Text style={{ fontSize: '13px', color: '#595959' }}>
          {new Date(text).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </Text>
      ),
      sorter: (a, b) => new Date(a.registeredAt) - new Date(b.registeredAt),
    },
    {
      title: '',
      key: 'actions',
      width: 140,
      render: (_, record) => (
        <Space size={4}>
          <Tooltip title="View">
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => handleView(record)}
              style={{ 
                color: '#595959',
                padding: '4px 6px',
                height: '28px'
              }}
              disabled={actionLoading}
            />
          </Tooltip>
          {record.status === 0 && (
            <>
              <Tooltip title="Approve">
                <Button
                  type="text"
                  size="small"
                  icon={<CheckOutlined />}
                  onClick={() => handleApprove(record.studentRegistrationId)}
                  style={{ 
                    color: '#52c41a',
                    padding: '4px 6px',
                    height: '28px'
                  }}
                  loading={actionLoading}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  type="text"
                  size="small"
                  icon={<CloseOutlined />}
                  onClick={() => handleReject(record.studentRegistrationId)}
                  style={{ 
                    color: '#ff4d4f',
                    padding: '4px 6px',
                    height: '28px'
                  }}
                  loading={actionLoading}
                />
              </Tooltip>
            </>
          )}
          <Tooltip title="Delete">
            <Button
              type="text"
              size="small"
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record.studentRegistrationId)}
              style={{ 
                color: '#ff4d4f',
                padding: '4px 6px',
                height: '28px'
              }}
              loading={actionLoading}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ 
      padding: '32px 24px', 
      background: '#fafafa',
      minHeight: '100vh' 
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '32px' }}>
          <Title 
            level={2} 
            style={{ 
              margin: '0 0 8px 0',
              fontSize: '28px',
              fontWeight: 600,
              color: '#262626'
            }}
          >
            Student Registration Management
          </Title>
          <Text type="secondary" style={{ fontSize: '14px' }}>
            Manage student registration requests
          </Text>
        </div>

        {/* Stats Row */}
        <Row gutter={24} style={{ marginBottom: '32px' }}>
          <Col span={6}>
            <Card 
              size="small"
              style={{ 
                textAlign: 'center',
                border: '1px solid #e8e8e8',
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <Statistic 
                value={totalRegistrations}
                title="Total"
                valueStyle={{ 
                  color: '#262626', 
                  fontSize: '24px',
                  fontWeight: 600 
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small"
              style={{ 
                textAlign: 'center',
                border: '1px solid #ffd666',
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <Statistic 
                value={pendingCount}
                title="Pending"
                valueStyle={{ 
                  color: '#faad14', 
                  fontSize: '24px',
                  fontWeight: 600 
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small"
              style={{ 
                textAlign: 'center',
                border: '1px solid #b7eb8f',
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <Statistic 
                value={approvedCount}
                title="Approved"
                valueStyle={{ 
                  color: '#52c41a', 
                  fontSize: '24px',
                  fontWeight: 600 
                }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card 
              size="small"
              style={{ 
                textAlign: 'center',
                border: '1px solid #ffb3b3',
                borderRadius: '8px'
              }}
              bodyStyle={{ padding: '20px 16px' }}
            >
              <Statistic 
                value={rejectedCount}
                title="Rejected"
                valueStyle={{ 
                  color: '#ff4d4f', 
                  fontSize: '24px',
                  fontWeight: 600 
                }}
              />
            </Card>
          </Col>
        </Row>

        {/* Filters */}
        <Card 
          size="small"
          style={{ 
            marginBottom: '24px',
            border: '1px solid #e8e8e8',
            borderRadius: '8px'
          }}
          bodyStyle={{ padding: '16px 20px' }}
        >
          <Row gutter={16} align="middle">
            <Col flex="auto">
              <Input
                placeholder="Search by Student ID, Index, Class, or Subject"
                prefix={<SearchOutlined style={{ color: '#bfbfbf' }} />}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ borderRadius: '6px' }}
              />
            </Col>
            <Col>
              <Select
                value={statusFilter}
                onChange={setStatusFilter}
                style={{ width: 120 }}
                size="middle"
              >
                <Option value="all">All Status</Option>
                <Option value="0">Pending</Option>
                <Option value="1">Approved</Option>
                <Option value="2">Rejected</Option>
              </Select>
            </Col>
          </Row>
        </Card>

        {/* Main Table */}
        <Card
          style={{
            border: '1px solid #e8e8e8',
            borderRadius: '8px',
            overflow: 'hidden'
          }}
          bodyStyle={{ padding: 0 }}
        >
          <Table
            columns={columns}
            dataSource={filteredRegistrations}
            rowKey={(record) => record.studentRegistrationId || record.key || Math.random()}
            loading={loading}
            pagination={{ 
              pageSize: 10,
              showSizeChanger: false,
              showQuickJumper: false,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total}`,
              style: { padding: '16px 24px' }
            }}
            locale={{
              emptyText: loading ? 'Loading...' : 'No registrations found'
            }}
            size="middle"
            style={{ background: 'white' }}
            rowClassName={() => 'custom-table-row'}
          />
        </Card>
      </div>

      {/* Enhanced Modal */}
      <Modal
        title={null}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={600}
        style={{ top: 40 }}
        bodyStyle={{ padding: 0 }}
      >
        {selectedRegistration && (
          <div>
            {/* Modal Header */}
            <div style={{ 
              padding: '24px 24px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 16,
                marginBottom: '20px'
              }}>
                <Avatar 
                  size={48} 
                  icon={<UserOutlined />} 
                  style={{ backgroundColor: '#667eea' }}
                />
                <div style={{ flex: 1 }}>
                  <Title level={4} style={{ margin: 0, color: '#262626' }}>
                    {selectedRegistration.studentId}
                  </Title>
                  <Text type="secondary">
                    Index: {selectedRegistration.indexNumber}
                  </Text>
                </div>
                {(() => {
                  const config = getStatusConfig(selectedRegistration.status);
                  return (
                    <Tag 
                      style={{
                        color: config.color,
                        backgroundColor: config.bgColor,
                        borderColor: config.borderColor,
                        border: `1px solid ${config.borderColor}`,
                        borderRadius: '16px',
                        padding: '4px 12px',
                        fontSize: '13px',
                        fontWeight: 500
                      }}
                    >
                      {config.text}
                    </Tag>
                  );
                })()}
              </div>
            </div>
            
            {/* Modal Body */}
            <div style={{ padding: '24px' }}>
              <Descriptions 
                column={1}
                size="middle"
                style={{ background: 'transparent' }}
                labelStyle={{ 
                  fontWeight: 500, 
                  color: '#8c8c8c',
                  width: '140px',
                  fontSize: '13px'
                }}
                contentStyle={{ 
                  color: '#262626',
                  fontSize: '14px'
                }}
              >
                <Descriptions.Item label="Registration ID">
                  #{selectedRegistration.studentRegistrationId}
                </Descriptions.Item>
                <Descriptions.Item label="Class">
                  {selectedRegistration.className}
                </Descriptions.Item>
                <Descriptions.Item label="Subject">
                  {selectedRegistration.subjectName}
                </Descriptions.Item>
                <Descriptions.Item label="Registered">
                  {new Date(selectedRegistration.registeredAt).toLocaleString()}
                </Descriptions.Item>
                {selectedRegistration.approvedAt && (
                  <Descriptions.Item label="Approved">
                    {new Date(selectedRegistration.approvedAt).toLocaleString()}
                  </Descriptions.Item>
                )}
                {selectedRegistration.approvedByAdminId && (
                  <Descriptions.Item label="Approved By">
                    Admin #{selectedRegistration.approvedByAdminId}
                  </Descriptions.Item>
                )}
                {selectedRegistration.remarks && (
                  <Descriptions.Item label="Remarks">
                    {selectedRegistration.remarks}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>

            {/* Modal Footer */}
            <div style={{ 
              padding: '16px 24px 24px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
              borderTop: '1px solid #f0f0f0'
            }}>
              <Button onClick={() => setIsModalVisible(false)}>
                Close
              </Button>
              {selectedRegistration.status === 0 && (
                <>
                  <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => {
                      handleApprove(selectedRegistration.studentRegistrationId);
                      setIsModalVisible(false);
                    }}
                    loading={actionLoading}
                    style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
                  >
                    Approve
                  </Button>
                  <Button
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
                </>
              )}
            </div>
          </div>
        )}
      </Modal>

      <style jsx global>{`
        .custom-table-row:hover {
          background-color: #f8f9fa !important;
        }
        .ant-table-thead > tr > th {
          background-color: #fafafa !important;
          color: #595959 !important;
          font-weight: 500 !important;
          border-bottom: 1px solid #e8e8e8 !important;
          font-size: 13px !important;
          padding: 12px 16px !important;
        }
        .ant-table-tbody > tr > td {
          border-bottom: 1px solid #f0f0f0 !important;
          padding: 12px 16px !important;
        }
        .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
      `}</style>
    </div>
  );
};

export default StudentRegistrationManagement;