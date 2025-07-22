import { useParams, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Tabs } from 'antd';

const SubjectLayout = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const tabItems = [
    {
      key: `/student/subject/${subjectId}`,
      label: 'Topics & Materials',
    },
    {
      key: `/student/subject/${subjectId}/assignments`,
      label: 'Assignments',
    },
  ];

  // Determine active tab: exact match for Topics, startsWith for Assignments
  const activeKey = tabItems.find((item) => 
    item.key === location.pathname || 
    (item.key === `/student/subject/${subjectId}/assignments` && 
     location.pathname.startsWith(`/student/subject/${subjectId}/assignments`))
  )?.key || tabItems[0].key; // Fallback to first tab if no match

  const onTabChange = (key) => {
    navigate(key);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Tabs activeKey={activeKey} items={tabItems} onChange={onTabChange} />
      <div style={{ marginTop: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SubjectLayout;