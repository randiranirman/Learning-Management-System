import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AssignmentsSubjectCard = ({ assignment, onClick }) => {
  return (
    <Card hoverable onClick={onClick} style={{ borderRadius: '12px', backgroundColor: '#e0e0e0' }}>
      <Space align="start">
        <Avatar
          shape="circle"
          size={48}
          icon={<FileTextOutlined />}
          style={{ backgroundColor: '#722ed1' }}
        />
        <div>
          <Text strong>Assignment Id: {assignment.id}</Text><br />
          <Text>Assignment Title: {assignment.title}</Text><br />
          <Text>Status: {assignment.status}</Text><br />
          <Text>Submissions: {assignment.noOfSubmissions}</Text><br />
        </div>
      </Space>
    </Card>
  )
}

export default AssignmentsSubjectCard;
