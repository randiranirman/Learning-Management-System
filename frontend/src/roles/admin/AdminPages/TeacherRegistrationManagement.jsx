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
  Spin
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
  ReloadOutlined
} from '@ant-design/icons';
import { getPendingRegistrations, approveTeacherRegistration } from '../../../utils/teacherRegistrationService';

const { TabPane } = Tabs;
const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

const TeacherRegistrationManagement = () => {
  const [loading, setLoading] = useState(false);
const [registrations, setRegistrations] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [actionType, setActionType] = useState(''); // 'approve' or 'reject'
  const [actionRemarks, setActionRemarks] = useState('');
  const [searchText, setSearchText] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState([]);


  // Group registrations by teacher
  const groupRegistrationsByTeacher = (data) => {
    if (!data || typeof data !== 'object') return [];
    
    const teacherRegistrations = new Map();
    
    // Process class registrations
    if (Array.isArray(data.classRegistrations)) {
      data.classRegistrations.forEach(reg => {
        const key = reg.teacherId;
        if (!teacherRegistrations.has(key)) {
          teacherRegistrations.set(key, {
            teacherId: reg.teacherId,
            employeeId: reg.employeeId,
            firstName: reg.firstName || '',
            teacherEmail: reg.teacherEmail || '',
            status: reg.status,
            registeredAt: reg.registeredAt,
            remarks: reg.remarks || '',
            numberOfStudents: reg.numberOfStudents || 0,
            classRegistrations: [],
            subjectRegistrations: [],
            registrationIds: []
          });
        }
        const teacher = teacherRegistrations.get(key);
        teacher.classRegistrations.push({
          id: reg.teacherRegistrationId,
          classId: reg.classId,
          className: reg.className
        });
        teacher.registrationIds.push(reg.teacherRegistrationId);
      });
    }
    
    // Process subject registrations
    if (Array.isArray(data.subjectRegistrations)) {
      data.subjectRegistrations.forEach(reg => {
        const key = reg.teacherId;
        if (!teacherRegistrations.has(key)) {
          teacherRegistrations.set(key, {
            teacherId: reg.teacherId,
            employeeId: reg.employeeId,
            firstName: reg.firstName || '',
            teacherEmail: reg.teacherEmail || '',
            status: reg.status,
            registeredAt: reg.registeredAt,
            remarks: reg.remarks || '',
            numberOfStudents: reg.numberOfStudents || 0,
            classRegistrations: [],
            subjectRegistrations: [],
            registrationIds: []
          });
        }
        const teacher = teacherRegistrations.get(key);
        teacher.subjectRegistrations.push({
          id: reg.id || reg.teacherRegistrationId,
          subjectId: reg.subjectId,
          subjectName: reg.subjectName
        });
        teacher.registrationIds.push(reg.id || reg.teacherRegistrationId);
      });
    }
    
    return Array.from(teacherRegistrations.values()).map(teacher => ({
      ...teacher,
      key: `teacher-${teacher.teacherId}`
    }));
  };

  // Fetch pending registrations
  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const data = await getPendingRegistrations();
      console.log('Fetched registrations:', data);
      
      // Group registrations by teacher
      const groupedRegistrations = groupRegistrationsByTeacher(data);
      console.log('Grouped registrations:', groupedRegistrations);
      setRegistrations(groupedRegistrations);
    } catch (error) {
      message.error('Failed to fetch registrations');
      console.error('Error fetching registrations:', error);
      setRegistrations([]);
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
      // For grouped registrations, we need to approve/reject all registration IDs
      const promises = selectedRecord.registrationIds.map(registrationId => {
        const actionData = {
          registrationId: registrationId,
          remarks: actionRemarks,
          status: actionType === 'approve' ? 1 : 2,
          adminId: adminId
        };
        console.log('Action data for registration ID', registrationId, ':', actionData);
        return approveTeacherRegistration(actionData);
      });
      
      await Promise.all(promises);
      
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
  const getFilteredData = () => {
    if (!Array.isArray(registrations)) {
      return [];
    }
    
    return registrations.filter(item => {
      const matchesSearch = searchText === '' || 
        item.employeeId?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.subjectName?.toLowerCase().includes(searchText.toLowerCase()) ||
        item.className?.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || item.status.toString() === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  };


  // Calculate statistics
  const getStatistics = () => {
    if (!Array.isArray(registrations)) {
      return { totalPending: 0, totalApproved: 0, totalRejected: 0 };
    }
    
    const totalPending = registrations.filter(item => item.status === 0).length;
    const totalApproved = registrations.filter(item => item.status === 1).length;
    const totalRejected = registrations.filter(item => item.status === 2).length;
    
    return { totalPending, totalApproved, totalRejected };
  };

const statistics = getStatistics();
const adminId = parseInt(localStorage.getItem("UserId"));

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
        <div>
          <Title level={4}>All Teacher Registrations</Title>
          <Table
            columns={[
              {
                title: 'Teacher ID',
                dataIndex: 'teacherId',
                key: 'teacherId',
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
                title: 'Name',
                dataIndex: 'firstName',
                key: 'firstName',
                render: (text) => text || 'N/A'
              },
              {
                title: 'Email',
                dataIndex: 'teacherEmail',
                key: 'teacherEmail',
                render: (text) => text || 'N/A'
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
                      >
                        View Details
                      </Button>
                    </Tooltip>
                    {record.status === 0 && (
                      <>
                        <Tooltip title="Approve Registration">
                          <Button
                            icon={<CheckCircleOutlined />}
                            size="small"
                            type="primary"
                            onClick={() => handleAction(record, 'approve')}
                          >
                            Approve
                          </Button>
                        </Tooltip>
                        <Tooltip title="Reject Registration">
                          <Button
                            icon={<CloseCircleOutlined />}
                            size="small"
                            danger
                            onClick={() => handleAction(record, 'reject')}
                          >
                            Reject
                          </Button>
                        </Tooltip>
                      </>
                    )}
                  </Space>
                )
              }
            ]}
            dataSource={getFilteredData()}
            rowKey={(record) => record.key}
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
            }}
            scroll={{ x: 1000 }}
          />
        </div>
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
            {/* Basic Information */}
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Teacher ID: </Text>
                <Text code>{selectedRecord.teacherId}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Employee ID: </Text>
                <Text>{selectedRecord.employeeId}</Text>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>First Name: </Text>
                <Text>{selectedRecord.firstName || 'N/A'}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Email: </Text>
                <Text>{selectedRecord.teacherEmail || 'N/A'}</Text>
              </Col>
            </Row>
            
            <Row gutter={16}>
              <Col span={12}>
                <Text strong>Number of Students: </Text>
                <Text>{selectedRecord.numberOfStudents || 0}</Text>
              </Col>
              <Col span={12}>
                <Text strong>Status: </Text>
                {getStatusTag(selectedRecord.status)}
              </Col>
            </Row>
            
            {/* Class Registrations */}
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Class Registrations:</Text>
                <div style={{ marginTop: '8px' }}>
                  {selectedRecord.classRegistrations && selectedRecord.classRegistrations.length > 0 ? (
                    selectedRecord.classRegistrations.map((cls, index) => (
                      <div key={index} style={{ padding: '8px', border: '1px solid #f0f0f0', marginBottom: '8px', borderRadius: '4px' }}>
                        <Text><strong>Registration ID:</strong> {cls.id}</Text><br/>
                        <Text><strong>Class ID:</strong> {cls.classId}</Text><br/>
                        <Text><strong>Class Name:</strong> {cls.className}</Text>
                      </div>
                    ))
                  ) : (
                    <Text type="secondary">No class registrations</Text>
                  )}
                </div>
              </Col>
            </Row>
            
            {/* Subject Registrations */}
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>Subject Registrations:</Text>
                <div style={{ marginTop: '8px' }}>
                  {selectedRecord.subjectRegistrations && selectedRecord.subjectRegistrations.length > 0 ? (
                    selectedRecord.subjectRegistrations.map((subj, index) => (
                      <div key={index} style={{ padding: '8px', border: '1px solid #f0f0f0', marginBottom: '8px', borderRadius: '4px' }}>
                        <Text><strong>Registration ID:</strong> {subj.id}</Text><br/>
                        <Text><strong>Subject ID:</strong> {subj.subjectId}</Text><br/>
                        <Text><strong>Subject Name:</strong> {subj.subjectName}</Text>
                      </div>
                    ))
                  ) : (
                    <Text type="secondary">No subject registrations</Text>
                  )}
                </div>
              </Col>
            </Row>
            
            {/* Registration IDs */}
            <Row gutter={16}>
              <Col span={24}>
                <Text strong>All Registration IDs: </Text>
                <div style={{ marginTop: '4px' }}>
                  {selectedRecord.registrationIds && selectedRecord.registrationIds.length > 0 ? (
                    selectedRecord.registrationIds.map((id, index) => (
                      <Tag key={index} color="orange" style={{ marginBottom: '4px' }}>
                        {id}
                      </Tag>
                    ))
                  ) : (
                    <Text type="secondary">No registration IDs</Text>
                  )}
                </div>
              </Col>
            </Row>
            
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