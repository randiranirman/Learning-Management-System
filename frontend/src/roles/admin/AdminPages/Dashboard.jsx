import React from 'react';
import { 
  Card, 
  Row, 
  Col, 
  Typography, 
  Statistic, 
  Table, 
  Progress, 
  Badge,
  Avatar,
  Space,
  Divider
} from 'antd';
import { 
  UserOutlined, 
  TeamOutlined, 
  FileTextOutlined,
  ArrowUpOutlined,
  RiseOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Custom theme based on provided color code
const theme = {
  colorPrimary: '#5038ED',
  colorSecondary: '#f4f4f9',
  colorGreen: '#65F178',
  colorRed: '#F16567',
};

// Mock data
const studentData = [
  { id: 1, name: 'Emma Wilson', avatar: 'https://via.placeholder.com/150', grade: 'A', attendance: 95, status: 'Active' },
  { id: 2, name: 'James Brown', avatar: 'https://via.placeholder.com/150', grade: 'B+', attendance: 85, status: 'Active' },
  { id: 3, name: 'Sophia Davis', avatar: 'https://via.placeholder.com/150', grade: 'A-', attendance: 92, status: 'Active' },
  { id: 4, name: 'Lucas Martinez', avatar: 'https://via.placeholder.com/150', grade: 'B', attendance: 88, status: 'Inactive' },
];

const assignmentData = [
  { id: 1, title: 'Math Quiz', dueDate: '2025-05-22', completion: 75, subject: 'Mathematics' },
  { id: 2, title: 'Science Project', dueDate: '2025-05-25', completion: 45, subject: 'Science' },
  { id: 3, title: 'History Essay', dueDate: '2025-05-28', completion: 60, subject: 'History' },
];

const Dashboard = () => {
  const studentColumns = [
    {
      title: 'Student',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space>
          <Avatar src={record.avatar} />
          <Text>{text}</Text>
        </Space>
      ),
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'Attendance',
      dataIndex: 'attendance',
      key: 'attendance',
      render: (attendance) => <Progress percent={attendance} size="small" strokeColor={theme.colorPrimary} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Badge 
          status={status === 'Active' ? 'success' : 'error'} 
          text={status} 
        />
      ),
    },
  ];

  const assignmentColumns = [
    {
      title: 'Assignment',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: 'Completion',
      dataIndex: 'completion',
      key: 'completion',
      render: (completion) => (
        <Progress 
          percent={completion} 
          size="small"
          strokeColor={{
            '0%': theme.colorPrimary,
            '100%': theme.colorGreen,
          }}
        />
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: theme.colorSecondary, borderRadius: 8 }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Total Students"
              value={2568}
              prefix={<UserOutlined style={{ color: theme.colorPrimary }} />}
              valueStyle={{ color: theme.colorPrimary }}
              suffix={
                <Text type="secondary" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined style={{ color: theme.colorGreen }} /> 5.2%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Total Teachers"
              value={187}
              prefix={<TeamOutlined style={{ color: theme.colorPrimary }} />}
              valueStyle={{ color: theme.colorPrimary }}
              suffix={
                <Text type="secondary" style={{ fontSize: 14 }}>
                  <ArrowUpOutlined style={{ color: theme.colorGreen }} /> 2.8%
                </Text>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={8}>
          <Card 
            bordered={false}
            style={{ 
              borderRadius: 8,
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Statistic
              title="Active Assignments"
              value={143}
              prefix={<FileTextOutlined style={{ color: theme.colorPrimary }} />}
              valueStyle={{ color: theme.colorPrimary }}
              suffix={
                <Text type="secondary" style={{ fontSize: 14 }}>
                  <RiseOutlined style={{ color: theme.colorGreen }} /> 8.1%
                </Text>
              }
            />
          </Card>
        </Col>
      </Row>
      
      <Divider orientation="left">Students Overview</Divider>
      <Card 
        bordered={false} 
        style={{ 
          marginTop: 16,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Table 
          dataSource={studentData} 
          columns={studentColumns} 
          pagination={false}
          rowKey="id"
        />
      </Card>
      
      <Divider orientation="left">Assignments Overview</Divider>
      <Card 
        bordered={false} 
        style={{ 
          marginTop: 16,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Table 
          dataSource={assignmentData} 
          columns={assignmentColumns} 
          pagination={false}
          rowKey="id"
        />
      </Card>
    </div>
  );
};

export default Dashboard;