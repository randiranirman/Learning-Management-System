import React, { useState } from 'react';
import { Card, Form, Input, Button, Select, DatePicker, InputNumber, message } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

export default function TeacherCourseRegistration() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  
  // Load SweetAlert2 if not already loaded
  React.useEffect(() => {
    if (!window.Swal) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sweetalert2/11.7.12/sweetalert2.all.min.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // Mock admin data - replace with actual API calls
  const grades = [
    { value: 6, label: 'Grade 6' },
    { value: 7, label: 'Grade 7' },
    { value: 8, label: 'Grade 8' },
    { value: 9, label: 'Grade 9' },
    { value: 10, label: 'Grade 10' },
    { value: 11, label: 'Grade 11' }
  ];

  const subjectNames = [
    { value: 'Mathematics', label: 'Mathematics' },
    { value: 'English', label: 'English' },
    { value: 'Science', label: 'Science' },
    { value: 'History', label: 'History' },
    { value: 'Geography', label: 'Geography' },
    { value: 'Physics', label: 'Physics' },
    { value: 'Chemistry', label: 'Chemistry' },
    { value: 'Biology', label: 'Biology' }
  ];

  const subjectCodes = [
    { value: 'MATH001', label: 'MATH001' },
    { value: 'ENG001', label: 'ENG001' },
    { value: 'SCI001', label: 'SCI001' },
    { value: 'HIST001', label: 'HIST001' },
    { value: 'GEOG001', label: 'GEOG001' },
    { value: 'PHY001', label: 'PHY001' },
    { value: 'CHEM001', label: 'CHEM001' },
    { value: 'BIO001', label: 'BIO001' }
  ];

  const showAlert = (type, title, text) => {
    if (window.Swal) {
      window.Swal.fire({ icon: type, title, text });
    } else {
      message[type](text);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form values:', values);
      
      // Show success alert - try multiple approaches
      if (window.Swal) {
        await window.Swal.fire({
          icon: 'success',
          title: 'Registration Successful!',
          text: 'Course has been registered successfully.',
          confirmButtonText: 'OK'
        });
      } else {
        // Fallback to alert and message
        alert('Registration Successful! Course has been registered successfully.');
        message.success('Course registered successfully!');
      }
      
      form.resetFields();
    } catch (error) {
      console.error('Registration error:', error);
      
      // Show error alert
      if (window.Swal) {
        await window.Swal.fire({
          icon: 'error',
          title: 'Registration Failed!',
          text: 'Something went wrong. Please try again.',
          confirmButtonText: 'OK'
        });
      } else {
        // Fallback to alert and message
        alert('Registration Failed! Something went wrong. Please try again.');
        message.error('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <Card title="Teacher Course Registration" className="shadow-lg">
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item name="teacherName" label="Teacher Name" rules={[{ required: true }]}>
              <Input placeholder="Enter teacher name" />
            </Form.Item>
            
            <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}>
              <Input placeholder="Enter email" />
            </Form.Item>
            
            <Form.Item name="phone" label="Phone" rules={[{ required: true }]}>
              <Input placeholder="Enter phone number" />
            </Form.Item>
            
            <Form.Item name="grade" label="Grade" rules={[{ required: true }]}>
              <Select placeholder="Select grade">
                {grades.map(grade => (
                  <Option key={grade.value} value={grade.value}>{grade.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item name="subjectName" label="Subject Name" rules={[{ required: true }]}>
              <Select placeholder="Select subject name">
                {subjectNames.map(subject => (
                  <Option key={subject.value} value={subject.value}>{subject.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item name="subjectCode" label="Subject Code" rules={[{ required: true }]}>
              <Select placeholder="Select subject code">
                {subjectCodes.map(code => (
                  <Option key={code.value} value={code.value}>{code.label}</Option>
                ))}
              </Select>
            </Form.Item>
            
            <Form.Item name="noOfStudents" label="No of Students" rules={[{ required: true }]}>
              <InputNumber min={1} max={200} placeholder="Number of students" className="w-full" />
            </Form.Item>
            
            <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
              <DatePicker className="w-full" />
            </Form.Item>
          </div>
          
          <Form.Item name="subjectContent" label="Subject Content">
            <TextArea rows={4} placeholder="Enter subject content details" />
          </Form.Item>
          
          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" loading={loading} className="w-full">
              Register Course
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}