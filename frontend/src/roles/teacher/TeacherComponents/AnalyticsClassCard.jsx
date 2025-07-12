import { Card, Avatar, Typography, Divider, Row, Col, Statistic } from 'antd';
import { 
  BookOutlined, 
  UserOutlined, 
  FileTextOutlined, 
  QuestionCircleOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;

// Fixed color for all class cards - using the first card's purple color
const cardColor = "#722ed1";

const AnalyticsClassCard = ({ classItem, onClick }) => {
  return (
    <Card
      hoverable
      onClick={() => onClick(classItem)}
      style={{ 
        borderTop: `4px solid ${cardColor}`,
        height: '280px',
        cursor: 'pointer'
      }}
      bodyStyle={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
      <div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar 
            size={48}
            style={{ backgroundColor: cardColor, marginRight: '12px' }}
            icon={<BookOutlined />}
          />
          <div>
            <Title level={4} style={{ margin: 0 }}>{`${classItem.subjectGrade}th Grade ${classItem.subjectTitle}`}</Title>
            <Text type="secondary">{classItem.subjectTitle}</Text>
          </div>
        </div>
        
        <Divider style={{ margin: '16px 0' }} />
        
        <Row gutter={16}>
          <Col span={8}>
            <Statistic 
              title="Students" 
              value={classItem.noOfRegisterdStudents}
              prefix={<UserOutlined />}
            />
          </Col>
          <Col span={8}>
            <Statistic 
              title="Assignments" 
              value={classItem.noOfAssignments}
              prefix={<FileTextOutlined />}
            />
          </Col>
        </Row>
      </div>

      <div>
        
      </div>
    </Card>
  );
};

export default AnalyticsClassCard;
