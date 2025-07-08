import React, { useState, useEffect } from "react";
import { Form, Input, Button, Alert, Typography, Layout, Row, Col } from "antd";
import { MailOutlined } from "@ant-design/icons";
import { requestPasswordReset } from "../utils/authService";
import { useNavigate } from "react-router-dom";
import { resetRequestPassword } from "../assets/assets";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const RequestReset = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form] = Form.useForm();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await requestPasswordReset(email);
      setMessage("Password reset link sent to your email.");
    } catch (err) {
      console.error("Error requesting password reset:", err);
      setError("Email is not  registered or an error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      className="layout-container"
      style={{ minHeight: "100vh", background: "#f0f2f5" }}
    >
      <Content>
        <Row style={{ minHeight: "100vh" }}>
          {/* Reset Form (Left Side) */}
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={10}
            xl={8}
            style={{
              padding: "0 2rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                maxWidth: 450,
                width: "100%",
                margin: "0 auto",
                opacity: fadeIn ? 1 : 0,
                transform: `translateY(${fadeIn ? 0 : "20px"})`,
                transition: "all 0.7s ease-in-out",
              }}
            >
              <div style={{ marginBottom: 30, textAlign: "left" }}>
                <Title level={2} style={{ marginBottom: 8 }}>
                  Reset Password
                </Title>
                <Paragraph type="secondary">
                  Enter your email address and we'll send you a link to reset your password
                </Paragraph>
              </div>

              {error && (
                <Alert
                  message={error}
                  type="error"
                  showIcon
                  style={{ marginBottom: 24 }}
                  closable
                  onClose={() => setError("")}
                />
              )}

              {message && (
                <Alert
                  message={message}
                  type="success"
                  showIcon
                  style={{ marginBottom: 24 }}
                  closable
                  onClose={() => setMessage("")}
                />
              )}

              <Form
                form={form}
                name="reset"
                onSubmit={handleSubmit}
                layout="vertical"
                requiredMark={false}
                size="large"
              >
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: "Please enter your email address" },
                    { type: "email", message: "Please enter a valid email address" }
                  ]}
                >
                  <Input
                    prefix={<MailOutlined className="site-form-item-icon" />}
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item style={{ marginTop: 24 }}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    block
                    size="large"
                    style={{ height: 46, background: "#5038ED" }}
                    onClick={handleSubmit}
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center", marginTop: 24 }}>
                <Text type="secondary">
                  Remember your password?{" "}
                  <span
                    onClick={() => navigate("/")}
                    style={{ fontWeight: 500, color: "#1890ff", cursor: "pointer" }}
                  >
                    Back to Login
                  </span>
                </Text>
              </div>
            </div>
          </Col>

          {/* Image (Right Side) */}
          <Col
            xs={0}
            sm={0}
            md={12}
            lg={14}
            xl={16}
            style={{
              backgroundImage: `url(${resetRequestPassword})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          ></Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default RequestReset;