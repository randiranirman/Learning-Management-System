/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Table, Button, Upload, Space, Typography, Popconfirm, message, Input } from 'antd';
import { UploadOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ManageUserPopup from '../AdminComponents/ManageUserPopup';
import { fetchAllUsers, getIdFromToken } from '../../../utils/authService';
import { deleteUser } from '../../../utils/userService';
import Swal from 'sweetalert2';
import { uploadCSV } from '../../../utils/csvUploader';

const { Title } = Typography;

const ManageUsers = () => {
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [users, setUsers] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [fileList, setFileList] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [formData, setFormData] = useState({
      name: "",
      username: "",
      email: "",
      role: "",
    });
const handleFileChange = (info) => {
  if (info.fileList && info.fileList.length > 0) {
    // Get the last file in the list and extract the native File object
    const latestFileObj = info.fileList[info.fileList.length - 1];
    const file = latestFileObj.originFileObj || latestFileObj;
    setCsvFile(file);
    setFileList(info.fileList.slice(-1)); // Keep only the latest file
    setUploadStatus("");
    console.log(file);
  } else {
    setCsvFile(null);
    setFileList([]);
  }
};

  const handleUploadCSV = async () => {
    console.log( csvFile);
    console.log("this line got executed")
    if (!csvFile) {
      Swal.fire({
        icon: 'warning',
        title: 'No File Selected',
        text: 'Please select a CSV file to upload.',
      });
      setUploadStatus("Please select a file.");
      return;
    }

    if (isUploading) {
      return; // Prevent multiple uploads
    }

    const formData = new FormData();
    formData.append("file", csvFile);

    setIsUploading(true);
    setUploadStatus("Uploading...");

    try {
      const result = await uploadCSV(formData);
      setUploadStatus("CSV file uploaded successfully!");
      
      // Clear the file selection after successful upload
      setCsvFile(null);
      setFileList([]);
      
      // Refresh the users list
      await refreshUsersList();
      
      Swal.fire({
        icon: 'success',
        title: 'Upload Successful',
        text: 'CSV file uploaded successfully! Users list has been refreshed.',
      });
      console.log("Server response:", result);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: error.message || error.response?.data || 'There was an error uploading the CSV file.',
      });
      setUploadStatus("Error uploading CSV file.");
      console.error("Upload error:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // Function to refresh users list
  const refreshUsersList = async () => {
    setIsLoadingUsers(true);
    try {
      const usersData = await fetchAllUsers(getIdFromToken(localStorage.getItem("accessToken")));
      if (usersData) {
        setUsers(usersData);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
      // Handle token expiration or authentication issues
      if (error.response?.status === 401) {
        console.log("Authentication failed, redirecting to login");
        localStorage.clear();
        window.location.href = "/";
      }
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    refreshUsersList();
  }, []);

  const handleUserAdded = async (newUser) => {
    // Refresh the entire users list to ensure consistency
    await refreshUsersList();
    setShowUserPopup(false);
  };
   const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleDeleteUser = async (username) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });
    
    if (result.isConfirmed) {
      try {
        const response = await deleteUser(username);
        if (response.status === 200) {
          setUsers((prevUsers) => prevUsers.filter((user) => user.username !== username));
          Swal.fire('Deleted!', 'User has been deleted successfully.', 'success');
        } else {
          console.error("Error Deleting User");
          Swal.fire('Error!', 'Something went wrong.', 'error');
        }
      } catch (error) {
        console.error("Error deleting user ", error);
      }
    }
  };

  // Ant Design Table columns configuration
  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
          >
            Edit
          </Button>
          <Button 
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.username)}
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
        <Title level={3} style={{ margin: 0 }}>Manage Users</Title>

        {/* Right side: Buttons in a row */}
        <Space>
          <Typography.Text strong>Upload CSV File</Typography.Text>
          
          <Upload
            beforeUpload={() => false}
            onChange={handleFileChange}
            accept=".csv"
            fileList={fileList}
            maxCount={1}
          >
            <Button style={
              {
                background:'#5038ED',
                color:'white'
              }
            } icon={<UploadOutlined />}>Select File</Button>
          </Upload>

         
          

          <Button 
            type="primary"
            style={{
              background:'#5038ED'
            }}
            onClick={handleUploadCSV}
            loading={isUploading}
            disabled={!csvFile || isUploading}
          >
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>

          <Button 
            type="primary" 
            icon={<PlusOutlined />}
             style={{
              background:'#5038ED'
            }}
            onClick={() => setShowUserPopup(true)}
          >
            Add User
          </Button>
        </Space>
      </div>

      {/* Table Section */}
      <div style={{ margin: '16px 16px' }}>
        <Table 
          columns={columns} 
          dataSource={users}
          rowKey="username"
          pagination={{ pageSize: 10 }}
          bordered
          scroll={{ x: 'max-content' }}
          loading={isLoadingUsers}
          locale={{
            emptyText: 'No users found'
          }}
        />
      </div>

      {/* Add User Popup */}
      {showUserPopup && <ManageUserPopup setShowUserPopup={setShowUserPopup} onUserAdded={handleUserAdded} />}
    </>
  );
};

export default ManageUsers;