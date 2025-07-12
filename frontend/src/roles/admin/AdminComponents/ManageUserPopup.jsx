/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal, Form, Input, Select, Button, Typography, message } from "antd";
import { registerUser } from "../../../utils/authService";
import Swal from "sweetalert2";

const { Option } = Select;
const { Title } = Typography;

const ManageUserPopup = ({ setShowUserPopup, onUserAdded }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    role: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "email") {
      if (!value) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is required",
        }));
      } else if (!validateEmail(value)) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Please enter a valid email address",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
      }
    }
  };

  const handleRoleChange = (value) => {
    setFormData({ ...formData, role: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await registerUser(formData);
      message.success("User registered successfully");
      form.resetFields();
       await Swal.fire({
              title: 'Success!',
              text: 'User added successfully',
              icon: 'success',
              confirmButtonText: 'OK'
            });
        
      setShowUserPopup(false);
      // Pass the new user data back to parent component
      onUserAdded && onUserAdded(result || formData);
    } catch (error) {
      await Swal.fire({
    title: 'Error',
    text: 'Username already exists',
    icon: 'error',
    confirmButtonText: 'OK'
  });
  
  message.error("Failed to register user");
  console.error("Registration error:", error);
    }
  };

  return (
    <Modal
      open
      title={<Title level={4}>Add User</Title>}
      onCancel={() => setShowUserPopup(false)}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={formData}
      >
        <Form.Item label="Name" name="name" rules={[{ required: true }]}>
          <Input name="name" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Username" name="username" rules={[{ required: true }]}>
          <Input name="username" onChange={handleChange} />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          validateStatus={errors.email ? "error" : ""}
          help={errors.email}
          rules={[{ required: true, type: "email" }]}
        >
          <Input name="email" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Role" name="role" rules={[{ required: true }]}>
          <Select placeholder="Select role" onChange={handleRoleChange}>
            <Option value="admin">Admin</Option>
            <Option value="teacher">Teacher</Option>
            <Option value="student">Student</Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block >
            Add User
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ManageUserPopup;
