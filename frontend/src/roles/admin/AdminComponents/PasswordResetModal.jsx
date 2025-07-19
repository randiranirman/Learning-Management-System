import React, { useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  Button, 
  Typography, 
  Space, 
  Divider,
  Alert,
  Steps
} from 'antd';
import { 
  MailOutlined, 
  LockOutlined, 
  SafetyOutlined,
  CheckCircleOutlined 
} from '@ant-design/icons';
import { requestPasswordReset } from '../../../utils/authService';
import Swal from 'sweetalert2';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const PasswordResetModal = ({ setShowPasswordReset, userEmail }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState(userEmail || '');

  const handlePasswordReset = async (values) => {
    setLoading(true);
    try {
      await requestPasswordReset(values.email);
      setCurrentStep(1);
      await Swal.fire({
        title: 'Reset Link Sent!',
        text: `A password reset link has been sent to ${values.email}. Please check your email inbox and follow the instructions.`,
        icon: 'success',
        confirmButtonText: 'Got it!',
        timer: 5000,
        timerProgressBar: true
      });
    } catch (error) {
      console.error('Password reset error:', error);
      await Swal.fire({
        title: 'Error',
        text: error.message || 'Failed to send password reset email. Please try again.',
        icon: 'error',
        confirmButtonText: 'Try Again'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowPasswordReset(false);
  };

  const steps = [
    {
      title: 'Enter Email',
      description: 'Provide your email address',
      icon: <MailOutlined />
    },
    {
      title: 'Check Email',
      description: 'Follow the reset link',
      icon: <CheckCircleOutlined />
    }
  ];

  return (
    <Modal
      open
      title={null}
      onCancel={handleClose}
      footer={null}
      centered
      width={520}
      style={{ borderRadius: '12px' }}
      bodyStyle={{ padding: '32px 24px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <div style={{ 
          backgroundColor: '#ff4d4f20', 
          borderRadius: '50%', 
          width: '72px', 
          height: '72px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          margin: '0 auto 16px'
        }}>
          <LockOutlined style={{ fontSize: '32px', color: '#ff4d4f' }} />
        </div>
        <Title level={3} style={{ margin: '0 0 8px 0', color: '#262626' }}>
          Reset Your Password
        </Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          Enter your email address and we'll send you a reset link
        </Text>
      </div>

      <Steps current={currentStep} size="small" style={{ marginBottom: '24px' }}>
        {steps.map((step, index) => (
          <Step 
            key={index} 
            title={step.title} 
            description={step.description}
            icon={step.icon}
          />
        ))}
      </Steps>

      {currentStep === 0 && (
        <>
          <Alert
            message="Security Notice"
            description="For your security, the reset link will expire in 15 minutes. Make sure to check your spam folder if you don't see the email."
            type="info"
            showIcon
            style={{ marginBottom: '24px', borderRadius: '8px' }}
          />

          <Form
            form={form}
            onFinish={handlePasswordReset}
            layout="vertical"
            initialValues={{ email: userEmail }}
            requiredMark={false}
          >
            <Form.Item
              name="email"
              label={
                <span style={{ fontWeight: 500, color: '#262626' }}>
                  <MailOutlined style={{ marginRight: '8px', color: '#1890ff' }} />
                  Email Address
                </span>
              }
              rules={[
                { required: true, message: 'Please enter your email address' },
                { type: 'email', message: 'Please enter a valid email address' }
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email address"
                style={{ borderRadius: '8px', height: '48px' }}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Item>

            <Space direction="vertical" style={{ width: '100%' }}>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                block
                size="large"
                icon={<SafetyOutlined />}
                style={{ 
                  borderRadius: '8px', 
                  height: '48px',
                  fontWeight: 500
                }}
              >
                {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>
              
              <Button
                type="text"
                onClick={handleClose}
                block
                style={{ 
                  borderRadius: '8px',
                  height: '40px',
                  color: '#8c8c8c'
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form>
        </>
      )}

      {currentStep === 1 && (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ 
            backgroundColor: '#52c41a20', 
            borderRadius: '50%', 
            width: '80px', 
            height: '80px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 24px'
          }}>
            <CheckCircleOutlined style={{ fontSize: '40px', color: '#52c41a' }} />
          </div>
          
          <Title level={4} style={{ color: '#52c41a', marginBottom: '12px' }}>
            Reset Link Sent Successfully!
          </Title>
          
          <Paragraph style={{ fontSize: '16px', color: '#595959', marginBottom: '24px' }}>
            We've sent a password reset link to:
            <br />
            <strong style={{ color: '#262626' }}>{email}</strong>
          </Paragraph>

          <Alert
            message="Next Steps"
            description={
              <div style={{ textAlign: 'left' }}>
                <p style={{ margin: '8px 0' }}>1. Check your email inbox</p>
                <p style={{ margin: '8px 0' }}>2. Click the reset link in the email</p>
                <p style={{ margin: '8px 0' }}>3. Create your new password</p>
                <p style={{ margin: '8px 0 0 0' }}>
                  <strong>Note:</strong> The link expires in 15 minutes
                </p>
              </div>
            }
            type="success"
            style={{ marginBottom: '24px', textAlign: 'left' }}
          />

          <Space direction="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              onClick={handleClose}
              block
              size="large"
              style={{ 
                borderRadius: '8px', 
                height: '48px',
                fontWeight: 500
              }}
            >
              Close
            </Button>
            
            <Button
              type="text"
              onClick={() => setCurrentStep(0)}
              style={{ 
                borderRadius: '8px',
                height: '40px',
                color: '#1890ff'
              }}
            >
              Send Another Email
            </Button>
          </Space>
        </div>
      )}
    </Modal>
  );
};

export default PasswordResetModal;
