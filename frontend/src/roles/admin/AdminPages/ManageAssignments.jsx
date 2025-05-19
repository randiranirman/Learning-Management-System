import React, { useState } from 'react';
import { 
  Button, 
  Table, 
  Space, 
  Typography, 
  Card, 
  Popconfirm, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Tag,
  message
} from 'antd';
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SwapOutlined,
  CalendarOutlined,
  BookOutlined,
  UserOutlined
} from '@ant-design/icons';

const { Title } = Typography;
const { Option } = Select;
//table for list of assignments show
const ManageAssignments = () => {
  const initialAssignments = [
    {
      key: '1',
      title: "Math Homework",
      subject: "Mathematics",
      teacher: "Mr. Perera",
      dueDate: "2025-03-15",
      status: "Pending"
    },
    {
      key: '2',
      title: "English Essay",
      subject: "English",
      teacher: "Mr. De Silva",
      dueDate: "2025-03-18",
      status: "In Progress"
    },
    {
      key: '3',
      title: "Science Project",
      subject: "Biology",
      teacher: "Mrs. Fernando",
      dueDate: "2025-03-25",
      status: "Not Started"
    }
  ];

  // States
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [form] = Form.useForm();
  const [isReassignModalVisible, setIsReassignModalVisible] = useState(false);
  const [reassignForm] = Form.useForm();

  // format date 
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  //  convert date selected from DatePicker to yyyy-mm-dd
  const formatDateForStorage = (dateObj) => {
    if (!dateObj) return '';
    const date = new Date(dateObj);
    return date.toISOString().split('T')[0]; // return YYYY-MM-DD 
  };

  // Subjects and teachers dropdown
  const subjects = ["Mathematics", "English", "Physics", "Chemistry", "Biology", "History", "Geography", "Computer Science"];
  const teachers = ["Mr. Perera", "Mr. De Silva", "Mrs. Fernando", "Ms. Jayawardena", "Dr. Gunaratne"];
  const statuses = ["Not Started", "In Progress", "Pending", "Completed", "Overdue"];

  // Table columns 
  const columns = [
    {
      title: 'Assignment Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
      render: (subject) => (
        <Tag icon={<BookOutlined />} color="blue">
          {subject}
        </Tag>
      ),
      filters: subjects.map(subject => ({ text: subject, value: subject })),
      onFilter: (value, record) => record.subject === value,
    },
    {
      title: 'Teacher',
      dataIndex: 'teacher',
      key: 'teacher',
      render: (teacher) => (
        <Tag icon={<UserOutlined />} color="purple">
          {teacher}
        </Tag>
      ),
      filters: teachers.map(teacher => ({ text: teacher, value: teacher })),
      onFilter: (value, record) => record.teacher === value,
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => (
        <span>
          <CalendarOutlined style={{ marginRight: 8 }} />
          {formatDate(date)}
        </span>
      ),
      sorter: (a, b) => new Date(a.dueDate) - new Date(b.dueDate),
      defaultSortOrder: 'ascend',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color; //set colors suitable for status
        switch (status) {
          case 'Completed':
            color = 'green';
            break;
          case 'In Progress':
            color = 'blue';
            break;
          case 'Pending':
            color = 'orange';
            break;
          case 'Overdue':
            color = 'red';
            break;
          default:
            color = 'default';
        }
        return <Tag color={color}>{status}</Tag>;
      },
      filters: statuses.map(status => ({ text: status, value: status })),
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button 
            type="default" 
            icon={<SwapOutlined />} 
            size="small"
            onClick={() => showReassignModal(record)}
          
  >
            Reassign
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this assignment?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              danger 
              icon={<DeleteOutlined />} 
              size="small"
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // add assignment
  const showModal = () => {
    setIsModalVisible(true);
    setEditingAssignment(null); //not edit, new assignment
    form.resetFields(); //clear form
  };
 //reassign 
  const showReassignModal = (record) => {
    setIsReassignModalVisible(true);
    reassignForm.setFieldsValue({
      assignmentKey: record.key,
      currentTeacher: record.teacher,
      newTeacher: '',
    });
  };
  //edit existing assignments
  const handleEdit = (record) => {
    setIsModalVisible(true);
    setEditingAssignment(record);//assinment beign edited ,track
    form.setFieldsValue({
      title: record.title,
      subject: record.subject,
      teacher: record.teacher,
      dueDate: record.dueDate ? new Date(record.dueDate) : null,
      status: record.status,
    });
  };
//dlt 
  const handleDelete = (key) => {
    setAssignments(assignments.filter(item => item.key !== key));
    message.success('Assignment deleted successfully');
  };
//cancel
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleReassignCancel = () => {
    setIsReassignModalVisible(false);
  };
//submit or edit by user
  const handleFormSubmit = (values) => {
    if (editingAssignment) {
      // Update existing assignment
      setAssignments(prev => 
        prev.map(item => 
          item.key === editingAssignment.key 
            ? { 
                ...item, 
                title: values.title,
                subject: values.subject,
                teacher: values.teacher,
                dueDate: formatDateForStorage(values.dueDate),
                status: values.status
              } 
            : item
        )
      );
      message.success('Assignment updated successfully');
    } else {
      // Add new assignment
      const newAssignment = {
        key: Date.now().toString(),
        title: values.title,
        subject: values.subject,
        teacher: values.teacher,
        dueDate: formatDateForStorage(values.dueDate),
        status: values.status
      };
      
      setAssignments([...assignments, newAssignment]);
      message.success('Assignment added successfully');
    }
    
    setIsModalVisible(false);
  };
//user submit reassign form
  const handleReassignSubmit = (values) => {
    setAssignments(prev => 
      prev.map(item => 
        item.key === values.assignmentKey 
          ? { ...item, teacher: values.newTeacher } 
          : item
      )
    );
    setIsReassignModalVisible(false);
    message.success('Assignment reassigned successfully');
  };

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <Title level={2}>Manage Assignments</Title>
         
          <Button  //add assignment Button
            icon={<PlusOutlined />} 
            size="large"
            onClick={showModal}
            style={{
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            border: 'none'
  }}
          >
            Add Assignment
          </Button>
        </div>
        
        <Table 
          columns={columns} 
          dataSource={assignments}
          pagination={{ pageSize: 7 }}
          bordered
          rowClassName={(record, index) => index % 2 === 0 ? 'table-row-light' : 'table-row-dark'}
        />
      </Card>

      {/* adding/editing assignments */}
      <Modal
        title={editingAssignment ? "Edit Assignment" : "Add New Assignment"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFormSubmit}
          initialValues={{
            status: 'Not Started'
          }}
        >
          <Form.Item
            name="title"
            label="Assignment Title"
            rules={[{ required: true, message: 'Please input the assignment title!' }]}
          >
            <Input placeholder="Enter assignment title" />
          </Form.Item>
          
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: 'Please select a subject!' }]}
          >
            <Select placeholder="Select a subject">
              {subjects.map(subject => (
                <Option key={subject} value={subject}>{subject}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="teacher"
            label="Teacher"
            rules={[{ required: true, message: 'Please select a teacher!' }]}
          >
            <Select placeholder="Select a teacher">
              {teachers.map(teacher => (
                <Option key={teacher} value={teacher}>{teacher}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: 'Please select a due date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select a status!' }]}
          >
            <Select placeholder="Select status">
              {statuses.map(status => (
                <Option key={status} value={status}>{status}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                {editingAssignment ? 'Update' : 'Add'}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>

      {/* reassigning assignments */}
      <Modal
        title="Reassign Assignment"
        open={isReassignModalVisible}
        onCancel={handleReassignCancel}
        footer={null}
      >
        <Form
          form={reassignForm}
          layout="vertical"
          onFinish={handleReassignSubmit}
        >
          <Form.Item name="assignmentKey" hidden>
            <Input />
          </Form.Item>
          
          <Form.Item
            name="currentTeacher"
            label="Current Teacher"
          >
            <Input disabled />
          </Form.Item>
          
          <Form.Item
            name="newTeacher"
            label="New Teacher"
            rules={[{ required: true, message: 'Please select a new teacher!' }]}
          >
            <Select placeholder="Select a new teacher">
              {teachers.map(teacher => (
                <Option key={teacher} value={teacher}>{teacher}</Option>
              ))}
            </Select>
          </Form.Item>
          
          <Form.Item>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <Button onClick={handleReassignCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">Reassign</Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
      
      {/*  CSS for table row styling */}
      <style jsx global>{`
        .table-row-light {
          background-color: #ffffff;
        }
        .table-row-dark {
          background-color: #fafafa;
        }
        .ant-table-tbody > tr:hover > td {
          background-color: #e6f7ff !important;
        }
      `}</style>
    </div>
  );
};

export default ManageAssignments;