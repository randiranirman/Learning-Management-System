/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Table, Button, Space, Typography, Input, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import AddCoursePopup from '../AdminComponents/AddCoursePopup';
import { fetchAllSubjects } from '../../../utils/subjectService';
import Swal from 'sweetalert2';

const { Title } = Typography;
const { Search } = Input;

const ManageCourses = () => {
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCoursePopup, setShowCoursePopup] = useState(false);
  const [editingSubject, setEditingSubject] = useState(null);

  // Form state for subjects
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: ''
  });

  // Function to refresh subjects list
  const refreshSubjectsList = async () => {
    setIsLoadingSubjects(true);
    try {
      const subjectsData = await fetchAllSubjects();
      if (subjectsData) {
        setSubjects(subjectsData);
        setFilteredSubjects(subjectsData);
      }
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
      message.error('Failed to load subjects');
    } finally {
      setIsLoadingSubjects(false);
    }
  };

  useEffect(() => {
    refreshSubjectsList();
  }, []);

  // Search functionality
  const handleSearch = (value) => {
    setSearchTerm(value);
    if (!value) {
      setFilteredSubjects(subjects);
    } else {
      const filtered = subjects.filter(subject =>
        subject.name.toLowerCase().includes(value.toLowerCase()) ||
        subject.code.toLowerCase().includes(value.toLowerCase()) ||
        subject.description.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSubjects(filtered);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSubject = async () => {
    try {
      // Replace with your actual API call
      // const response = await addSubject(formData);
      
      // For now, simulate success
      message.success('Subject added successfully!');
      setFormData({ name: '', code: '', description: '' });
      setShowAddModal(false);
      await refreshSubjectsList();
    } catch (error) {
      console.error('Error adding subject:', error);
      message.error('Failed to add subject');
    }
  };

  const handleEditSubject = async () => {
    try {
      // Replace with your actual API call
      // const response = await updateSubject(editingSubject.subjectId, formData);
      
      // For now, simulate success
      message.success('Subject updated successfully!');
      setFormData({ name: '', code: '', description: '' });
      setShowEditModal(false);
      setEditingSubject(null);
      await refreshSubjectsList();
    } catch (error) {
      console.error('Error updating subject:', error);
      message.error('Failed to update subject');
    }
  };

  const handleDeleteSubject = async (subjectId, subjectName) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: `You are about to delete "${subjectName}". This action cannot be undone!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        // Replace with your actual API call
        // const response = await deleteSubject(subjectId);
        
        // For now, simulate success
        setSubjects(prevSubjects => prevSubjects.filter(subject => subject.subjectId !== subjectId));
        setFilteredSubjects(prevSubjects => prevSubjects.filter(subject => subject.subjectId !== subjectId));
        Swal.fire('Deleted!', 'Subject has been deleted successfully.', 'success');
      } catch (error) {
        console.error("Error deleting subject:", error);
        Swal.fire('Error!', 'Something went wrong.', 'error');
      }
    }
  };

  const openEditModal = (subject) => {
    setEditingSubject(subject);
    setFormData({
      name: subject.name,
      code: subject.code,
      description: subject.description
    });
    setShowEditModal(true);
  };

  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setShowCoursePopup(false);
    setEditingSubject(null);
    setFormData({ name: '', code: '', description: '' });
  };

  const handleCourseAdded = async () => {
    // Optionally refresh subjects list if courses affect subjects
    // await refreshSubjectsList();
    setShowCoursePopup(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Ant Design Table columns configuration
  const columns = [
    {
      title: 'Subject Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: 'Code',
      dataIndex: 'code',
      key: 'code',
      render: (text) => (
        <span style={{
          background: '#f0f0ff',
          color: '#5038ED',
          padding: '4px 8px',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {text}
        </span>
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Created Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => formatDate(date),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            style={{ background: '#5038ED' }}
            onClick={() => openEditModal(record)}
          >
            Edit
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteSubject(record.subjectId, record.name)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 16px', maxWidth: '90%' }}>
        {/* Left side: Heading */}
        <Title level={3} style={{ margin: 0 }}>Manage Subjects</Title>

        {/* Right side: Buttons */}
        <Space>
         
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            style={{ background: '#5038ED' }}
            onClick={() => setShowCoursePopup(true)}
          >
            Add Subject
          </Button>
        </Space>
      </div>

      {/* Search Section */}
      <div style={{ margin: '16px 16px' }}>
        <Search
          placeholder="Search subjects by name, code, or description..."
          allowClear
          enterButton={<SearchOutlined />}
          size="large"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ maxWidth: 400 }}
        />
      </div>

      {/* Table Section */}
      <div style={{ margin: '16px 16px' }}>
        <Table 
          columns={columns} 
          dataSource={filteredSubjects}
          rowKey="subjectId"
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: 'max-content' }}
          loading={isLoadingSubjects}
          locale={{
            emptyText: 'No subjects found'
          }}
        />
      </div>

      {/* Add Subject Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%'
          }}>
            
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
              <Input.TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter subject description"
                rows={4}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button onClick={closeModals} size="large">
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handleAddSubject}
                style={{ background: '#5038ED' }}
                size="large"
              >
                Add Subject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Subject Modal */}
      {showEditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%'
          }}>
            <h2 style={{ marginBottom: '20px', color: '#5038ED' }}>Edit Subject</h2>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Subject Name</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter subject name"
                size="large"
              />
            </div>
            
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Subject Code</label>
              <Input
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                placeholder="Enter subject code"
                size="large"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>Description</label>
              <Input.TextArea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter subject description"
                rows={4}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
              <Button onClick={closeModals} size="large">
                Cancel
              </Button>
              <Button 
                type="primary" 
                onClick={handleEditSubject}
                style={{ background: '#5038ED' }}
                size="large"
              >
                Update Subject
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Add Hawkins: Add Course Popup */}
      {showCoursePopup && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px',
            width: '500px',
            maxWidth: '90%'
          }}>
            
          </div>


         { <AddCoursePopup setShowCoursePopup={setShowCoursePopup} onCourseAdded={handleCourseAdded} />}
        </div>
        
      )}
    </>
  );
};

export default ManageCourses;