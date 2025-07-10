import React, { useState, useEffect } from 'react';
import { 
  Card, Avatar, Typography, Space, Divider, Row, Col, 
  Button, Tooltip, Form, Input, Modal, message, DatePicker, Select
} from 'antd';
import { 
  UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, BookOutlined,
  MessageOutlined, EditOutlined, CalendarOutlined, 
  IdcardOutlined, ReadOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Profile = () => {
  const [teacher, setTeacher] = useState({
    name: 'Ms. Jennifer Williams',
    subject: 'Mathematics',
    email: 'j.williams@lincoln-middle.edu',
    phone: '(555) 123-4567',
    classroom: '6',
    address: '123 Educator Lane, Teaching City, TC 54321',
    birthday: 'May 12, 1985',
    yearsTeaching: 7,
    education: 'B.Ed. in Mathematics Education, State University',
    bio: 'Dedicated middle school math teacher focused on making numbers fun and accessible for all students. Passionate about using interactive learning methods and technology in the classroom.'
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
  const [form] = Form.useForm();
  
  // InfoItem component for consistent styling
  const InfoItem = ({ icon, label, value }) => (
    <div style={{ marginBottom: '16px' }}>
      <Space align="start">
        <div style={{ 
          width: '36px', height: '36px', borderRadius: '8px', 
          backgroundColor: 'rgba(94, 53, 246, 0.1)', display: 'flex', 
          alignItems: 'center', justifyContent: 'center',
          color: '#5e35f6', fontSize: '16px'
        }}>{icon}</div>
        <div>
          <Text type="secondary" style={{ display: 'block', fontSize: '13px' }}>{label}</Text>
          <Text strong style={{ fontSize: '15px' }}>{value}</Text>
        </div>
      </Space>
    </div>
  );

  // Check if form values are different from initial values
  const checkFormChanges = (currentValues) => {
    try {
      // Compare current form values with initial values
      for (const key in currentValues) {
        // Skip comparison for birthdayDate as it's a special case
        if (key === 'birthdayDate') continue;
        
        // Check if value is different from initial
        if (currentValues[key] !== initialValues[key] && 
            String(currentValues[key]) !== String(initialValues[key])) {
          return true;
        }
      }
      
      // Special check for birthdayDate which is a dayjs object
      if (currentValues.birthdayDate && initialValues.birthdayDate) {
        if (!currentValues.birthdayDate.isSame(initialValues.birthdayDate)) {
          return true;
        }
      } else if ((currentValues.birthdayDate && !initialValues.birthdayDate) || 
                (!currentValues.birthdayDate && initialValues.birthdayDate)) {
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error checking form changes:", error);
      return false;
    }
  };

  const showEditModal = () => {
    try {
      // Convert string date to dayjs object for DatePicker
      const formData = { ...teacher };
      if (teacher.birthday) {
        formData.birthdayDate = dayjs(teacher.birthday, 'MMMM D, YYYY');
      }
      
      // Store initial values for change detection
      const initialFormValues = {};
      Object.keys(formData).forEach(key => {
        if (key !== 'birthdayDate') {
          initialFormValues[key] = formData[key];
        }
      });
      
      // Handle dayjs object separately
      if (formData.birthdayDate) {
        initialFormValues.birthdayDate = formData.birthdayDate;
      }
      
      // Set initial values for comparison
      setInitialValues(initialFormValues);
      
      // Set form fields
      form.setFieldsValue(formData);
      setIsEditModalVisible(true);
    } catch (error) {
      console.error("Error showing edit modal:", error);
      message.error("Could not open edit form. Please try again.");
    }
  };

  const handleSave = () => {
    try {
      // Check if form has changes
      const currentValues = form.getFieldsValue();
      const hasChanges = checkFormChanges(currentValues);
      
      if (!hasChanges) {
        message.info('No changes detected to save.');
        return;
      }

      // Validate all fields before saving
      form.validateFields()
        .then(values => {
          // Convert dayjs object back to string format
          const formattedValues = { ...values };
          if (formattedValues.birthdayDate) {
            formattedValues.birthday = formattedValues.birthdayDate.format('MMMM D, YYYY');
            delete formattedValues.birthdayDate;
          }
          
          // Update teacher state
          setTeacher(prevTeacher => ({...prevTeacher, ...formattedValues}));
          setIsEditModalVisible(false);
          message.success('Profile updated successfully!');
        })
        .catch(info => {
          // Show validation error message
          if (info.errorFields && info.errorFields.length > 0) {
            const fieldName = info.errorFields[0].name[0];
            const errorMsg = info.errorFields[0].errors[0];
            message.error(`${fieldName}: ${errorMsg}`);
          } else {
            message.error('Please fill in all required fields correctly.');
          }
        });
    } catch (error) {
      console.error('Error during form submission:', error);
      message.error('Could not save changes. Please try again.');
    }
  };

  return (
    <div style={{ 
      maxWidth: '1100px', margin: '24px auto', padding: '24px 20px',
      background: '#f0f2f5', minHeight: '100vh'
    }}>
      <Row gutter={[24, 24]}>
        {/* Teacher Profile Card */}
        <Col xs={24} md={8}>
          <Card 
            bordered={false} 
            style={{ 
              borderRadius: '16px', boxShadow: '0 6px 16px rgba(94, 53, 246, 0.15)', 
              overflow: 'hidden', background: '#5e35f6', color: 'white'
            }}
            actions={[
              <Tooltip title="Edit Profile">
                <Button type="text" icon={<EditOutlined />} onClick={showEditModal} style={{ color: 'white' }} />
              </Tooltip>,
              <Tooltip title="Send Message">
                <Button type="text" icon={<MessageOutlined />} style={{ color: 'white' }} />
              </Tooltip>
            ]}
          >
            <div style={{ textAlign: 'center', padding: '12px 0 20px' }}>
              <Avatar 
                size={110} icon={<UserOutlined />} src="https://via.placeholder.com/110" 
                style={{ border: '4px solid #ffffff', marginBottom: '16px' }} 
              />
              <Title level={3} style={{ margin: '0 0 4px 0', color: 'white' }}>{teacher.name}</Title>
              <Text style={{ fontSize: '16px', display: 'block', color: '#ffffff', fontWeight: 600, opacity: 0.9 }}>
                {teacher.subject} Teacher
              </Text>
            </div>
            <Divider style={{ margin: '8px 0 16px', borderColor: 'rgba(255,255,255,0.2)' }} />
            <div style={{ padding: '0 10px' }}>
              <Paragraph style={{ color: 'rgba(255,255,255,0.9)' }}>{teacher.bio}</Paragraph>
            </div>
          </Card>
        </Col>

        {/* Teacher Details Cards */}
        <Col xs={24} md={16}>
          <Card 
            title={<Space><BookOutlined style={{ color: '#5e35f6' }} /><span style={{ color: '#2f1b69' }}>Teacher Information</span></Space>}
            bordered={false} 
            style={{ borderRadius: '16px', boxShadow: '0 6px 16px rgba(94, 53, 246, 0.1)', background: 'white' }}
            extra={
              <Button 
                type="primary" icon={<EditOutlined />} size="small" onClick={showEditModal}
                style={{ background: '#5e35f6', border: 'none' }}
              >Edit Details</Button>
            }
          >
            <Row gutter={[24, 0]}>
              <Col xs={24} md={12}><InfoItem icon={<MailOutlined />} label="Email Address" value={teacher.email} /></Col>
              <Col xs={24} md={12}><InfoItem icon={<PhoneOutlined />} label="Phone Number" value={teacher.phone} /></Col>
              <Col xs={24} md={12}><InfoItem icon={<HomeOutlined />} label="Classroom" value={teacher.classroom} /></Col>
              <Col xs={24} md={12}><InfoItem icon={<IdcardOutlined />} label="Home Address" value={teacher.address} /></Col>
              <Col xs={24} md={12}><InfoItem icon={<CalendarOutlined />} label="Birthday" value={teacher.birthday} /></Col>
            </Row>

            <Divider style={{ margin: '16px 0' }} />
            
            <div>
              <Space align="center" style={{ marginBottom: '12px' }}>
                <ReadOutlined style={{ color: '#5e35f6' }} />
                <Text strong style={{ color: '#2f1b69' }}>Education</Text>
              </Space>
              <Paragraph style={{ marginBottom: '14px' }}><Text>{teacher.education}</Text></Paragraph>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal
        title={<span style={{ color: '#2f1b69' }}>Edit Profile Information</span>}
        open={isEditModalVisible}
        destroyOnClose={true}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>Cancel</Button>,
          <Button 
            key="submit" 
            type="primary" 
            onClick={handleSave}
            style={{ background: '#5e35f6', border: 'none' }}
          >
            Save Changes
          </Button>
        ]}
        width={700}
      >
        <Form 
          form={form} 
          layout="vertical" 
          initialValues={{...teacher}}
          onValuesChange={(changedValues, allValues) => {
            // No need for complex state tracking since we directly check
            // form validity and changes when the save button is clicked
          }}
        >
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Full Name" 
                rules={[
                  { required: true, message: 'Please enter your name' },
                  { min: 4, message: 'Name must be at least 4 characters' },
                  { max: 50, message: 'Name cannot exceed 50 characters' }
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter your subject' }]}>
                <Input placeholder="Enter your subject" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="email" label="Email Address" 
                rules={[
                  { required: true, message: 'Please enter your email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input prefix={<MailOutlined />} placeholder="Enter your email" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="Phone Number" 
                rules={[
                  { required: true, message: 'Please enter your phone number' },
                  { 
                    pattern: /^07\d{8}$/, 
                    message: 'Phone number must be 10 digits and start with 07' 
                  }
                ]}
              >
                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number (07xxxxxxxx)" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="classroom" label="Class" rules={[{ required: true, message: 'Please select your class' }]}> 
                <Select 
                  placeholder="Select class"
                  options={[
                    { value: '6', label: '6' },
                    { value: '7', label: '7' },
                    { value: '8', label: '8' },
                    { value: '9', label: '9' },
                    { value: '10', label: '10' },
                    { value: '11', label: '11' }
                  ]}
                  virtual={false}
                  getPopupContainer={trigger => trigger.parentElement}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="address" label="Home Address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input prefix={<IdcardOutlined />} placeholder="Enter your home address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="birthdayDate" label="Birthday" 
                rules={[
                  { required: true, message: 'Please select your birthday' },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      
                      // Check if age is at least 18 and less than 100
                      const today = dayjs();
                      const age = today.diff(value, 'year');
                      
                      if (age < 18) {
                        return Promise.reject(new Error('You must be at least 18 years old'));
                      }
                      
                      if (age > 100) {
                        return Promise.reject(new Error('Please enter a valid birth date'));
                      }
                      
                      return Promise.resolve();
                    }
                  }
                ]}
              >
                <DatePicker 
                  style={{ width: '100%' }} 
                  format="MMMM D, YYYY"
                  getPopupContainer={trigger => trigger.parentElement}
                  disabledDate={(current) => {
                    if (!current) return false;
                    
                    // Can't select future dates or dates less than 18 years ago
                    const today = dayjs().endOf('day');
                    const eighteenYearsAgo = dayjs().subtract(18, 'year');
                    
                    return current > today || current > eighteenYearsAgo;
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="bio" label="Bio" rules={[{ required: true, message: 'Please enter your bio' }]}>
                <TextArea rows={4} placeholder="Write a short bio about yourself" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item name="education" label="Education" rules={[{ required: true, message: 'Please enter your education' }]}>
                <Input prefix={<ReadOutlined />} placeholder="Enter your education background" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;