import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Avatar, Statistic, Space, Divider, Badge } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  QuestionCircleOutlined,
  CalendarOutlined,
  BarChartOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

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

  // Class detail actions
  const classActions = [
    {
      title: "Create Quiz",
      icon: <QuestionCircleOutlined />,
      color: "#722ed1",
      description: "Create new quiz for students",
      action: () => console.log("Navigate to create quiz")
    },
    {
      title: "View Assignments",
      icon: <FileTextOutlined />,
      color: "#1890ff", 
      description: "Manage class assignments",
      action: () => console.log("Navigate to assignments")
    },
    {
      title: "Student Progress",
      icon: <BarChartOutlined />,
      color: "#52c41a",
      description: "Track student performance",
      action: () => console.log("Navigate to progress")
    },
    {
      title: "Schedule Class",
      icon: <CalendarOutlined />,
      color: "#fa8c16",
      description: "Manage class schedule",
      action: () => console.log("Navigate to schedule")
    },
    {
      title: "Grade Submissions",
      icon: <EditOutlined />,
      color: "#eb2f96",
      description: "Review pending submissions",
      action: () => console.log("Navigate to grading")
    },
    {
      title: "Class Materials",
      icon: <BookOutlined />,
      color: "#13c2c2",
      description: "Upload and manage resources",
      action: () => console.log("Navigate to materials")
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
          
          <Card style={{ marginBottom: '24px', border: `2px solid ${selectedClass.color}` }}>
            <Row align="middle">
              <Col span={2}>
                <Avatar 
                  size={64} 
                  style={{ backgroundColor: selectedClass.color }}
                  icon={<BookOutlined />}
                />
              </Col>
              <Col span={14}>
                <Title level={2} style={{ margin: 0, color: selectedClass.color }}>
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

          {selectedClass.pendingSubmissions > 0 && (
            <Card 
              style={{ marginTop: '24px', borderLeft: '4px solid #ff4d4f' }}
              title={
                <Badge count={selectedClass.pendingSubmissions} offset={[10, 0]}>
                  <span>Pending Actions</span>
                </Badge>
              }
            >
              <Text>You have {selectedClass.pendingSubmissions} pending submissions to review.</Text>
              <Button 
                type="primary" 
                danger 
                style={{ marginLeft: '16px' }}
                onClick={() => console.log("Navigate to pending submissions")}
              >
                Review Now
              </Button>
            </Card>
          )}
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
              <Card
                hoverable
                onClick={() => handleClassSelect(classItem)}
                style={{ 
                  borderTop: `4px solid ${classItem.color}`,
                  height: '280px',
                  cursor: 'pointer'
                }}
                bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                    <Avatar 
                      size={48}
                      style={{ backgroundColor: classItem.color, marginRight: '12px' }}
                      icon={<BookOutlined />}
                    />
                    <div>
                      <Title level={4} style={{ margin: 0 }}>{classItem.name}</Title>
                      <Text type="secondary">{classItem.subject}</Text>
                    </div>
                  </div>
                  
                  <Divider style={{ margin: '16px 0' }} />
                  
                  <Row gutter={16}>
                    <Col span={8}>
                      <Statistic 
                        title="Students" 
                        value={classItem.students}
                        prefix={<UserOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Assignments" 
                        value={classItem.assignments}
                        prefix={<FileTextOutlined />}
                      />
                    </Col>
                    <Col span={8}>
                      <Statistic 
                        title="Quizzes" 
                        value={classItem.quizzes}
                        prefix={<QuestionCircleOutlined />}
                      />
                    </Col>
                  </Row>
                </div>

                <div>
                  <div style={{ marginBottom: '12px' }}>
                    <CalendarOutlined style={{ marginRight: '8px', color: classItem.color }} />
                    <Text strong>Next Class: </Text>
                    <Text>{classItem.nextClass}</Text>
                  </div>
                  
                  {classItem.pendingSubmissions > 0 && (
                    <Badge count={classItem.pendingSubmissions} offset={[4, 0]}>
                      <Button type="link" style={{ padding: 0 }}>
                        Pending submissions to review
                      </Button>
                    </Badge>
                  )}
                </div>
              </Card>
            </Col>
          ))}
        </Row>

        <Card 
          style={{ marginTop: '32px' }}
          title="Quick Actions"
          extra={<Button type="link">View All</Button>}
        >
          <Row gutter={16}>
            <Col span={6}>
              <Button 
                type="dashed" 
                block 
                icon={<PlusOutlined />}
                size="large"
                onClick={() => console.log("Navigate to create new class")}
              >
                Create New Class
              </Button>
            </Col>
            <Col span={6}>
              <Button 
                type="dashed" 
                block 
                icon={<QuestionCircleOutlined />}
                size="large"
                onClick={() => console.log("Navigate to quiz creation")}
              >
                Create Quiz
              </Button>
            </Col>
            <Col span={6}>
              <Button 
                type="dashed" 
                block 
                icon={<FileTextOutlined />}
                size="large"
                onClick={() => console.log("Navigate to assignments")}
              >
                New Assignment
              </Button>
            </Col>
            <Col span={6}>
              <Button 
                type="dashed" 
                block 
                icon={<BarChartOutlined />}
                size="large"
                onClick={() => console.log("Navigate to reports")}
              >
                View Reports
              </Button>
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
};

export default TeacherDashboard;