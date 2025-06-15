import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { Form, Input, Button, Progress, Typography, Row, Col, Layout, Alert } from 'antd';
import { EyeOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons';
import { firstLoginNew } from '../assets/assets';
import { Content } from 'antd/es/layout/layout';
import { changeCredentials } from '../utils/authService';

const { Title, Text, Paragraph } = Typography;

export default function FirstLogin() {
  const [fadeIn, setFadeIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form] = Form.useForm();
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState({
    temporary: false,
    new: false,
    confirm: false
  });
  
  const debounceTimer = useRef(null);
  
  useEffect(() => {
    setFadeIn(true);
    
    // Cleanup debounce timer on unmount
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);
  
  // Memoized password strength calculation
  const calculatePasswordStrength = useCallback((password) => {
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    return strength;
  }, []);
  
  // Debounced password strength update to prevent excessive calculations
  const handlePasswordChange = useCallback((e) => {
    const password = e.target.value;
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer for debounced update
    debounceTimer.current = setTimeout(() => {
      setPasswordStrength(calculatePasswordStrength(password));
    }, 150); // 150ms debounce
  }, [calculatePasswordStrength]);
  
  // Memoized status and text calculations
  const strengthStatus = useMemo(() => {
    if (passwordStrength <= 1) return 'exception';
    if (passwordStrength <= 3) return 'normal';
    return 'success';
  }, [passwordStrength]);
  
  const strengthText = useMemo(() => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  }, [passwordStrength]);
  
  const togglePasswordVisibility = useCallback((field) => {
    setPasswordVisible(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  }, []);
  
  const handleSubmit = useCallback(async (values) => {
    if (values.newPassword !== values.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setMessage('');
            
    try {
      // Use form values directly instead of formDetails state
      const credentials = {
        temporaryPassword: values.temporaryPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
      };
      
      await changeCredentials(localStorage.getItem("usernameFromToken"), credentials);
      setMessage('Password changed successfully!');
    } catch (error) {
      setMessage('Failed to change password. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);
  
  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue('newPassword');
    if (value && password !== value) {
      return Promise.reject(new Error('Passwords do not match!'));
    }
    return Promise.resolve();
  };
  
  return (
    <Layout className="layout-container" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
      <Content>
        <Row style={{ minHeight: '100vh' }}>
          {/* Change Password Form (Left Side) */}
          <Col 
            xs={24} sm={24} md={12} lg={10} xl={8}
            style={{ 
              padding: '0 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div 
              style={{ 
                maxWidth: 450, 
                width: '100%', 
                margin: '0 auto',
                opacity: fadeIn ? 1 : 0,
                transform: `translateY(${fadeIn ? 0 : '20px'})`,
                transition: 'all 0.7s ease-in-out'
              }}
            >
              <div style={{ marginBottom: 30, textAlign: 'left' }}>
                <Title level={2} style={{ marginBottom: 8 }}>Change Your Password</Title>
                <Paragraph type="secondary">Please set a new secure password</Paragraph>
              </div>

              {message && (
                <Alert
                  message={message}
                  type={message.includes('success') ? 'success' : 'error'}
                  showIcon
                  style={{ marginBottom: 24 }}
                  closable
                  onClose={() => setMessage('')}
                />
              )}

              <Form
                form={form}
                name="changePassword"
                onFinish={handleSubmit}
                layout="vertical"
                requiredMark={false}
                size="large"
              >
                <Form.Item
                  name="temporaryPassword"
                  label="Temporary Password"
                  rules={[{ required: true, message: 'Please enter your temporary password' }]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter your temporary password"
                    visibilityToggle={{
                      visible: passwordVisible.temporary,
                      onVisibleChange: () => togglePasswordVisibility('temporary'),
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[
                    { required: true, message: 'Please enter your new password' },
                    { min: 8, message: 'Password must be at least 8 characters' }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter your new password"
                    onChange={handlePasswordChange}
                    visibilityToggle={{
                      visible: passwordVisible.new,
                      onVisibleChange: () => togglePasswordVisibility('new'),
                    }}
                  />
                </Form.Item>
                {form.getFieldValue('newPassword') && (
                  <div style={{ marginTop: -20, marginBottom: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Text type="secondary">Password strength:</Text>
                      <Text type="secondary">{strengthText}</Text>
                    </div>
                    <Progress 
                      percent={passwordStrength * 20} 
                      status={strengthStatus}
                      showInfo={false}
                      strokeWidth={5}
                      style={{ marginTop: 8 }}
                    />
                  </div>
                )}

                <Form.Item
                  name="confirmPassword"
                  label="Confirm Password"
                  rules={[
                    { required: true, message: 'Please confirm your password' },
                    { validator: validateConfirmPassword }
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Confirm your new password"
                    visibilityToggle={{
                      visible: passwordVisible.confirm,
                      onVisibleChange: () => togglePasswordVisibility('confirm'),
                    }}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: 24 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    style={{ 
                      height: 46, 
                      background: '#5038ED'
                    }}
                  >
                    {loading ? 'Changing Password...' : 'Change Password'}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>

          {/* Image (Right Side) */}
          {/* Image (Right Side) */}
          <Col 
            xs={0} sm={0} md={12} lg={14} xl={16}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f0f2f5'
            }}
          >
            <img
              src={firstLoginNew}
              alt="First Login"
              style={{
                width: '100%',
                height: '100vh',
                objectFit: 'cover',
                objectPosition: 'center',
                display: 'block'
              }}
              loading="lazy"
            />
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}