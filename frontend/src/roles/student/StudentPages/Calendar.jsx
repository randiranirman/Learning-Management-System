import React, { useState, useEffect } from 'react';
import { 
  Calendar as AntCalendar, 
  Badge, 
  Card, 
  Modal, 
  Tag, 
  Typography, 
  Button, 
  Space, 
  Divider,
  Avatar,
  message,
  Upload,
  Input,
  Form
} from 'antd';
import { 
  BookOutlined, 
  ExclamationCircleOutlined, 
  BellOutlined, 
  FileTextOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  NotificationOutlined,
  UploadOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;

// Sample events data - replace with your API data
const sampleEvents = [
  {
    id: 1,
    date: '2025-07-15',
    type: 'homework',
    title: 'Mathematics Homework Due',
    description: 'Complete Chapter 5 exercises 1-20. Submit via LMS portal.',
    priority: 'high',
    subject: 'Mathematics',
    time: '11:59 PM'
  },
  {
    id: 2,
    date: '2025-07-18',
    type: 'exam',
    title: 'Tamil Midterm Exam',
    description: 'Covers chapters 1-4. Bring colour pencils.',
    priority: 'high',
    subject: 'Tamil',
    time: '2:00 PM'
  },
  {
    id: 3,
    date: '2025-07-20',
    type: 'announcement',
    title: 'Library Hours Extended',
    description: 'Library will be open 24/7 during exam week.',
    priority: 'medium',
    subject: 'General',
    time: '9:00 AM'
  },
  {
    id: 4,
    date: '2025-07-22',
    type: 'homework',
    title: 'Science Lab Report',
    description: 'Submit lab report for Experiment 3: Acid-Base Titration.',
    priority: 'medium',
    subject: 'Science',
    time: '5:00 PM'
  },
  {
    id: 5,
    date: '2025-07-25',
    type: 'reminder',
    title: 'Subject Registration Deadline',
    description: 'Last day to register for next semester subjects.',
    priority: 'high',
    subject: 'Academic',
    time: '11:59 PM'
  },
  {
    id: 6,
    date: '2025-07-16',
    type: 'homework',
    title: 'English Literature Homework',
    description: 'Write an essay on "Romeo and Juliet" - minimum 500 words.',
    priority: 'medium',
    subject: 'English Literature',
    time: '3:00 PM'
  },
  {
    id: 7,
    date: '2025-07-19',
    type: 'exam',
    title: 'History Test',
    description: 'Test on World War II and its impact on global politics.',
    priority: 'high',
    subject: 'History',
    time: '10:00 AM'
  },
  {
    id: 8,
    date: '2025-07-21',
    type: 'homework',
    title: 'Health Homework',
    description: 'Complete worksheets on Human Digestive System.',
    priority: 'medium',
    subject: 'Health',
    time: '4:00 PM'
  },
  {
    id: 9,
    date: '2025-07-23',
    type: 'homework',
    title: 'Geography Homework',
    description: 'Map work on Climate zones and Weather patterns.',
    priority: 'low',
    subject: 'Geography',
    time: '2:00 PM'
  },
  {
    id: 10,
    date: '2025-07-24',
    type: 'exam',
    title: 'Business Studies Exam',
    description: 'Exam covering Marketing and Finance chapters.',
    priority: 'high',
    subject: 'Business Studies',
    time: '1:00 PM'
  }
];

const Calendar = () => {
  const [events, setEvents] = useState(sampleEvents);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isSubmissionModalVisible, setIsSubmissionModalVisible] = useState(false);
  const [submissionForm] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    return events.filter(event => event.date === dateString);
  };

  // Get event type icon
  const getEventIcon = (type) => {
    switch (type) {
      case 'homework':
        return <BookOutlined />;
      case 'exam':
        return <ExclamationCircleOutlined />;
      case 'announcement':
        return <NotificationOutlined />;
      case 'reminder':
        return <ClockCircleOutlined />;
      default:
        return <CalendarOutlined />;
    }
  };

  // Get event type color
  const getEventColor = (type, priority) => {
    if (priority === 'high') return 'red';
    if (priority === 'medium') return 'orange';
    if (priority === 'low') return 'green';
    
    switch (type) {
      case 'homework':
        return 'blue';
      case 'exam':
        return 'red';
      case 'announcement':
        return 'green';
      case 'reminder':
        return 'purple';
      default:
        return 'default';
    }
  };

  // Calendar cell renderer
  const dateCellRender = (value) => {
    const dayEvents = getEventsForDate(value);
    
    return (
      <div className="calendar-cell">
        {dayEvents.map(event => (
          <Badge
            key={event.id}
            status={getEventColor(event.type, event.priority)}
            text={
              <span 
                className="event-text"
                style={{ 
                  fontSize: '11px', 
                  cursor: 'pointer',
                  display: 'block',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100px'
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventClick(event);
                }}
              >
                {event.title}
              </span>
            }
          />
        ))}
      </div>
    );
  };

  // Handle event click
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalVisible(true);
  };

  // Handle date select
  const onDateSelect = (date) => {
    setSelectedDate(date);
    const dayEvents = getEventsForDate(date);
    if (dayEvents.length > 0) {
      setSelectedEvent(dayEvents[0]);
      setIsModalVisible(true);
    }
  };

  // Handle homework submission
  const handleSubmitHomework = () => {
    setIsSubmissionModalVisible(true);
  };

  // Handle file upload
  const handleFileUpload = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

