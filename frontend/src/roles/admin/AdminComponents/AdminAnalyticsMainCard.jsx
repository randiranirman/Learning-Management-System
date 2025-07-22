import { Card, Row, Col, Typography, Statistic } from 'antd';
import { UserOutlined, ArrowUpOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const AdminAnalyticsMainCard = ({ item, onClick }) => {
  return (
    <Card hoverable onClick={onClick}
      bordered={false} 
      style={{ 
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <Statistic
        title={item.key}
        value={item.value}
        prefix={<UserOutlined style={{ color: '#5038ED' }} />}
        valueStyle={{ color: '#5038ED' }}
      />
    </Card>
  )
}

export default AdminAnalyticsMainCard;