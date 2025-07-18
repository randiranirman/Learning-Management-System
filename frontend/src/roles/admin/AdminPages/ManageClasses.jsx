import React, { useEffect, useState } from 'react';
import { Card, Button, Table, Space, Typography, message, Popconfirm, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchAllClasses } from '../../../utils/classService';
import AddClassPopup from './../AdminComponents/AddClassPopup';

const { Title, Text } = Typography;

const ManageClasses = () => {
  const [showClassPopup, setShowClassPopup] = useState(false);
  const [classes, setClasses] = useState([]);
  const [isLoadingClasses, setIsLoadingClasses] = useState(false);

  // Fetch all classes
  const getAllClasses = async () => {
    setIsLoadingClasses(true);
    try {
      const response = await fetchAllClasses();
      console.log("All classes fetched:", response);
      setClasses(response || []);
    } catch (error) {
      message.error("Failed to fetch classes");
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoadingClasses(false);
    }
  };

  // Handle when a new class is added
  const handleClassAdded = async (newClass) => {
    await getAllClasses(); // Refresh the classes list
    setShowClassPopup(false);
    message.success("Class added successfully!");
  };

  // Handle class deletion
  const handleDeleteClass = async (classId) => {
    try {
      await deleteClass(classId);
      message.success("Class deleted successfully!");
      await getAllClasses(); // Refresh the list
    } catch (error) {
      message.error("Failed to delete class");
      console.error("Error deleting class:", error);
    }
  };

  // Handle class edit (placeholder for now)
  const handleEditClass = (classData) => {
    // You can implement edit functionality here
    console.log("Edit class:", classData);
    message.info("Edit functionality to be implemented");
  };

  // Handle view class details (placeholder for now)
  const handleViewClass = (classData) => {
    // You can implement view details functionality here
    console.log("View class:", classData);
    message.info("View details functionality to be implemented");
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Class Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => (
        <Tag color="blue" style={{ fontSize: '12px' }}>
          {text || 'No Code'}
        </Tag>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      render: (text) => (
        <Text style={{ maxWidth: 200, display: 'block' }} ellipsis={{ tooltip: text }}>
          {text || 'No description'}
        </Text>
      ),
    },
    {
      title: 'Credits',
      dataIndex: 'credit',
      key: 'credit',
      render: (credit) => (
        <Tag color={credit > 0 ? 'green' : 'default'}>
          {credit} Credits
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button
            type="text"
            icon={<EyeOutlined />}
            onClick={() => handleViewClass(record)}
            title="View Details"
          />
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => handleEditClass(record)}
            title="Edit Class"
          />
          <Popconfirm
            title="Delete Class"
            description="Are you sure you want to delete this class?"
            onConfirm={() => handleDeleteClass(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="text"
              danger
              icon={<DeleteOutlined />}
              title="Delete Class"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // Load classes on component mount
  useEffect(() => {
    getAllClasses();
  }, []);

  return (
    <div style={{ padding: '24px' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ margin: 0 }}>
            Manage Classes
          </Title>
          <Text type="secondary">
            Create and manage classes, assign students and teachers, and view class details.
          </Text>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setShowClassPopup(true)}
          size="large"
        >
          Add Class
        </Button>
      </div>

      {/* Classes Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={classes}
          loading={isLoadingClasses}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} classes`,
          }}
          locale={{
            emptyText: 'No classes found. Click "Add Class" to create your first class.',
          }}
        />
      </Card>

      {/* Add Class Modal */}
      {showClassPopup && (
        <AddClassPopup
          setShowAddClassPopup={setShowClassPopup}
          onClassAdded={handleClassAdded}
        />
      )}
    </div>
  );
};

export default ManageClasses;