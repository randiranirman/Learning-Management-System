import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const StudentsAssignmentCard = ({ student }) => {
  return (
    <Card hoverable style={{ borderRadius: '12px', backgroundColor: '#e0e0e0' }}>
      <Space align="start">
        <Avatar
          shape="circle"
          size={48}
          icon={<UserOutlined />}
          style={{ backgroundColor: '#f5222d' }}
        />
        <div>
          <Text strong>Student Id: {student.studentId}</Text><br />
          <Text>Student Name: {student.fullName}</Text><br />
          <Text>Student Marks: {student.marks}</Text><br />
        </div>
      </Space>
    </Card>
  )
}

export default StudentsAssignmentCard;