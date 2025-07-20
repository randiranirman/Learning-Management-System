import React, { useEffect, useState } from 'react';
import { Card, Button, Table, Space, Typography, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { fetchAllClasses, deleteClass } from '../../../utils/classService';
import AddClassPopup from './../AdminComponents/AddClassPopup';
import Swal from 'sweetalert2';

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
      
      // Map backend response to frontend expected format
      const mappedClasses = (response || []).map(cls => ({
        id: cls.classId || cls.id,
        name: cls.name,
        code: cls.code,
        description: cls.description,
        credit: cls.grade || cls.credit || 0,
        createdAt: cls.createdAt,
        maxStudents: cls.maxStudents,
        status: cls.status,
        // Keep original data as well for reference
        ...cls
      }));
      
      setClasses(mappedClasses);
    } catch (error) {
      await Swal.fire({
        title: 'Error',
        text: 'Failed to fetch classes.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      console.error("Error fetching classes:", error);
    } finally {
      setIsLoadingClasses(false);
    }
  };

  // Handle when a new class is added
  const handleClassAdded = async (newClass) => {
    setClasses([...classes, newClass]); // Optimistically update the state
    setShowClassPopup(false);
    await Swal.fire({
      title: 'Success',
      text: 'Class added successfully!',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  // Handle class deletion with SweetAlert confirmation
  const handleDeleteClass = async (classData) => {
    const result = await Swal.fire({
      title: 'Delete Class',
      text: `Are you sure you want to delete "${classData.name || 'this class'}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      try {
        const deleteResult = await deleteClass(classData.id);
        if (deleteResult !== false) {
          // Remove the class from the local state
          setClasses(classes.filter((cls) => cls.id !== classData.id));
        }
      } catch (error) {
        // Error is already handled in deleteClass with Swal
        console.error("Error in handleDeleteClass:", error);
      }
    }
  };

  // Handle class edit (placeholder)
  const handleEditClass = (classData) => {
    console.log("Edit class:", classData);
    Swal.fire({
      title: 'Info',
      text: 'Edit functionality to be implemented.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  // Handle view class details (placeholder)
  const handleViewClass = (classData) => {
    console.log("View class:", classData);
    Swal.fire({
      title: 'Info',
      text: 'View details functionality to be implemented.',
      icon: 'info',
      confirmButtonText: 'OK',
    });
  };

  // Table columns configuration
  const columns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text || 'Unnamed Class'}</strong>,
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
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteClass(record)}
            title="Delete Class"
          />
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