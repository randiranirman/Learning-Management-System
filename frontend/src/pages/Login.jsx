import React, { useState, useEffect, useContext } from "react";
import { Form, Input, Button, Alert, Typography, Layout, Row, Col } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { login } from "../utils/authService";
import { AuthContext } from "../auth/authContext";
import { useNavigate } from "react-router-dom";
import { loginImage } from "../assets/assets";

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;

const LoginPage = () => {
  const { handleLogin: contextHandleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form] = Form.useForm();
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation when component mounts
    setTimeout(() => setFadeIn(true), 100);
  }, []);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const loginResponse = await login(username, password);
      const role = loginResponse;

      // Update the context with the logged in user
      contextHandleLogin(role);
      
      const isFirstLogin = localStorage.getItem("isFirstLogin");
      if (isFirstLogin === "true") {
        navigate("/firstLogin");
        return;
      }

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "teacher") {
        navigate("/teacher");
      } else if (role === "student") {
        navigate("/student");
      } else {
        navigate("/unauthorized");
        setError("Unauthorized");
      }
    } catch (err) {
      setError(err.message);
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
          {/* Login Form (Left Side) */}
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
                  Welcome Back
                </Title>
                <Paragraph type="secondary">
                  Please sign in to continue
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

              <Form
                form={form}
                name="login"
                onSubmit={handleLoginSubmit}
                layout="vertical"
                requiredMark={false}
                size="large"
              >
                <Form.Item
                  name="username"
                  label="Username"
                  rules={[
                    { required: true, message: "Please enter your username" },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: true, message: "Please enter your password" },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    placeholder="Enter your password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onClick={handleLoginSubmit}
                  >
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </Form.Item>
              </Form>

              <div style={{ textAlign: "center", marginTop: 24 }}>
                <Text type="secondary">
                  Forgot your password?{" "}
                   <span
          onClick={() => navigate("/request-password-reset")}
          style={{ fontWeight: 500, color: "#1890ff", cursor: "pointer" }}
        >
          Reset it here
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
              backgroundImage: `url(${loginImage})`,
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

export default LoginPage;
