import { Card, Avatar, Typography, Divider, Row, Col, Statistic, Tooltip } from 'antd';
import {
  BookOutlined,
  UserOutlined,
  FileTextOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

const cardBorderColor = "#d9d9d9"; // Light neutral gray
const cardBackground = "#ffffff"; // White background

const AnalyticsClassCard = ({ classItem, onClick }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(classItem)}
      style={{
        border: `1px solid ${cardBorderColor}`,
        borderRadius: 8,
        height: 260,
        backgroundColor: cardBackground,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
        cursor: 'pointer',
        overflow: 'hidden'
      }}
      bodyStyle={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
        padding: 16
      }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Avatar
            size={48}
            style={{ backgroundColor: '#7933daff', marginRight: 12 }}
            icon={<BookOutlined />}
          />
          <div style={{ flex: 1 }}>
            <Tooltip title={`${classItem.subjectCode}th Grade ${classItem.subjectTitle}`}>
              <Title level={5} ellipsis={{ rows: 1 }}>
                {`${classItem.subjectTitle}`}
              </Title>
            </Tooltip>
            <Text type="secondary" ellipsis={{ rows: 1 }}>
              {classItem.subjectCode} 
            </Text>
          </div>
        </div>

        <Divider style={{ margin: '12px 0' }} />

        <Row gutter={12}>
          <Col span={12}>
            <Statistic
              title="Students"
              value={classItem.noOfRegisterdStudents}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={12}>
            <Statistic
              title="Assignments"
              value={classItem.noOfAssignments}
              prefix={<FileTextOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default AnalyticsClassCard;
