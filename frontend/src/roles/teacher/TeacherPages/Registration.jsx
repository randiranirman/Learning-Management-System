import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;

// Mock dropdown data
const grades = [
  { value: 6, label: 'Grade 6' },
  { value: 7, label: 'Grade 7' },
  { value: 8, label: 'Grade 8' },
  { value: 9, label: 'Grade 9' },
  { value: 10, label: 'Grade 10' },
  { value: 11, label: 'Grade 11' },
];

const subjectNames = [
  'Mathematics',
  'English',
  'Science',
  'History',
  'Geography',
  'Physics',
  'Chemistry',
  'Biology',
];

const subjectCodes = [
  'MATH001',
  'ENG001',
  'SCI001',
  'HIST001',
  'GEOG001',
  'PHY001',
  'CHEM001',
  'BIO001',
];

export default function TeacherCourseRegistration() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/sweetalert2@11.7.12/dist/sweetalert2.all.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  const showAlert = async (type, title, text) => {
    if (window.Swal) {
      await window.Swal.fire({
        icon: type,
        title,
        text,
        confirmButtonColor: '#4f39f6',
      });
    } else {
      message[type](text);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Simulated API request
      await new Promise((res) => setTimeout(res, 1000));
      console.log('Submitted:', values);

      await showAlert(
        'success',
        'Registration Successful!',
        'Course has been registered successfully.'
      );
      form.resetFields();
    } catch (err) {
      console.error(err);
      await showAlert(
        'error',
        'Registration Failed!',
        'Something went wrong. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-xl rounded-2xl p-6">
        <h2 className="text-2xl font-semibold text-primary mb-6">
          Teacher Course Registration
        </h2>
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <Form.Item name="teacherName" label="Teacher Name" rules={[{ required: true }]}>
            <Input placeholder="Enter teacher name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
            <Input placeholder="Enter email address" />
          </Form.Item>

          <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
            <Select placeholder="Select grade">
              {grades.map(({ value, label }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="subjectName" label="Subject Name" rules={[{ required: true }]}>
            <Select placeholder="Select subject name">
              {subjectNames.map((subject) => (
                <Option key={subject} value={subject}>
                  {subject}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="subjectCode" label="Subject Code" rules={[{ required: true }]}>
            <Select placeholder="Select subject code">
              {subjectCodes.map((code) => (
                <Option key={code} value={code}>
                  {code}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="noOfStudents" label="Number of Students" rules={[{ required: true }]}>
            <InputNumber min={1} max={200} className="w-full" placeholder="Number of students" />
          </Form.Item>

          <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
            <DatePicker className="w-full" />
          </Form.Item>

          <div className="md:col-span-2">
            <Form.Item name="subjectContent" label="Subject Content">
              <TextArea rows={4} placeholder="Enter subject content details" />
            </Form.Item>
          </div>

          <div className="md:col-span-2">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-primary hover:bg-[#3e2bd6] border-none text-white"
              >
                Register Course
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}
