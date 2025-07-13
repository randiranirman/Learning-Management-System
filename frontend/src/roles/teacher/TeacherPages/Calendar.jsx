import React, { useState } from 'react';
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
  message,
  Select,
  Input,
  Form,
  DatePicker,
  TimePicker,
  Radio,
  Tabs
} from 'antd';
import { 
  BookOutlined, 
  ExclamationCircleOutlined, 
  BellOutlined, 
  FileTextOutlined,
  ClockCircleOutlined,
  CalendarOutlined,
  NotificationOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  TeamOutlined,
  MessageOutlined,
  ScheduleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;

// Sample teacher events data with grades
const sampleTeacherEvents = [
  {
    id: 1,
    date: '2025-07-15',
    type: 'homework',
    title: 'Mathematics Homework Due',
    description: 'Algebra exercises - Chapter 5 problems 1-20',
    priority: 'high',
    subject: 'Mathematics',
    grade: 'Grade 10',
    time: '11:59 PM',
    submissions: 28,
    totalStudents: 35
  },
  {
    id: 2,
    date: '2025-07-18',
    type: 'exam',
    title: 'Physics Midterm Exam',
    description: 'Covers mechanics and thermodynamics',
    priority: 'high',
    subject: 'Physics',
    grade: 'Grade 11',
    time: '2:00 PM',
    duration: '2 hours'
  },
  {
    id: 3,
    date: '2025-07-20',
    type: 'announcement',
    title: 'Grade 9 Parent Meeting',
    description: 'Discussion about student progress and upcoming events',
    priority: 'medium',
    subject: 'General',
    grade: 'Grade 9',
    time: '6:00 PM'
  },
  {
    id: 4,
    date: '2025-07-22',
    type: 'homework',
    title: 'Chemistry Lab Report Due',
    description: 'Acid-Base Titration experiment analysis',
    priority: 'medium',
    subject: 'Chemistry',
    grade: 'Grade 12',
    time: '5:00 PM',
    submissions: 22,
    totalStudents: 25
  },
  {
    id: 5,
    date: '2025-07-25',
    type: 'reminder',
    title: 'Grade Submission Deadline',
    description: 'Submit all grades for mid-term evaluation',
    priority: 'high',
    subject: 'Academic',
    grade: 'All Grades',
    time: '11:59 PM'
  },
  {
    id: 6,
    date: '2025-07-16',
    type: 'exam',
    title: 'English Literature Test',
    description: 'Romeo and Juliet analysis and essay questions',
    priority: 'high',
    subject: 'English Literature',
    grade: 'Grade 10',
    time: '10:00 AM',
    duration: '1.5 hours'
  },
  {
    id: 7,
    date: '2025-07-19',
    type: 'announcement',
    title: 'Grade 11 Field Trip',
    description: 'Science museum visit - permission slips required',
    priority: 'medium',
    subject: 'Science',
    grade: 'Grade 11',
    time: '9:00 AM'
  }
];

const Calendar = () => {
  const [events, setEvents] = useState(sampleTeacherEvents);
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState('All Grades');
  const [createForm] = Form.useForm();
  const [editForm] = Form.useForm();
  const [messageForm] = Form.useForm();
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);

  const grades = ['All Grades', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];

  // Filter events by selected grade
  const getFilteredEvents = () => {
    if (selectedGrade === 'All Grades') {
      return events;
    }
    return events.filter(event => event.grade === selectedGrade);
  };

  // Get events for a specific date
  const getEventsForDate = (date) => {
    const dateString = date.format('YYYY-MM-DD');
    const filteredEvents = getFilteredEvents();
    return filteredEvents.filter(event => event.date === dateString);
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

  // Handle create new event
  const handleCreateEvent = () => {
    setIsCreateModalVisible(true);
  };

  // Handle create event submit
  const handleCreateSubmit = (values) => {
    const newEvent = {
      id: events.length + 1,
      date: values.date.format('YYYY-MM-DD'),
      type: values.type,
      title: values.title,
      description: values.description,
      priority: values.priority,
      subject: values.subject,
      grade: values.grade,
      time: values.time.format('HH:mm A'),
      ...(values.type === 'homework' && { submissions: 0, totalStudents: 30 })
    };

    setEvents([...events, newEvent]);
    setIsCreateModalVisible(false);
    createForm.resetFields();
    
    // Show success message
    message.success({
      content: (
        <span>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
          Event "{values.title}" created successfully!
        </span>
      ),
      duration: 3,
      style: {
        marginTop: '20px',
      }
    });
  };

  // Handle edit event
  const handleEditEvent = () => {
    editForm.setFieldsValue({
      title: selectedEvent.title,
      type: selectedEvent.type,
      subject: selectedEvent.subject,
      grade: selectedEvent.grade,
      date: dayjs(selectedEvent.date),
      time: dayjs(selectedEvent.time, 'HH:mm A'),
      priority: selectedEvent.priority,
      description: selectedEvent.description
    });
    setIsModalVisible(false);
    setIsEditModalVisible(true);
  };

  // Handle edit submit
  const handleEditSubmit = (values) => {
    const updatedEvents = events.map(event => 
      event.id === selectedEvent.id 
        ? {
            ...event,
            date: values.date.format('YYYY-MM-DD'),
            type: values.type,
            title: values.title,
            description: values.description,
            priority: values.priority,
            subject: values.subject,
            grade: values.grade,
            time: values.time.format('HH:mm A'),
          }
        : event
    );

    setEvents(updatedEvents);
    setIsEditModalVisible(false);
    editForm.resetFields();
    
    // Show success message
    message.success({
      content: (
        <span>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
          Event "{values.title}" updated successfully!
        </span>
      ),
      duration: 3,
      style: {
        marginTop: '20px',
      }
    });
  };

  // Handle send message
  const handleSendMessage = () => {
    setIsMessageModalVisible(true);
  };

  // Handle message submit
  const handleMessageSubmit = (values) => {
    setIsMessageModalVisible(false);
    messageForm.resetFields();
    
    // Show success message
    message.success({
      content: (
        <span>
          <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
          Message sent to {values.grade} students successfully!
        </span>
      ),
      duration: 3,
      style: {
        marginTop: '20px',
      }
    });
  };

  // Handle delete event
  const handleDeleteEvent = (eventId) => {
    const eventToDelete = events.find(event => event.id === eventId);
    
    Modal.confirm({
      title: 'Delete Event',
      content: `Are you sure you want to delete "${eventToDelete?.title}"? This action cannot be undone.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'Cancel',
      icon: <DeleteOutlined style={{ color: '#ff4d4f' }} />,
      onOk() {
        setEvents(events.filter(event => event.id !== eventId));
        setIsModalVisible(false);
        
        // Show success message
        message.success({
          content: (
            <span>
              <CheckCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
              Event "{eventToDelete?.title}" deleted successfully!
            </span>
          ),
          duration: 3,
          style: {
            marginTop: '20px',
          }
        });
      }
    });
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            <CalendarOutlined style={{ marginRight: '8px' }} />
            Teacher Calendar
          </Title>
          </div>
        <Space>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleCreateEvent}
            style={{ background: '#52c41a', borderColor: '#52c41a' }}
          >
            Create Event
          </Button>
          <Button 
            type="default" 
            icon={<MessageOutlined />} 
            onClick={handleSendMessage}
          >
            Send Message
          </Button>
        </Space>
      </div>

      {/* Grade Filter */}
      <Card style={{ marginBottom: '24px' }}>
        <Space align="center">
          <TeamOutlined style={{ color: '#1890ff' }} />
          <Text strong>Filter by Grade:</Text>
          <Select
            value={selectedGrade}
            onChange={setSelectedGrade}
            style={{ width: 150 }}
          >
            {grades.map(grade => (
              <Option key={grade} value={grade}>{grade}</Option>
            ))}
          </Select>
          <Divider type="vertical" />
          <Text type="secondary">
            Showing {getFilteredEvents().length} events
          </Text>
        </Space>
      </Card>

      {/* Calendar */}
      <Card 
        title={
          <Space>
            <CalendarOutlined />
            My Teaching Schedule
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
          <Button key="delete" danger onClick={() => handleDeleteEvent(selectedEvent?.id)}>
            <DeleteOutlined /> Delete
          </Button>,
          <Button key="edit" type="default" onClick={handleEditEvent}>
            <EditOutlined /> Edit
          </Button>,
          <Button key="close" type="primary" onClick={() => setIsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={700}
      >
        {selectedEvent && (
          <div>
            <Title level={4} style={{ marginTop: 0 }}>
              {selectedEvent.title}
            </Title>
            
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space wrap>
                <div>
                  <Text strong>Subject: </Text>
                  <Tag color="blue">{selectedEvent.subject}</Tag>
                </div>
                <div>
                  <Text strong>Grade: </Text>
                  <Tag color="purple">{selectedEvent.grade}</Tag>
                </div>
                <div>
                  <Text strong>Priority: </Text>
                  <Tag color={getEventColor(selectedEvent.type, selectedEvent.priority)}>
                    {selectedEvent.priority.toUpperCase()}
                  </Tag>
                </div>
              </Space>
              
              <Space wrap>
                <div>
                  <Text strong>Date: </Text>
                  <Text>{dayjs(selectedEvent.date).format('MMMM DD, YYYY')}</Text>
                </div>
                <div>
                  <Text strong>Time: </Text>
                  <Text>{selectedEvent.time}</Text>
                </div>
                {selectedEvent.duration && (
                  <div>
                    <Text strong>Duration: </Text>
                    <Text>{selectedEvent.duration}</Text>
                  </div>
                )}
              </Space>

              {selectedEvent.type === 'homework' && (
                <div style={{ background: '#f0f9ff', padding: '12px', borderRadius: '6px' }}>
                  <Text strong>Submission Status: </Text>
                  <Text>
                    {selectedEvent.submissions}/{selectedEvent.totalStudents} students submitted
                  </Text>
                  <div style={{ marginTop: '8px' }}>
                    <div style={{ 
                      background: '#e6f7ff', 
                      height: '8px', 
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        background: '#1890ff',
                        width: `${(selectedEvent.submissions / selectedEvent.totalStudents) * 100}%`,
                        height: '100%',
                        transition: 'width 0.3s ease'
                      }} />
                    </div>
                  </div>
                </div>
              )}
              
              <Divider />
              
              <div>
                <Text strong>Description:</Text>
                <p style={{ marginTop: '8px', padding: '12px', backgroundColor: '#f9f9f9', borderRadius: '4px' }}>
                  {selectedEvent.description}
                </p>
              </div>
            </Space>
          </div>
        )}
      </Modal>

      {/* Create Event Modal */}
      <Modal
        title={
          <Space>
            <PlusOutlined />
            Create New Event
          </Space>
        }
        visible={isCreateModalVisible}
        onCancel={() => setIsCreateModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreateSubmit}
        >
          <Form.Item
            label="Event Title"
            name="title"
            rules={[{ required: true, message: 'Please enter event title!' }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            label="Event Type"
            name="type"
            rules={[{ required: true, message: 'Please select event type!' }]}
          >
            <Select placeholder="Select event type">
              <Option value="homework">Homework</Option>
              <Option value="exam">Exam</Option>
              <Option value="announcement">Announcement</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter subject!' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              label="Grade"
              name="grade"
              rules={[{ required: true, message: 'Please select grade!' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="Select grade">
                <Option value="Grade 9">Grade 9</Option>
                <Option value="Grade 10">Grade 10</Option>
                <Option value="Grade 11">Grade 11</Option>
                <Option value="Grade 12">Grade 12</Option>
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please select date!' }]}
              style={{ flex: 1 }}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Please select time!' }]}
              style={{ flex: 1 }}
            >
              <TimePicker style={{ width: '100%' }} use12Hours format="h:mm A" />
            </Form.Item>
          </Space>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select priority!' }]}
          >
            <Radio.Group>
              <Radio value="low">Low</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="high">High</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea rows={4} placeholder="Enter event description" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                Create Event
              </Button>
              <Button onClick={() => setIsCreateModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Event Modal */}
      <Modal
        title={
          <Space>
            <EditOutlined />
            Edit Event
          </Space>
        }
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditSubmit}
        >
          <Form.Item
            label="Event Title"
            name="title"
            rules={[{ required: true, message: 'Please enter event title!' }]}
          >
            <Input placeholder="Enter event title" />
          </Form.Item>

          <Form.Item
            label="Event Type"
            name="type"
            rules={[{ required: true, message: 'Please select event type!' }]}
          >
            <Select placeholder="Select event type">
              <Option value="homework">Homework</Option>
              <Option value="exam">Exam</Option>
              <Option value="announcement">Announcement</Option>
              <Option value="reminder">Reminder</Option>
            </Select>
          </Form.Item>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              label="Subject"
              name="subject"
              rules={[{ required: true, message: 'Please enter subject!' }]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Enter subject" />
            </Form.Item>

            <Form.Item
              label="Grade"
              name="grade"
              rules={[{ required: true, message: 'Please select grade!' }]}
              style={{ flex: 1 }}
            >
              <Select placeholder="Select grade">
                <Option value="Grade 9">Grade 9</Option>
                <Option value="Grade 10">Grade 10</Option>
                <Option value="Grade 11">Grade 11</Option>
                <Option value="Grade 12">Grade 12</Option>
              </Select>
            </Form.Item>
          </Space>

          <Space style={{ width: '100%' }} size="large">
            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: 'Please select date!' }]}
              style={{ flex: 1 }}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: 'Please select time!' }]}
              style={{ flex: 1 }}
            >
              <TimePicker style={{ width: '100%' }} use12Hours format="h:mm A" />
            </Form.Item>
          </Space>

          <Form.Item
            label="Priority"
            name="priority"
            rules={[{ required: true, message: 'Please select priority!' }]}
          >
            <Radio.Group>
              <Radio value="low">Low</Radio>
              <Radio value="medium">Medium</Radio>
              <Radio value="high">High</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Please enter description!' }]}
          >
            <TextArea rows={4} placeholder="Enter event description" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<EditOutlined />}>
                Update Event
              </Button>
              <Button onClick={() => setIsEditModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Send Message Modal */}
      <Modal
        title={
          <Space>
            <MessageOutlined />
            Send Message to Students
          </Space>
        }
        visible={isMessageModalVisible}
        onCancel={() => setIsMessageModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={messageForm}
          layout="vertical"
          onFinish={handleMessageSubmit}
        >
          <Form.Item
            label="Send to Grade"
            name="grade"
            rules={[{ required: true, message: 'Please select grade!' }]}
          >
            <Select placeholder="Select grade">
              <Option value="All Grades">All Grades</Option>
              <Option value="Grade 9">Grade 9</Option>
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
              <Option value="Grade 12">Grade 12</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Message Type"
            name="messageType"
            rules={[{ required: true, message: 'Please select message type!' }]}
          >
            <Radio.Group>
              <Radio value="general">General Announcement</Radio>
              <Radio value="urgent">Urgent Notice</Radio>
              <Radio value="reminder">Reminder</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: 'Please enter subject!' }]}
          >
            <Input placeholder="Enter message subject" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: 'Please enter message!' }]}
          >
            <TextArea rows={6} placeholder="Enter your message to students" />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" icon={<MessageOutlined />}>
                Send Message
              </Button>
              <Button onClick={() => setIsMessageModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Calendar;