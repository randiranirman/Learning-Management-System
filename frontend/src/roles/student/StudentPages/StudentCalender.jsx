import React, { useState } from 'react';
import { Calendar, Badge, Modal, Card, Tag, Button, Space, Typography, Divider } from 'antd';
import { BookOutlined, FileTextOutlined, ExperimentOutlined, VideoCameraOutlined, UserOutlined, ClockCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const LMSCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Sample LMS events data
  const eventsData = {
    '2025-07-15': [
      { type: 'assignment', title: 'JavaScript Fundamentals Assignment', time: '23:59', status: 'due' },
      { type: 'lecture', title: 'React Components Deep Dive', time: '10:00', status: 'scheduled' }
    ],
    '2025-07-16': [
      { type: 'quiz', title: 'HTML & CSS Quiz', time: '14:00', status: 'scheduled' }
    ],
    '2025-07-18': [
      { type: 'lecture', title: 'Database Design Principles', time: '09:00', status: 'scheduled' },
      { type: 'assignment', title: 'Database Schema Project', time: '23:59', status: 'due' }
    ],
    '2025-07-20': [
      { type: 'exam', title: 'Mid-term Examination', time: '10:00', status: 'scheduled' },
      { type: 'lecture', title: 'API Development Workshop', time: '15:00', status: 'scheduled' }
    ],
    '2025-07-22': [
      { type: 'assignment', title: 'REST API Implementation', time: '23:59', status: 'due' },
      { type: 'lecture', title: 'Authentication & Security', time: '11:00', status: 'scheduled' }
    ],
    '2025-07-25': [
      { type: 'quiz', title: 'Backend Development Quiz', time: '16:00', status: 'scheduled' },
      { type: 'lecture', title: 'Deployment Strategies', time: '13:00', status: 'scheduled' }
    ]
  };

  const getEventIcon = (type) => {
    switch (type) {
      case 'lecture':
        return <VideoCameraOutlined style={{ color: '#1890ff' }} />;
      case 'assignment':
        return <FileTextOutlined style={{ color: '#f5222d' }} />;
      case 'quiz':
        return <ExperimentOutlined style={{ color: '#faad14' }} />;
      case 'exam':
        return <BookOutlined style={{ color: '#722ed1' }} />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'lecture':
        return 'blue';
      case 'assignment':
        return 'red';
      case 'quiz':
        return 'orange';
      case 'exam':
        return 'purple';
      default:
        return 'default';
    }
  };

  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const events = eventsData[dateString] || [];
    
    return (
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {events.slice(0, 2).map((event, index) => (
          <li key={index} style={{ marginBottom: 2 }}>
            <Badge 
              status={event.type === 'assignment' ? 'error' : event.type === 'exam' ? 'processing' : 'success'} 
              text={
                <span style={{ fontSize: '11px', color: '#666' }}>
                  {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                </span>
              } 
            />
          </li>
        ))}
        {events.length > 2 && (
          <li>
            <span style={{ fontSize: '10px', color: '#999' }}>
              +{events.length - 2} more
            </span>
          </li>
        )}
      </ul>
    );
  };

  const onDateSelect = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const events = eventsData[dateString];
    
    if (events && events.length > 0) {
      setSelectedDate({ date: value, events });
      setIsModalVisible(true);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedDate(null);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Card>
        <div style={{ marginBottom: '20px' }}>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <BookOutlined style={{ marginRight: '8px' }} />
            LMS Academic Calendar
          </Title>
          <Text type="secondary">View your courses, assignments, and exam schedule</Text>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <Space wrap>
            <Tag color="blue" icon={<VideoCameraOutlined />}>Lectures</Tag>
            <Tag color="red" icon={<FileTextOutlined />}>Assignments</Tag>
            <Tag color="orange" icon={<ExperimentOutlined />}>Quizzes</Tag>
            <Tag color="purple" icon={<BookOutlined />}>Exams</Tag>
          </Space>
        </div>

        <Calendar 
          dateCellRender={dateCellRender}
          onSelect={onDateSelect}
          style={{ 
            backgroundColor: '#fff',
            borderRadius: '6px'
          }}
        />

        <Modal
          title={
            selectedDate ? (
              <span>
                <ClockCircleOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                Events for {selectedDate.date.format('MMMM D, YYYY')}
              </span>
            ) : 'Events'
          }
          open={isModalVisible}
          onCancel={handleModalClose}
          footer={[
            <Button key="close" onClick={handleModalClose}>
              Close
            </Button>
          ]}
          width={500}
        >
          {selectedDate && selectedDate.events.map((event, index) => (
            <Card
              key={index}
              size="small"
              style={{ 
                marginBottom: '12px',
                border: `1px solid ${getEventColor(event.type) === 'blue' ? '#1890ff' : 
                  getEventColor(event.type) === 'red' ? '#f5222d' : 
                  getEventColor(event.type) === 'orange' ? '#faad14' : '#722ed1'}20`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  {getEventIcon(event.type)}
                  <div style={{ marginLeft: '8px' }}>
                    <div style={{ fontWeight: '500', marginBottom: '2px' }}>
                      {event.title}
                    </div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      <ClockCircleOutlined style={{ marginRight: '4px' }} />
                      {event.time}
                    </Text>
                  </div>
                </div>
                <Tag color={getEventColor(event.type)} style={{ margin: 0 }}>
                  {event.type.toUpperCase()}
                </Tag>
              </div>
            </Card>
          ))}
        </Modal>
      </Card>
    </div>
  );
};

export default LMSCalendar;