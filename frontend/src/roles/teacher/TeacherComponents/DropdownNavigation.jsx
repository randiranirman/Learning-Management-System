// DropdownNavigation.jsx
import { Select, Typography } from 'antd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const { Option } = Select;
const { Title } = Typography;

const DropdownNavigation = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (value) => {
    if (value === 'students') {
      navigate(`/teacher/analytics/${subjectId}`);
    } else if (value === 'assignments') {
      navigate(`/teacher/analytics/assignments/${subjectId}`);
    }
  };

  const getCurrentView = () => {
    return location.pathname.includes('assignments') ? 'assignments' : 'students';
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
      <Title level={4}>
        {/* Analytics &gt; */}
      </Title>
      <Select
        defaultValue={getCurrentView()}
        style={{ width: 160 }}
        onChange={handleChange}
      >
        <Option value="students">Students</Option>
        <Option value="assignments">Assignments</Option>
      </Select>
    </div>
  );
};

export default DropdownNavigation;