const handleSubmissionSubmit = async (values) => {
  // Check if files are uploaded
  if (fileList.length === 0) {
    message.error('Please upload at least one file!');
    return;
  }

  setIsSubmitting(true);
  
  // Simulate submission delay
  setTimeout(() => {
    message.success({
      content: 'Homework submitted successfully!',
      duration: 4,
      icon: <CheckCircleOutlined style={{ color: '#52c41a' }} />
    });
    
    // Update event status to submitted
    const updatedEvents = events.map(event => {
      if (event.id === selectedEvent.id) {
        return { ...event, submitted: true, submissionDate: dayjs().format('YYYY-MM-DD HH:mm') };
      }
      return event;
    });
    setEvents(updatedEvents);
    
    // Close modals and reset form
    setIsSubmissionModalVisible(false);
    setIsModalVisible(false);
    setIsSubmitting(false);
    submissionForm.resetFields();
    setFileList([]);
  }, 2000);
};

  // Handle submission modal cancel
  const handleSubmissionCancel = () => {
    setIsSubmissionModalVisible(false);
    submissionForm.resetFields();
    setFileList([]);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
          <CalendarOutlined style={{ marginRight: '8px' }} />
          Academic Calendar
        </Title>
        <Text type="secondary">View your homework, exams, and important dates</Text>
      </div>

      {/* Calendar */}
      <Card 
        title={
          <Space>
            <CalendarOutlined />
            My Schedule
          </Space>
        }
        style={{ borderRadius: '8px' }}
      >
        <AntCalendar
          cellRender={dateCellRender}
          onSelect={onDateSelect}
          style={{ backgroundColor: 'white' }}
        />
      </Card>

      {/* Event Details Modal */}
      <Modal
        title={
          <Space>
            {selectedEvent && getEventIcon(selectedEvent.type)}
            Event Details
          </Space>
        }
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key="close" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedEvent && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>
              {selectedEvent.title}
            </Title>
            
            <Space direction="vertical" style={{ width: '100%' }}>
              <div>
                <Text strong>Subject: </Text>
                <Tag color="blue">{selectedEvent.subject}</Tag>
              </div>
              
              <div>
                <Text strong>Date: </Text>
                <Text>{dayjs(selectedEvent.date).format('MMMM DD, YYYY')}</Text>
              </div>
              
              <div>
                <Text strong>Time: </Text>
                <Text>{selectedEvent.time}</Text>
              </div>
              
              <div>
                <Text strong>Priority: </Text>
                <Tag color={getEventColor(selectedEvent.type, selectedEvent.priority)}>
                  {selectedEvent.priority.toUpperCase()}
                </Tag>
              </div>
              
              <div>
                <Text strong>Type: </Text>
                <Tag color={getEventColor(selectedEvent.type, selectedEvent.priority)}>
                  {selectedEvent.type.toUpperCase()}
                </Tag>
              </div>
              
              <Divider />
              
              <div>
                <Text strong>Description:</Text>
                <p style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  {selectedEvent.description}
                </p>
              </div>
              
              {selectedEvent.type === 'homework' && (
                <Space>
                  <Button 
                    type="primary" 
                    icon={<UploadOutlined />}
                    onClick={handleSubmitHomework}
                    disabled={selectedEvent.submitted}
                  >
                    {selectedEvent.submitted ? 'Already Submitted' : 'Submit Homework'}
                  </Button>
                  {selectedEvent.submitted && (
                    <Tag color="green" icon={<CheckCircleOutlined />}>
                      Submitted on {selectedEvent.submissionDate}
                    </Tag>
                  )}
                </Space>
              )}
            </Space>
          </div>
        )}
      </Modal>

      {/* Homework Submission Modal */}
      <Modal
        title={
          <Space>
            <UploadOutlined />
            Submit Homework
          </Space>
        }
        visible={isSubmissionModalVisible}
        onCancel={handleSubmissionCancel}
        footer={null}
        width={600}
      >
        {selectedEvent && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>
              {selectedEvent.title}
            </Title>
            <Text type="secondary">Subject: {selectedEvent.subject}</Text>
            
            <Divider />
            
            <Form
              form={submissionForm}
              layout="vertical"
              onFinish={handleSubmissionSubmit}
            >
              <Form.Item
  label="Upload Files"
  name="files"
>
  <Upload
    multiple
    fileList={fileList}
    onChange={handleFileUpload}
    beforeUpload={() => false} // Prevent automatic upload
    accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
  >
    <Button icon={<UploadOutlined />}>Select Files</Button>
  </Upload>
  <Text type="secondary" style={{ display: 'block', marginTop: '8px' }}>
    Supported formats: PDF, DOC, DOCX, TXT, JPG, PNG
  </Text>
  {fileList.length > 0 && (
    <div style={{ marginTop: '8px' }}>
      <Text type="success">
        {fileList.length} file(s) selected
      </Text>
    </div>
  )}
</Form.Item>

              <Form.Item
                label="Comments (Optional)"
                name="comments"
              >
                <TextArea
                  rows={4}
                  placeholder="Add any comments or notes about your submission..."
                />
              </Form.Item>

              <Form.Item>
                <Space>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    loading={isSubmitting}
                    icon={<CheckCircleOutlined />}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Homework'}
                  </Button>
                  <Button onClick={handleSubmissionCancel}>
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Calendar;