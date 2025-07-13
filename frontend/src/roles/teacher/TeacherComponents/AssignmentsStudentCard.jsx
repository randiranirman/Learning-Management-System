import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import { FileTextOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AssignmentsStudentCard = ({ assignment }) => {
  return (
    <Card hoverable style={{ borderRadius: '12px', backgroundColor: '#e0e0e0' }}>
      <Space align="start">
        <Avatar
          shape="circle"
          size={48}
          icon={<FileTextOutlined />}
          style={{ backgroundColor: '#722ed1' }}
        />
        <div>
          <Text strong>Assignment Id: {assignment.assignmentId}</Text><br />
          <Text>Assignment Title: {assignment.assignmentTitle}</Text><br />
          <Text>Marks: {assignment.marks}</Text><br />
        </div>
      </Space>
    </Card>
  )
}

export default AssignmentsStudentCard;