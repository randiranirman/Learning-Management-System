import React, { useState, useEffect } from 'react';
import { 
  Table, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  Typography, 
  Card,
  Row,
  Col,
  Statistic,
  Tag,
  Tooltip,
  Popconfirm
} from 'antd';
import {
  BookOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  CodeOutlined,
  FileTextOutlined
} from '@ant-design/icons';
import Swal from 'sweetalert2';
import axios from 'axios';
import { addSubject, fetchAllSubjects } from '../../../utils/subjectService';

const { Title } = Typography;

const ManageCourse = () => {
  const [subjects, setSubjects] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSubject, setCurrentSubject] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  // Fetch subjects from API
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await fetchAllSubjects();
      setSubjects(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      Swal.fire('Error', 'Failed to fetch subjects', 'error');
      setSubjects([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAddSubject = () => {

    setIsEditMode(false);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditSubject = (record) => {
    setIsEditMode(true);
    setCurrentSubject(record);
    form.setFieldsValue({
      name: record.name,
      code: record.code,
      description: record.description,
    });
    setIsModalVisible(true);
  };

  const handleDeleteSubject = (subjectId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`/api/subjects/${subjectId}`); // Replace with your actual API
          setSubjects(subjects.filter((subject) => subject.subjectId !== subjectId));
          Swal.fire('Deleted!', 'The subject has been deleted.', 'success');
        } catch (error) {
          console.error('Error deleting subject:', error);
          Swal.fire('Error', 'Failed to delete subject', 'error');
        }
      }
    });
  };
const handleModalOk = async () => {
  try {
    const values = await form.validateFields();

    if (isEditMode && currentSubject) {
      // Update subject using subjectService
      const updatedSubject = await updateSubject(currentSubject.subjectId, values);
      setSubjects(
        subjects.map((subject) =>
          subject.subjectId === currentSubject.subjectId
            ? { ...subject, ...updatedSubject }
            : subject
        )
      );
    } else {
      // Add subject using subjectService
      const newSubject = await addSubject(values);
      setSubjects([...subjects, newSubject]);
    }

    setIsModalVisible(false);
    form.resetFields();
  } catch (error) {
    console.error('Error saving subject:', error);
    Swal.fire('Error', `Failed to ${isEditMode ? 'update' : 'add'} subject`, 'error');
  }
};

  const handleModalCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };



  // Get statistics
  const getStatistics = () => {
    return {
      totalSubjects: subjects.length,
      recentlyAdded: subjects.filter(s => {
        const createdDate = new Date(s.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - createdDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      }).length
    };
  };

  const stats = getStatistics();

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '24px' }}>
        Manage Subjects
      </Title>

      {/* Statistics Cards */}
      <Row gutter={16} style={{ marginBottom: '24px' }}>
        <Col span={6}>
          <Card>
            <Statistic
              title="Total Subjects"
              value={stats.totalSubjects}
              prefix={<BookOutlined />}
              valueStyle={{ color: '#5e35f6' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="Recently Added (7 days)"
              value={stats.recentlyAdded}
              prefix={<PlusOutlined />}
              valueStyle={{ color: '#52c41a' }}
              loading={loading}
            />
          </Card>
        </Col>
        <Col span={6} offset={6}>
          <Card>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddSubject}
              style={{ width: '100%' }}
            >
              Add New Subject
            </Button>
          </Card>
        </Col>
      </Row>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
          <Title level={4} style={{ margin: 0 }}>Subject List</Title>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchSubjects}
          >
            Refresh
          </Button>
        </div>
        <Table
        loading={loading}
        columns={[
          {
            title: 'Subject Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => (
              <Space>
                <BookOutlined style={{ color: '#5e35f6' }} />
                <span>{text}</span>
              </Space>
            )
          },
          {
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
            render: (text) => (
              <Tag icon={<CodeOutlined />} color="blue">
                {text}
              </Tag>
            )
          },
          {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            render: (text) => (
              <Space>
                <FileTextOutlined />
                <span>{text.length > 50 ? `${text.substring(0, 50)}...` : text}</span>
              </Space>
            )
          },
          {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (text) => {
              const date = new Date(text);
              return (
                <Tooltip title={date.toLocaleString()}>
                  {date.toLocaleDateString()}
                </Tooltip>
              );
            }
          },
          {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
              <Space>
                <Tooltip title="Edit Subject">
                  <Button
                    type="primary"
                    icon={<EditOutlined />}
                    onClick={() => handleEditSubject(record)}
                  />
                </Tooltip>
                <Popconfirm
                  title="Delete Subject"
                  description="Are you sure you want to delete this subject? This action cannot be undone."
                  onConfirm={() => handleDeleteSubject(record.subjectId)}
                  okText="Yes"
                  cancelText="No"
                  okButtonProps={{ danger: true }}
                >
                  <Tooltip title="Delete Subject">
                    <Button
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </Tooltip>
                </Popconfirm>
              </Space>
            )
          }
        ]}
        dataSource={subjects}
        rowKey="subjectId"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `Total ${total} subjects`
        }}
        style={{ background: '#fff' }}
      />
      </Card>
      <Modal
        title={
          <Space>
            {isEditMode ? <EditOutlined /> : <PlusOutlined />}
            <span>{isEditMode ? 'Edit Subject' : 'Add New Subject'}</span>
          </Space>
        }
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText={isEditMode ? 'Update Subject' : 'Add Subject'}
        cancelText="Cancel"
        width={600}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          style={{ marginTop: '16px' }}
          validateMessages={{
            required: '${label} is required!',
            types: {
              string: '${label} must be a valid string!'
            }
          }}
        >
          <Form.Item
            name="name"
            label="Subject Name"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<BookOutlined style={{ color: '#5e35f6' }} />}
              placeholder="Enter subject name"
            />
          </Form.Item>
          <Form.Item
            name="code"
            label="Subject Code"
            rules={[{ required: true }]}
          >
            <Input
              prefix={<CodeOutlined style={{ color: '#5e35f6' }} />}
              placeholder="Enter subject code"
            />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea
              rows={4}
              placeholder="Enter detailed description of the subject"
              showCount
              maxLength={500}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageCourse;