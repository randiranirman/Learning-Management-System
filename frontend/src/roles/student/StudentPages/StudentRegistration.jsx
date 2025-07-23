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
  Card
} from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  BookOutlined,
  NumberOutlined,
  TrophyOutlined,
  CalendarOutlined,
  HomeOutlined
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
      background: '#ffffff', 
      padding: '24px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '1000px',
        margin: '0 auto'
      }}>
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #f0f0f0'
        }}>
          <h1 style={{ 
            color: '#262626', 
            fontSize: '28px', 
            fontWeight: '600',
            margin: '0 0 8px 0'
          }}>
            Student Registration
          </h1>
          <p style={{ 
            color: '#8c8c8c', 
            fontSize: '14px', 
            margin: 0
          }}>
            Complete your course registration form below
          </p>
        </div>

        {/* Main Form Card */}
        <Card 
          style={{
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            border: '1px solid #f0f0f0'
          }}
          bodyStyle={{ padding: '32px' }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            size="middle"
          >
            {/* Form Grid */}
            <Row gutter={[32, 20]}>
              {/* Left Column - Personal Info */}
              <Col xs={24} lg={12}>
                <div style={{ 
                  borderRight: '1px solid #f0f0f0',
                  paddingRight: '32px',
                  minHeight: '350px'
                }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    color: '#262626', 
                    fontWeight: '600', 
                    margin: '0 0 20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <UserOutlined style={{ color: '#5038ED', fontSize: '16px' }} />
                    Personal Information
                  </h3>
                  
                  <Form.Item 
                    name="studentName" 
                    label="Full Name" 
                    rules={[{ required: true, message: "Please enter your name!" }]}
                    style={{ marginBottom: '18px' }}
                  >
                    <Input 
                      prefix={<UserOutlined style={{ color: '#bfbfbf' }} />} 
                      placeholder="Enter your full name"
                      style={{ 
                        borderRadius: '6px',
                        height: '38px',
                        border: '1px solid #d9d9d9'
                      }}
                    />
                  </Form.Item>

                  <Form.Item 
                    label="Date of Birth" 
                    name="dob" 
                    rules={[{ required: true, message: "Select your birth date" }]}
                    style={{ marginBottom: '18px' }}
                  >
                    <DatePicker 
                      style={{ 
                        width: '100%', 
                        borderRadius: '6px',
                        height: '38px',
                        border: '1px solid #d9d9d9'
                      }} 
                      placeholder="Select date"
                      suffixIcon={<CalendarOutlined style={{ color: '#bfbfbf' }} />}
                    />
                  </Form.Item>

                  <Form.Item 
                    name="indexNumber" 
                    label="Index Number" 
                    rules={[{ required: true, message: "Enter your index number" }]}
                    style={{ marginBottom: '18px' }}
                  >
                    <Input 
                      prefix={<NumberOutlined style={{ color: '#bfbfbf' }} />} 
                      placeholder="Enter index number"
                      style={{ 
                        borderRadius: '6px',
                        height: '38px',
                        border: '1px solid #d9d9d9'
                      }}
                    />
                  </Form.Item>

                  <Form.Item 
                    name="address" 
                    label="Address" 
                    rules={[{ required: true, message: "Please enter your address!" }]}
                    style={{ marginBottom: '0' }}
                  >
                    <Input.TextArea 
                      rows={3} 
                      placeholder="Enter your residential address"
                      style={{ 
                        borderRadius: '6px', 
                        resize: 'none',
                        border: '1px solid #d9d9d9'
                      }}
                    />
                  </Form.Item>
                </div>
              </Col>

              {/* Right Column - Academic Info */}
              <Col xs={24} lg={12}>
                <div style={{ paddingLeft: '32px' }}>
                  <h3 style={{ 
                    fontSize: '16px', 
                    color: '#262626', 
                    fontWeight: '600', 
                    margin: '0 0 20px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <BookOutlined style={{ color: '#5038ED', fontSize: '16px' }} />
                    Academic Information
                  </h3>
                  
                  <Form.Item 
                    name="grade" 
                    label="Select Grade" 
                    rules={[{ required: true, message: "Please select your grade!" }]}
                    style={{ marginBottom: '18px' }}
                  >
                    <Select 
                      placeholder="Choose your grade"
                      style={{ 
                        borderRadius: '6px'
                      }}
                      size="middle"
                      suffixIcon={<TrophyOutlined style={{ color: '#bfbfbf' }} />}
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
                    style={{ marginBottom: '0' }}
                  >
                    <Select 
                      mode="multiple" 
                      placeholder="Select your subjects" 
                      allowClear
                      style={{ borderRadius: '6px' }}
                      size="middle"
                      maxTagCount={2}
                      maxTagPlaceholder={(omittedValues) => `+${omittedValues.length} more`}
                      optionLabelProp="label"
                    >
                      {subjectOptions.map((subject) => (
                        <Option 
                          key={subject.subjectId} 
                          value={subject.name}
                          label={subject.name}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <BookOutlined style={{ color: '#5038ED', fontSize: '14px' }} />
                            {subject.name}
                          </div>
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </div>
              </Col>
            </Row>

            {/* Submit Button */}
            <div style={{ 
              marginTop: '28px',
              paddingTop: '20px',
              borderTop: '1px solid #f0f0f0'
            }}>
              <Form.Item style={{ margin: 0 }}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  loading={loading}
                  size="large"
                  style={{
                    borderRadius: '6px',
                    height: '44px',
                    fontSize: '14px',
                    fontWeight: '500',
                    backgroundColor: '#5038ED',
                    borderColor: '#5038ED',
                    boxShadow: '0 2px 4px rgba(80, 56, 237, 0.2)'
                  }}
                  icon={<CheckCircleOutlined />}
                >
                  {loading ? 'Submitting Registration...' : 'Submit Registration'}
                </Button>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistration;
