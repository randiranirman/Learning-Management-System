import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Avatar, Statistic, Space, Divider, Badge } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  QuestionCircleOutlined,
  CalendarOutlined,
  BarChartOutlined,
  EyeOutlined,
  EditOutlined,
  ArrowLeftOutlined,
  PlusOutlined
} from '@ant-design/icons';
import ClassCard from '../TeacherComponents/ClassCard';

const { Title, Text } = Typography;

const TeacherDashboard = () => {
  const [selectedClass, setSelectedClass] = useState(null);

  // Sample data for teacher's classes
  const classes = [
    {
      id: 1,
      name: "8th Grade Mathematics",
      subject: "Mathematics",
      students: 28,
      assignments: 12,
      quizzes: 8,
      nextClass: "Today, 10:00 AM",
      color: "#722ed1",
      pendingSubmissions: 5
    },
    {
      id: 2,
      name: "7th Grade Mathematics",
      subject: "Mathematics", 
      students: 25,
      assignments: 10,
      quizzes: 6,
      nextClass: "Tomorrow, 11:30 AM",
      color: "#1890ff",
      pendingSubmissions: 3
    },
    {
      id: 3,
      name: "Advanced Mathematics",
      subject: "Mathematics",
      students: 15,
      assignments: 8,
      quizzes: 5,
      nextClass: "Wed, 2:00 PM",
      color: "#52c41a",
      pendingSubmissions: 2
    }
  ];

  const handleClassSelect = (classItem) => {
    setSelectedClass(classItem);
  };

  const handleBackToDashboard = () => {
    setSelectedClass(null);
  };

  // Fixed color for all action cards
  const actionCardColor = "#722ed1";

  // Class detail actions
  const classActions = [
    {
      title: "Create Quiz",
      icon: <QuestionCircleOutlined />,
      color: actionCardColor,
      description: "Create new quiz for students",
      action: () => window.location.href = '/teacher/quiz'
    },
    {
      title: "View Assignments",
      icon: <FileTextOutlined />,
      color: actionCardColor, 
      description: "Manage class assignments",
      action: () => window.location.href = '/teacher/assignments'
    },
    {
      title: "Grade Submissions",
      icon: <EditOutlined />,
      color: actionCardColor,
      description: "Review pending submissions",
      action: () => console.log("Navigate to grading")
    },
    {
      title: "Class Materials",
      icon: <BookOutlined />,
      color: actionCardColor,
      description: "Upload and manage resources",
       action: () => window.location.href = '/teacher/files'
    }
  ];

  if (selectedClass) {
    return (
      <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Button 
            icon={<ArrowLeftOutlined />} 
            onClick={handleBackToDashboard}
            style={{ marginBottom: '24px' }}
          >
            Back to Dashboard
          </Button>
          
          <Card style={{ marginBottom: '24px', border: `2px solid #722ed1` }}>
            <Row align="middle">
              <Col span={2}>
                <Avatar 
                  size={64} 
                  style={{ backgroundColor: "#722ed1" }}
                  icon={<BookOutlined />}
                />
              </Col>
              <Col span={14}>
                <Title level={2} style={{ margin: 0, color: "#722ed1" }}>
                  {selectedClass.name}
                </Title>
                <Text type="secondary">{selectedClass.subject}</Text>
              </Col>
              <Col span={8}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Statistic title="Students" value={selectedClass.students} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Assignments" value={selectedClass.assignments} />
                  </Col>
                  <Col span={8}>
                    <Statistic title="Quizzes" value={selectedClass.quizzes} />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>

          <Title level={3} style={{ marginBottom: '24px' }}>Class Management</Title>
          
          <Row gutter={[16, 16]}>
            {classActions.map((action, index) => (
              <Col xs={24} sm={12} md={8} lg={8} key={index}>
                <Card 
                  hoverable
                  onClick={action.action}
                  style={{ 
                    height: '180px',
                    borderLeft: `4px solid ${action.color}`,
                    cursor: 'pointer'
                  }}
                  bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                >
                  <div>
                    <Space>
                      <Avatar 
                        icon={action.icon} 
                        style={{ backgroundColor: action.color }}
                        size="large"
                      />
                      <div>
                        <Title level={4} style={{ margin: 0 }}>{action.title}</Title>
                        <Text type="secondary">{action.description}</Text>
                      </div>
                    </Space>
                  </div>
                  <Button 
                    type="primary" 
                    style={{ backgroundColor: action.color, borderColor: action.color }}
                    icon={action.title.includes("Create") ? <PlusOutlined /> : <EyeOutlined />}
                  >
                    {action.title.includes("Create") ? "Create New" : "View"}
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Removed pending submissions card */}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <Title level={2}>Dashboard</Title>
          <Text type="secondary">Welcome back, Ms. Jennifer Williams</Text>
        </div>

        <Title level={3} style={{ marginBottom: '24px' }}>Your Classes</Title>
        
        <Row gutter={[24, 24]}>
          {classes.map((classItem) => (
            <Col xs={24} sm={12} lg={8} key={classItem.id}>
              <ClassCard classItem={classItem} onClick={handleClassSelect} />
            </Col>
          ))}
        </Row>

        <Card 
          style={{ marginTop: '32px' }}
          title="Quick Actions"
        >
          <Row gutter={16} justify="center">
            <Col span={12}>
              <Button 
                type="dashed" 
                block 
                icon={<QuestionCircleOutlined />}
                size="large"
                onClick={() => window.location.href = '/teacher/quiz'}
              >
                Create Quiz
              </Button>
            </Col>
            <Col span={12}>
              <Button 
                type="dashed" 
                block 
                icon={<FileTextOutlined />}
                size="large"
                onClick={() => window.location.href = '/teacher/assignments'}
              >
                New Assignment
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;