import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { editUserDetails } from '../../../utils/userService'; // Import your API function

const { Option } = Select;

const EditUserPopup = ({ visible, onCancel, onUserUpdated, userData }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Set initial form values when userData changes
  useEffect(() => {
    if (userData && visible) {
      form.setFieldsValue({
        name: userData.name,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        password: '' // Leave password empty for security
      });
    }
  }, [userData, visible, form]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Prepare the data for API call
      const updatedData = {
        name: values.name,
        username: values.username,
        email: values.email,
        role: values.role,
        password: values.password || '' // Include password only if provided
      };

      const response = await editUserDetails(updatedData);
      
      if (response) {
        // SweetAlert is handled in the service, so just close modal and refresh
        onUserUpdated(); // Refresh the users list
        onCancel(); // Close the modal
        form.resetFields();
      }
    } catch (error) {
      console.error('Error updating user:', error);
      // SweetAlert error is handled in the service
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title="Edit User"
      open={visible}
      onCancel={handleCancel}
      footer={null}
      width={500}
      destroyOnClose={true}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        preserve={false}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter the name!' },
            { min: 2, message: 'Name must be at least 2 characters long!' }
          ]}
        >
          <Input placeholder="Enter full name" />
        </Form.Item>

        <Form.Item
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please enter the username!' },
            { min: 3, message: 'Username must be at least 3 characters long!' }
          ]}
        >
          <Input placeholder="Enter username" disabled />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please enter the email!' },
            { type: 'email', message: 'Please enter a valid email address!' }
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: 'Please select a role!' }]}
        >
          <Select placeholder="Select a role">
            <Option value="admin">Admin</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Password (Leave empty to keep current password)"
          name="password"
          rules={[
            { min: 6, message: 'Password must be at least 6 characters long!' }
          ]}
        >
          <Input.Password placeholder="Enter new password (optional)" />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={handleCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading}
            style={{ background: '#5038ED' }}
          >
            Update User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditUserPopup;