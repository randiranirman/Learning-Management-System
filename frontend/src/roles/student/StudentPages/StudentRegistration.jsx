import React, { useState, useEffect } from "react";
import { 
  Form, 
  Input, 
  Button, 
  Select, 
  DatePicker, 
  message,
  Row,
  Col,
  Divider
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  BookOutlined,
  NumberOutlined,
  TrophyOutlined
} from "@ant-design/icons";
import { fetchAllSubjects } from "../../../utils/subjectService";
import { fetchAllClasses } from "../../../utils/classService";
import { registerStudent } from "../../../utils/studentRegistrationService";

const { Option } = Select;

const StudentRegistration = () => {
  const [form] = Form.useForm();
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await fetchAllClasses();
        setClassOptions(classes || []);

        const subjects = await fetchAllSubjects();
        setSubjectOptions(subjects || []);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      const studentId = parseInt(localStorage.getItem("UserId"));

      // Map class name to class ID
      const selectedClass = classOptions.find(
        (cls) => cls.name === values.grade
      );

      // Map subject names to subject IDs
      const selectedSubjectIds = subjectOptions
        .filter((subject) => values.subjects.includes(subject.name))
        .map((subject) => subject.subjectId);

      const studentRegisterData = {
        name: values.studentName,
        studentId: studentId,
        classId: selectedClass?.id,
        subjectIds: selectedSubjectIds,
        indexNumber: values.indexNumber,
      };

      console.log(studentRegisterData)

      const response = await registerStudent(studentRegisterData);
      console.log("Student registered successfully:", response);
      message.success('Registration submitted successfully!');
      form.resetFields();
      setCurrentStep(2);
    } catch (error) {
      console.log("Registration failed", error);
      message.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f5f5f5', 
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Row justify="center" style={{ width: '100%', maxWidth: '1200px' }}>
        <Col xs={24} sm={20} md={16} lg={14} xl={12}>
<div style={{ 
            background: '#5038ED', 
            borderRadius: '16px', 
            padding: '32px',
            color: 'white',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <h2 style={{ color: 'white', margin: '0 0 8px 0', fontSize: '24px' }}>Course Registration</h2>
            <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '16px', margin: 0 }}>Complete your student registration form</p>
          </div>

          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '16px'
          }}>
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              size="large"
            >
              {/* Personal Information */}
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', color: '#333', fontWeight: 'bold', margin: '0 0 12px 0' }}>
                  Personal Information
                </h3>
                <Divider style={{ margin: '12px 0 20px' }} />
                
                <Form.Item 
                  name="studentName" 
                  label="Student Name" 
                  rules={[{ required: true, message: "Please enter your name!" }]}
                >
                  <Input 
                    prefix={<UserOutlined style={{ color: '#999' }} />} 
                    placeholder="Enter your full name"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>

                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item 
                      label="Date of Birth" 
                      name="dob" 
                      rules={[{ required: true, message: "Select your birth date" }]}
                    >
                      <DatePicker 
                        style={{ width: '100%', borderRadius: '8px' }} 
                        placeholder="Select date"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item 
                      name="indexNumber" 
                      label="Index Number" 
                      rules={[{ required: true, message: "Enter your index number" }]}
                    >
                      <Input 
                        prefix={<NumberOutlined style={{ color: '#999' }} />} 
                        placeholder="Index Number"
                        style={{ borderRadius: '8px' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item 
                  name="address" 
                  label="Address" 
                  rules={[{ required: true, message: "Please enter your address!" }]}
                >
                  <Input.TextArea 
                    rows={3} 
                    placeholder="Enter your residential address"
                    style={{ borderRadius: '8px', resize: 'none' }}
                  />
                </Form.Item>
              </div>

              {/* Academic Information */}
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '16px', color: '#333', fontWeight: 'bold', margin: '0 0 12px 0' }}>
                  Academic Information
                </h3>
                <Divider style={{ margin: '12px 0 20px' }} />
                
                <Form.Item 
                  name="grade" 
                  label="Select Grade" 
                  rules={[{ required: true, message: "Please select your grade!" }]}
                >
                  <Select 
                    placeholder="Choose your grade"
                    style={{ borderRadius: '8px' }}
                    suffixIcon={<TrophyOutlined style={{ color: '#999' }} />}
                  >
                    {classOptions.map((cls) => (
                      <Option key={cls.id} value={cls.name}>{cls.name}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item 
                  name="subjects" 
                  label="Choose Subjects" 
                  rules={[{ required: true, message: "Please select subjects!" }]}
                >
                  <Select 
                    mode="multiple" 
                    placeholder="Select your subjects" 
                    allowClear
                    style={{ borderRadius: '8px' }}
                    maxTagCount={3}
                    maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
                  >
                    {subjectOptions.map((subject) => (
                      <Option key={subject.subjectId} value={subject.name}>
                        <BookOutlined style={{ marginRight: '8px', color: '#5038ED' }} />
                        {subject.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>

              {/* Submit Button */}
              <Form.Item>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  size="large"
                  style={{
                    borderRadius: '8px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: '600',
                    backgroundColor: '#5038ED',
                    borderColor: '#5038ED'
                  }}
                  icon={<CheckCircleOutlined />}
                >
                  {loading ? 'Submitting Registration...' : 'Submit Registration'}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentRegistration;
