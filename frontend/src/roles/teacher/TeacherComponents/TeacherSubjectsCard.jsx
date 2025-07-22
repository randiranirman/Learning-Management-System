import { Card, Avatar, Typography, Divider, Row, Col, Statistic } from "antd";
import { BookOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

// Fixed color for all class cards - using the first card's purple color

const cardColor = "#722ed1";

const TeacherSubjectsCard = ({ subject, onClick }) => {
  return (
    <Card
      hoverable
      onClick={onClick}
      style={{
        borderTop: `3px solid ${cardColor}`,
        minHeight: 120,
        maxWidth: 320,
        margin: '0 auto',
        borderRadius: 10,
        boxShadow: '0 2px 8px #f0f1f2',
        padding: 0,
        cursor: "pointer",
      }}
      bodyStyle={{
        padding: 12,
        display: "flex",
        alignItems: "center",
        minHeight: 80,
      }}
    >
      <Avatar
        size={32}
        style={{ backgroundColor: cardColor, marginRight: 10 }}
        icon={<BookOutlined style={{ fontSize: 18 }} />}
      />
      <div style={{ flex: 1 }}>
        <Title level={4} style={{ margin: 0, fontSize: 22, lineHeight: 1.2 }}>
          {subject.name}
        </Title>
        <Text type="secondary" style={{ fontSize: 13 }}>
          {subject.code}
        </Text>
      </div>
    </Card>
  );
};

export default TeacherSubjectsCard;