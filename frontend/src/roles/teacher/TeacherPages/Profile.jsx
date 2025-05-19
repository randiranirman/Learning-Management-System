import React, { useState } from 'react';
import { 
  Card, Avatar, Typography, Space, Divider, Row, Col, Tag, List, 
  Button, Tooltip, Form, Input, Modal, message
} from 'antd';
import { 
  UserOutlined, MailOutlined, PhoneOutlined, HomeOutlined, BookOutlined,
  MessageOutlined, EditOutlined, CalendarOutlined, BulbOutlined, 
  IdcardOutlined, ReadOutlined
} from '@ant-design/icons';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const Profile = () => {
  const [teacher, setTeacher] = useState({
    name: 'Ms. Jennifer Williams',
    subject: 'Mathematics',
    grade: '8th Grade',
    email: 'j.williams@lincoln-middle.edu',
    phone: '(555) 123-4567',
    classroom: 'Room 203',
    address: '123 Educator Lane, Teaching City, TC 54321',
    birthday: 'May 12, 1985',
    yearsTeaching: 7,
    education: 'B.Ed. in Mathematics Education, State University',
    bio: 'Dedicated middle school math teacher focused on making numbers fun and accessible for all students. Passionate about using interactive learning methods and technology in the classroom.',
    certifications: [
      'State Teaching License - Mathematics (K-12)',
      'Professional Development in Technology Integration',
      'Special Education Awareness Training'
    ]
  });
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
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

  const showEditModal = () => {
    form.setFieldsValue({...teacher});
    setIsEditModalVisible(true);
  };

  const handleSave = () => {
    form.validateFields()
      .then(values => {
        setTeacher({...teacher, ...values});
        setIsEditModalVisible(false);
        message.success('Profile updated successfully!');
      })
      .catch(info => console.log('Validate Failed:', info));
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
              <Tag color="purple" style={{ 
                margin: '8px 0', borderRadius: '12px', padding: '0 10px', 
                background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)', color: 'white' 
              }}>{teacher.grade}</Tag>
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
                <Text strong style={{ color: '#2f1b69' }}>Education & Certifications</Text>
              </Space>
              <Paragraph style={{ marginBottom: '14px' }}><Text>{teacher.education}</Text></Paragraph>
              <List
                size="small"
                dataSource={teacher.certifications}
                renderItem={(item) => (
                  <List.Item style={{ borderBottom: 'none', padding: '4px 0' }}>
                    <List.Item.Meta
                      avatar={<BulbOutlined style={{ color: '#5e35f6' }} />}
                      title={<span style={{ color: '#2f1b69' }}>{item}</span>}
                    />
                  </List.Item>
                )}
              />
            </div>
          </Card>
        </Col>
      </Row>

      {/* Edit Profile Modal */}
      <Modal
        title={<span style={{ color: '#2f1b69' }}>Edit Profile Information</span>}
        visible={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>Cancel</Button>,
          <Button key="submit" type="primary" onClick={handleSave} style={{ background: '#5e35f6', border: 'none' }}>
            Save Changes
          </Button>
        ]}
        width={700}
      >
        <Form form={form} layout="vertical" initialValues={{...teacher}}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your name' }]}>
                <Input prefix={<UserOutlined />} placeholder="Enter your full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="subject" label="Subject" rules={[{ required: true, message: 'Please enter your subject' }]}>
                <Input placeholder="Enter your subject" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="grade" label="Grade" rules={[{ required: true, message: 'Please enter your grade' }]}>
                <Input placeholder="Enter your grade level" />
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
              <Form.Item name="phone" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number' }]}>
                <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="classroom" label="Classroom" rules={[{ required: true, message: 'Please enter your classroom' }]}>
                <Input prefix={<HomeOutlined />} placeholder="Enter classroom number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="address" label="Home Address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input prefix={<IdcardOutlined />} placeholder="Enter your home address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="birthday" label="Birthday" rules={[{ required: true, message: 'Please enter your birthday' }]}>
                <Input prefix={<CalendarOutlined />} placeholder="Enter your birthday" />
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