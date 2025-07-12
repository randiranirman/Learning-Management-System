import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;


const StudentsSubjectCard = ({ student, onClick }) => {
  return (
    <Card hoverable onClick={onClick} style={{ borderRadius: '12px', backgroundColor: '#e0e0e0' }}>
      <Space align="start">
        <Avatar
          shape="circle"
          size={48}
          icon={<UserOutlined />}
          style={{ backgroundColor: '#f5222d' }}
        />
        <div>
          <Text strong>Student Id: {student.id}</Text><br />
          <Text>Student Name: {student.fullName}</Text><br />
          <Text>Student Index: {student.indexNumber}</Text><br />
        </div>
      </Space>
    </Card>
  )
}

export default StudentsSubjectCard;
