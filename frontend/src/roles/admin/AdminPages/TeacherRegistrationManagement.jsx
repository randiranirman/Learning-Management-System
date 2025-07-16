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
  Popconfirm,
  Spin
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  UserOutlined,
  BookOutlined,
  CalendarOutlined,
  FileTextOutlined,
  SearchOutlined,
  FilterOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { getPendingRegistrations } from '../../../utils/teacherRegistrationService';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TeacherRegistrationManagement = () => {
  const [loading, setLoading] = useState(false);
  const [registrations, setRegistrations] = useState({
    classRegistrations: [],
    subjectRegistrations: []
  });
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [actionRemarks, setActionRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);

  // Load SweetAlert2 for notifications
  React.useEffect(() => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.7.12/sweetalert2.all.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Fetch pending registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getPendingRegistrations();
      setRegistrations(data);
    } catch (error) {
      message.error('Failed to fetch registrations');
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  // Status rendering
  const getStatusTag = (status) => {
    switch (status) {
      case 0:
        return <Tag color="orange" icon={<CalendarOutlined />}>Pending</Tag>;
      case 1:
        return <Tag color="green" icon={<CheckCircleOutlined />}>Approved</Tag>;
      case 2:
        return <Tag color="red" icon={<CloseCircleOutlined />}>Rejected</Tag>;
      default:
        return <Tag color="default">Unknown</Tag>;
    }
  };

  // Handle approve/reject actions
  const handleAction = async (record, action) => {
    setSelectedRecord(record);
    setActionType(action);
    setActionModalVisible(true);
  };

  const confirmAction = async () => {
    try {
      // Here you would call your approve/reject API
      const actionData = {
        id: selectedRecord.teacherRegistrationId || selectedRecord.id,
        action: actionType,
        remarks: actionRemarks
      };
      
      console.log('Action data:', actionData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (window.Swal) {
        await window.Swal.fire({
          icon: 'success',
          title: `Registration ${actionType === 'approve' ? 'Approved' : 'Rejected'}!`,
          text: `The registration has been ${actionType === 'approve' ? 'approved' : 'rejected'} successfully.`,
          confirmButtonText: 'OK'
        });
      } else {
        message.success(`Registration ${actionType === 'approve' ? 'approved' : 'rejected'} successfully`);
      }
      
      setActionModalVisible(false);
      setActionRemarks('');
      fetchRegistrations(); // Refresh data
    } catch (error) {
      message.error(`Failed to ${actionType} registration`);
      console.error('Action error:', error);
    }
  };

  // View details modal
  const showDetails = (record) => {
    setSelectedRecord(record);
    setModalVisible(true);
  };

  // Filter functions
  const getFilteredData = (data) => {
    return data.filter(item => {
      const matchesSearch = searchText === '' || 
        item.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.subjectName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.className?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status.toString() === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };

  // Class registrations table columns
  const classColumns = [
    {
      title: 'Registration ID',
      dataIndex: 'teacherRegistrationId',
      key: 'teacherRegistrationId',
      render: (text) => <Text code>{text}</Text>
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (text) => (
        <Space>
          <UserOutlined />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Class',
      dataIndex: 'className',
      key: 'className',
      render: (text) => (
        <Space>
          <BookOutlined />
          <Text>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subjectName',
      key: 'subjectName'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Registered At',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => showDetails(record)}
            />
          </Tooltip>
          {record.status === 0 && (
            <>
              <Tooltip title="Approve">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  type="primary"
                  onClick={() => handleAction(record, 'approve')}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  icon={<CloseCircleOutlined />}
                  size="small"
                  danger
                  onClick={() => handleAction(record, 'reject')}
                />
              </Tooltip>
            </>
          )}
        </Space>
      )
    }
  ];

  // Subject registrations table columns
  const subjectColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <Text code>{text}</Text>
    },
    {
      title: 'Employee ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      render: (text) => (
        <Space>
          <UserOutlined />
          <Text strong>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Subject',
      dataIndex: 'subjectName',
      key: 'subjectName',
      render: (text) => (
        <Space>
          <BookOutlined />
          <Text>{text}</Text>
        </Space>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => getStatusTag(status)
    },
    {
      title: 'Active',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? 'Active' : 'Inactive'}
        </Tag>
      )
    },
    {
      title: 'Registered At',
      dataIndex: 'registeredAt',
      key: 'registeredAt',
      render: (date) => new Date(date).toLocaleDateString()
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="View Details">
            <Button
              icon={<EyeOutlined />}
              size="small"
              onClick={() => showDetails(record)}
            />
          </Tooltip>
          {record.status === 0 && (
            <>
              <Tooltip title="Approve">
                <Button
                  icon={<CheckCircleOutlined />}
                  size="small"
                  type="primary"
                  onClick={() => handleAction(record, 'approve')}
                />
              </Tooltip>
              <Tooltip title="Reject">
                <Button
                  icon={<CloseCircleOutlined />}
                  size="small"
                  danger
                  onClick={() => handleAction(record, 'reject')}
                />
              </Tooltip>
            </>
          )}
        </Space>
      )
    }
  ];

  // Calculate statistics
  const getStatistics = () => {
    const classRegs = registrations.classRegistrations || [];
    const subjectRegs = registrations.subjectRegistrations || [];
    
    const totalPending = [...classRegs, ...subjectRegs].filter(item => item.status === 0).length;
    const totalApproved = [...classRegs, ...subjectRegs].filter(item => item.status === 1).length;
    const totalRejected = [...classRegs, ...subjectRegs].filter(item => item.status === 2).length;
    
    return { totalPending, totalApproved, totalRejected };
  };

  const statistics = getStatistics();

  return (
    <div className="p-6">
      <Title level={2}>Teacher Registration Management</Title>
      
      {/* Statistics Cards */}
      <Row gutter={16} className="mb-6">
        <Col span={6}>
          <Card>
            <Statistic
              title="Pending Registrations"
              value={statistics.totalPending}
              valueStyle={{ color: '#faad14' }}
              prefix={<CalendarOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Approved Registrations"
              value={statistics.totalApproved}
              valueStyle={{ color: '#52c41a' }}
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Rejected Registrations"
              value={statistics.totalRejected}
              valueStyle={{ color: '#f5222d' }}
              prefix={<CloseCircleOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Button
              type="primary"
              icon={<ReloadOutlined />}
              onClick={fetchRegistrations}
              loading={loading}
              className="w-full"
            >
              Refresh Data
            </Button>
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card className="mb-4">
        <Row gutter={16}>
          <Col span={8}>
            <Input
              placeholder="Search by Employee ID, Subject, or Class"
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Col>
          <Col span={6}>
            <Select
              placeholder="Filter by Status"
              value={statusFilter}
              onChange={setStatusFilter}
              className="w-full"
            >
              <Option value="all">All Status</Option>
              <Option value="0">Pending</Option>
              <Option value="1">Approved</Option>
              <Option value="2">Rejected</Option>
            </Select>
          </Col>
          <Col span={6}>
            <RangePicker
              placeholder={['Start Date', 'End Date']}
              value={dateRange}
              onChange={setDateRange}
              className="w-full"
            />
          </Col>
        </Row>
      </Card>

      {/* Main Content */}
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <BookOutlined />
                Class Registrations
                <Badge count={registrations.classRegistrations?.length || 0} style={{ marginLeft: 8 }} />
              </span>
            }
            key="1"
          >
            <Table
              columns={classColumns}
              dataSource={getFilteredData(registrations.classRegistrations || [])}
              rowKey="teacherRegistrationId"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              scroll={{ x: 1000 }}
            />
          </TabPane>
          
          <TabPane
            tab={
              <span>
                <UserOutlined />
                Subject Registrations
                <Badge count={registrations.subjectRegistrations?.length || 0} style={{ marginLeft: 8 }} />
              </span>
            }
            key="2"
          >
            <Table
              columns={subjectColumns}
              dataSource={getFilteredData(registrations.subjectRegistrations || [])}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              scroll={{ x: 1000 }}
            />
          </TabPane>
        </Tabs>
      </Card>

      {/* Details Modal */}
      <Modal
        title="Registration Details"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        {selectedRecord && (
          <div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>ID: </Text>
                <Text code>{selectedRecord.teacherRegistrationId || selectedRecord.id}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Teacher ID: </Text>
                <Text>{selectedRecord.teacherId}</Text>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Employee ID: </Text>
                <Text>{selectedRecord.employeeId}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status: </Text>
                {getStatusTag(selectedRecord.status)}
              </Col>
            </Row>
            
            {selectedRecord.className && (
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Class: </Text>
                  <Text>{selectedRecord.className}</Text>
                </Col>
                <Col span={12}>
                  <Text strong>Class ID: </Text>
                  <Text>{selectedRecord.classId}</Text>
                </Col>
              </Row>
            )}
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Subject: </Text>
                <Text>{selectedRecord.subjectName}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Subject ID: </Text>
                <Text>{selectedRecord.subjectId}</Text>
              </Col>
            </Row>
            
            {selectedRecord.isActive !== undefined && (
              <Row gutter={16}>
                <Col span={12}>
                  <Text strong>Active: </Text>
                  <Tag color={selectedRecord.isActive ? 'green' : 'red'}>
                    {selectedRecord.isActive ? 'Yes' : 'No'}
                  </Tag>
                </Col>
              </Row>
            )}
            
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Registered At: </Text>
                <Text>{new Date(selectedRecord.registeredAt).toLocaleString()}</Text>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Remarks: </Text>
                <Text>{selectedRecord.remarks || 'No remarks'}</Text>
              </Col>
            </Row>
          </div>
        )}
      </Modal>

      {/* Action Modal */}
      <Modal
        title={`${actionType === 'approve' ? 'Approve' : 'Reject'} Registration`}
        visible={actionModalVisible}
        onOk={confirmAction}
        onCancel={() => {
          setActionModalVisible(false);
          setActionRemarks('');
        }}
        okText={actionType === 'approve' ? 'Approve' : 'Reject'}
        okButtonProps={{ 
          type: actionType === 'approve' ? 'primary' : 'danger'
        }}
      >
        <div className="space-y-4">
          <Text>
            Are you sure you want to {actionType} this registration?
          </Text>
          
          <div>
            <Text strong>Remarks (Optional):</Text>
            <TextArea
              rows={4}
              value={actionRemarks}
              onChange={(e) => setActionRemarks(e.target.value)}
              placeholder={`Enter reason for ${actionType === 'approve' ? 'approval' : 'rejection'}...`}
              maxLength={500}
              showCount
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TeacherRegistrationManagement;