import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Button,
  Row,
  Col,
  Avatar,
  Divider,
  Space,
  Spin,
  Badge,
  Tag,
  theme
} from "antd";
import {
  UserOutlined,
  EditOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  SettingOutlined,
  BellOutlined,
  EyeOutlined
} from "@ant-design/icons";
import EditProfile from "./EditProfile";
import PasswordResetModal from "../AdminComponents/PasswordResetModal";
import { getAdminDetails } from "../../../utils/adminService";
import Swal from "sweetalert2";

const { Title, Text, Paragraph } = Typography;

const Settings = () => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [adminDetails, setAdminDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const { token } = theme.useToken();

  const fetchAdminDetails = async () => {
    const id = localStorage.getItem("UserId");
    if (!id) {
      console.error("User ID not found in localStorage");
      setLoading(false);
      return;
    }
    try {
      const details = await getAdminDetails(id);
      console.log("Admin Details:", details);
      setAdminDetails(details);
    } catch (error) {
      console.error("Failed to fetch admin details:", error);
      await Swal.fire({
        title: 'Error',
        text: 'Failed to fetch profile details.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (updatedData) => {
    setAdminDetails({ ...adminDetails, ...updatedData });
  };

  useEffect(() => {
    fetchAdminDetails();
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Spin size="large" tip="Loading settings..." />
      </div>
    );
  }

  const cardStyle = {
    borderRadius: 16,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid #f0f0f0',
    transition: 'all 0.3s ease',
  };

  const hoverCardStyle = {
    ...cardStyle,
    ':hover': {
      boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      transform: 'translateY(-2px)',
    }
  };

  return (
    <div style={{ padding: '24px', background: token.colorBgLayout, minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ marginBottom: '32px' }}>
        <Title level={2} style={{ margin: 0, color: token.colorTextHeading }}>
          <SettingOutlined style={{ marginRight: '12px', color: token.colorPrimary }} />
          Account Settings
        </Title>
        <Text type="secondary" style={{ fontSize: '16px' }}>
          Manage your profile, security settings, and account preferences
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Overview Card */}
        <Col xs={24} lg={8}>
          <Card style={cardStyle} className="settings-card">
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <Avatar 
                size={80} 
                icon={<UserOutlined />} 
                style={{ 
                  backgroundColor: token.colorPrimary,
                  marginBottom: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                }}
              />
              <Title level={4} style={{ margin: '0 0 8px 0' }}>
                {adminDetails.firstName} {adminDetails.lastName}
              </Title>
              <Tag color="blue" style={{ fontSize: '12px' }}>
                Administrator
              </Tag>
            </div>
            
            <Divider style={{ margin: '20px 0' }} />
            
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <MailOutlined style={{ color: token.colorPrimary, marginRight: '12px', fontSize: '16px' }} />
                <div style={{ flex: 1 }}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Email</Text>
                  <Text style={{ fontSize: '14px' }}>{adminDetails.email || 'Not provided'}</Text>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <PhoneOutlined style={{ color: token.colorPrimary, marginRight: '12px', fontSize: '16px' }} />
                <div style={{ flex: 1 }}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Phone</Text>
                  <Text style={{ fontSize: '14px' }}>{adminDetails.contactNumber || 'Not provided'}</Text>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <EnvironmentOutlined style={{ color: token.colorPrimary, marginRight: '12px', fontSize: '16px' }} />
                <div style={{ flex: 1 }}>
                  <Text type="secondary" style={{ fontSize: '12px', display: 'block' }}>Location</Text>
                  <Text style={{ fontSize: '14px' }}>
                    {adminDetails.city || adminDetails.address || 'Not provided'}
                  </Text>
                </div>
              </div>
            </Space>
            
            <Divider style={{ margin: '20px 0' }} />
            
            <Button 
              type="primary" 
              icon={<EditOutlined />} 
              block 
              size="large"
              onClick={() => setShowEditProfile(true)}
              style={{ borderRadius: '8px', height: '44px' }}
            >
              Edit Profile
            </Button>
          </Card>
        </Col>

        {/* Settings Options */}
        <Col xs={24} lg={16}>
          <Row gutter={[16, 16]}>
            {/* Security Settings */}
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle} 
                className="settings-card"
                hoverable
              >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    backgroundColor: token.colorErrorBg, 
                    borderRadius: '50%', 
                    width: '64px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px'
                  }}>
                    <LockOutlined style={{ fontSize: '28px', color: token.colorError }} />
                  </div>
                  <Title level={4} style={{ marginBottom: '8px' }}>Security</Title>
                  <Paragraph type="secondary" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    Reset your password and manage account security
                  </Paragraph>
                  <Button 
                    type="default" 
                    icon={<SafetyOutlined />} 
                    block
                    size="large"
                    onClick={() => setShowPasswordReset(true)}
                    style={{ borderRadius: '8px', height: '40px' }}
                  >
                    Reset Password
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Account Information */}
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle} 
                className="settings-card"
                hoverable
              >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    backgroundColor: token.colorInfoBg, 
                    borderRadius: '50%', 
                    width: '64px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px'
                  }}>
                    <EyeOutlined style={{ fontSize: '28px', color: token.colorInfo }} />
                  </div>
                  <Title level={4} style={{ marginBottom: '8px' }}>Account Info</Title>
                  <Paragraph type="secondary" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    View and manage your account details
                  </Paragraph>
                  <Button 
                    type="default" 
                    icon={<UserOutlined />} 
                    block
                    size="large"
                    onClick={() => {
                      Swal.fire({
                        title: 'Account Information',
                        html: `
                          <div style="text-align: left; padding: 20px;">
                            <p><strong>User ID:</strong> ${localStorage.getItem('UserId')}</p>
                            <p><strong>Username:</strong> ${localStorage.getItem('usernameFromToken')}</p>
                            <p><strong>Role:</strong> ${localStorage.getItem('UserRole')}</p>
                            <p><strong>First Login:</strong> ${localStorage.getItem('isFirstLogin') === 'true' ? 'Yes' : 'No'}</p>
                            <p><strong>Account Status:</strong> <span style="color: #52c41a;">Active</span></p>
                          </div>
                        `,
                        icon: 'info',
                        confirmButtonText: 'Close',
                        width: 600
                      });
                    }}
                    style={{ borderRadius: '8px', height: '40px' }}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Notification Settings */}
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle} 
                className="settings-card"
                hoverable
              >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    backgroundColor: token.colorWarningBg, 
                    borderRadius: '50%', 
                    width: '64px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px'
                  }}>
                    <BellOutlined style={{ fontSize: '28px', color: token.colorWarning }} />
                  </div>
                  <Title level={4} style={{ marginBottom: '8px' }}>Notifications</Title>
                  <Paragraph type="secondary" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    Manage your notification preferences
                  </Paragraph>
                  <Button 
                    type="default" 
                    icon={<SettingOutlined />} 
                    block
                    size="large"
                    onClick={() => {
                      Swal.fire({
                        title: 'Coming Soon!',
                        text: 'Notification settings will be available in the next update.',
                        icon: 'info',
                        confirmButtonText: 'Got it'
                      });
                    }}
                    style={{ borderRadius: '8px', height: '40px' }}
                  >
                    Configure
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Help & Support */}
            <Col xs={24} sm={12}>
              <Card 
                style={cardStyle} 
                className="settings-card"
                hoverable
              >
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ 
                    backgroundColor: token.colorSuccessBg, 
                    borderRadius: '50%', 
                    width: '64px', 
                    height: '64px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 16px'
                  }}>
                    <MailOutlined style={{ fontSize: '28px', color: token.colorSuccess }} />
                  </div>
                  <Title level={4} style={{ marginBottom: '8px' }}>Help & Support</Title>
                  <Paragraph type="secondary" style={{ fontSize: '14px', marginBottom: '20px' }}>
                    Get help and contact support team
                  </Paragraph>
                  <Button 
                    type="default" 
                    block
                    size="large"
                    onClick={() => {
                      Swal.fire({
                        title: 'Contact Support',
                        text: 'For technical support, please email: support@lms.com',
                        icon: 'info',
                        confirmButtonText: 'Close'
                      });
                    }}
                    style={{ borderRadius: '8px', height: '40px' }}
                  >
                    Contact Support
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Modals */}
      {showEditProfile && (
        <EditProfile 
          setShowEditProfile={setShowEditProfile} 
          adminDetails={adminDetails}
          onUpdate={handleProfileUpdate}
        />
      )}
      
      {showPasswordReset && (
        <PasswordResetModal 
          setShowPasswordReset={setShowPasswordReset}
          userEmail={adminDetails.email}
        />
      )}

      <style jsx>{`
        .settings-card:hover {
          box-shadow: 0 8px 30px rgba(0,0,0,0.12);
          transform: translateY(-2px);
        }
        .ant-card-body {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default Settings;
