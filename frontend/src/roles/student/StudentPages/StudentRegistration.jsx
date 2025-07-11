import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Space } from "antd";
import { UserOutlined, CheckCircleOutlined, EditOutlined } from '@ant-design/icons';
import { fetchAllSubjects } from "../../../utils/subjectService";

const { Option } = Select;

const StudentRegistration = () => {
  const [form] = Form.useForm();
  const [subjectNames, setSubjectNames] = useState([]);

  // Fetch subject names on component mount
  useEffect(() => {
    const fetchSubjectNames = async () => {
      try {
        const response = await fetchAllSubjects();
        const names = response.map(subject => subject.name);
        setSubjectNames(names);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    fetchSubjectNames();
  }, []);
  console.log(subjectNames) ;

  const handleSubmit = (values) => {
    console.log("Form Submitted: ", values);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f0f2f5',
        padding: '20px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{
        width: '100%',
        maxWidth: 800,
        margin: 'auto',
        padding: '40px',
        background: '#f7f7f7',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1890ff', fontWeight: 'bold' }}>
          Student Registration Form
        </h2>

        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="New Grade"
            name="grade"
            rules={[{ required: true, message: "Please select your grade!" }]}
          >
            <Select placeholder="Select Grade">
              <Option value="Grade 6">Grade 6</Option>
              <Option value="Grade 7">Grade 7</Option>
              <Option value="Grade 8">Grade 8</Option>
              <Option value="Grade 9">Grade 9</Option>
              <Option value="Grade 10">Grade 10</Option>
              <Option value="Grade 11">Grade 11</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Subjects"
            name="subjects"
            rules={[{ required: true, message: "Please select subjects!" }]}
          >
            <Select
              mode="multiple"
              placeholder="Select Subjects"
              allowClear
            >
              {subjectNames.map((subjectName, index) => (
                <Option key={index} value={subjectName}>
                  {subjectName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[{ required: true, message: "Please select your date of birth!" }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your address" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space size="large">
              <Button
                type="default"
                icon={<EditOutlined />}
                style={{ width: '100px' }}
              >
                Edit
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckCircleOutlined />}
                style={{ width: '100px' }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistration;
