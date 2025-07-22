import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Card, Row, Col, Button, Avatar, Space, Typography } from "antd";
import { BookOutlined, EyeOutlined, PlusOutlined, QuestionCircleOutlined, FileTextOutlined, EditOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const TeacherSubject = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const subjectName = new URLSearchParams(location.search).get("subjectName");
  const navigate = useNavigate();

  const theme = {
    primaryColor: "#722ed1",
    secondaryColor: "#1890ff",
    accentColor1: "#eb2f96",
    accentColor2: "#52c41a",
    spacing: {
      small: "0.5rem",
      medium: "1rem",
      large: "1.5rem",
    },
    fontSize: {
      title: "1.5rem",
      subtitle: "1.25rem",
      text: "0.875rem",
    },
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  };

  const classActions = [
    {
      title: "Create Quiz",
      icon: <QuestionCircleOutlined />,
      color: theme.primaryColor,
      description: "Create new quiz for students",
      action: () => navigate("/teacher/quiz"),
      buttonType: "create",
    },
    {
      title: "View Assignments",
      icon: <FileTextOutlined />,
      color: theme.secondaryColor,
      description: "Manage class assignments",
      action: () => navigate(`/teacher/assignments/${subjectId}`),
      buttonType: "view",
    },
    {
      title: "Grade Submissions",
      icon: <EditOutlined />,
      color: theme.accentColor1,
      description: "Review pending submissions",
      action: () => navigate(`/teacher/subject/${subjectId}/view-submissions`),
      buttonType: "view",
    },
    {
      title: "Class Materials",
      icon: <BookOutlined />,
      color: theme.accentColor2,
      description: "Upload and manage resources",
      action: () => navigate(`/teacher/files?subjectId=${subjectId}`),
      buttonType: "view",
    },
  ];

  return (
    <div
      style={{
        padding: theme.spacing.large,
        background: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "min(1200px, 100%)",
          margin: "0 auto",
        }}
      >
        <Card
          bordered
          style={{
            marginBottom: theme.spacing.large,
            borderRadius: theme.borderRadius,
            boxShadow: theme.boxShadow,
            border: `2px solid ${theme.primaryColor}`,
          }}
        >
          <Row
            align="middle"
            gutter={[16, 16]}
            style={{
              flexDirection: window.innerWidth < 576 ? "column" : "row",
              textAlign: window.innerWidth < 576 ? "center" : "left",
            }}
          >
            <Col xs={24} sm={2}>
              <Avatar
                size={{ xs: 48, sm: 64 }}
                style={{ backgroundColor: theme.primaryColor }}
                icon={<BookOutlined />}
              />
            </Col>
            <Col xs={24} sm={14}>
              <Title
                level={2}
                style={{
                  margin: 0,
                  color: theme.primaryColor,
                  fontSize: window.innerWidth < 576 ? theme.fontSize.subtitle : theme.fontSize.title,
                }}
              >
                {subjectName || "Subject Not Found"}
              </Title>
              <Text type="secondary" style={{ fontSize: theme.fontSize.text }}>
                {subjectId || "ID Not Found"}
              </Text>
            </Col>
          </Row>
        </Card>

        <Title
          level={3}
          style={{
            marginBottom: theme.spacing.large,
            fontSize: theme.fontSize.subtitle,
          }}
        >
          Class Management
        </Title>

        <Row gutter={[16, 16]}>
          {classActions.map((action, index) => (
            <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
              <Card
                hoverable
                bordered
                onClick={action.action}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    action.action();
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  minHeight: "200px",
                  borderRadius: theme.borderRadius,
                  boxShadow: theme.boxShadow,
                  borderLeft: `4px solid ${action.color}`,
                  cursor: "pointer",
                }}
                bodyStyle={{
                  padding: theme.spacing.medium,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Space size="middle">
                    <Avatar
                      icon={action.icon}
                      style={{ backgroundColor: action.color }}
                      size={{ xs: 32, sm: 40 }}
                    />
                    <div>
                      <Title
                        level={4}
                        style={{
                          margin: 0,
                          fontSize: window.innerWidth < 576 ? theme.fontSize.text : "1rem",
                        }}
                      >
                        {action.title}
                      </Title>
                      <Text
                        type="secondary"
                        style={{ fontSize: theme.fontSize.text }}
                      >
                        {action.description}
                      </Text>
                    </div>
                  </Space>
                </div>
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: action.color,
                    borderColor: action.color,
                    borderRadius: theme.borderRadius,
                    marginTop: theme.spacing.medium,
                  }}
                  icon={action.buttonType === "create" ? <PlusOutlined /> : <EyeOutlined />}
                >
                  {action.buttonType === "create" ? "Create New" : "View"}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default TeacherSubject;