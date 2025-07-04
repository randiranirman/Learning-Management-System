import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Alert,
  Typography,
  Layout,
  Row,
  Col,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import { resetPasswordImg } from "../assets/assets";
import { resetPassword } from "../utils/authService";


const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleSubmit = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      await resetPassword({ email, token, newPassword, confirmPassword });
      setMessage("Password reset successfully. You can now log in with your new password.");
    } catch (err) {
      console.error("Error resetting password:", err);
      setError("Failed to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#ffffff" }}>
      <Content>
        <Row style={{ minHeight: "100vh" }}>
          {/* Left Side: Form */}
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={10}
            xl={8}
            style={{
              padding: "3rem 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              backgroundColor: "#ffffff",
            }}
          >
            <div
              style={{
                maxWidth: 480,
                width: "100%",
                margin: "0 auto",
                opacity: fadeIn ? 1 : 0,
                transform: `translateY(${fadeIn ? 0 : "20px"})`,
                transition: "all 0.7s ease-in-out",
              }}
            >
              <Title level={2} style={{ marginBottom: 12, color: "#1f1f1f" }}>
                Set a New Password
              </Title>
              <Paragraph type="secondary" style={{ fontSize: "15px", color: "#595959" }}>
                Enter a strong password and confirm it to finish resetting your account.
              </Paragraph>

              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  style={{ margin: "24px 0" }}
                  closable
                  onClose={() => setError("")}
                />
              )}

              {message && (
                <Alert
                  message={message}
                  type="success"
                  showIcon
                  style={{ margin: "24px 0" }}
                  closable
                  onClose={() => setMessage("")}
                />
              )}

              <Form
                form={form}
                name="reset_password_form"
                layout="vertical"
                size="large"
                requiredMark={false}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="newPassword"
                  label="New Password"
                  rules={[{ required: true, message: "Please enter your new password" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    style={{ height: "48px", borderRadius: "8px" }}
                  />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label="Confirm New Password"
                  rules={[{ required: true, message: "Please confirm your new password" }]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ height: "48px", borderRadius: "8px" }}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: 32 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    style={{
                      height: 48,
                      borderRadius: "8px",
                      background: "#5038ED",
                      fontWeight: 600,
                      fontSize: "16px",
                    }}
                  >
                    {loading ? "Resetting..." : "Reset Password"}
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center", marginTop: 24 }}>
                <Text type="secondary" style={{ fontSize: "14px" }}>
                  Go back to{" "}
                  <span
                    onClick={() => navigate("/")}
                    style={{ fontWeight: 500, color: "#5038ED", cursor: "pointer" }}
                  >
                    Login
                  </span>
                </Text>
              </div>
            </div>
          </Col>

          {/* Right Side: Image */}
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={14}
            xl={16}
            style={{
              backgroundImage: `url(${resetPasswordImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              position: "relative",
            }}
          />
        </Row>
      </Content>
    </Layout>
  );
};

export default ResetPassword;
