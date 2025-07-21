import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Table, Typography, Button, Spin, Alert, Empty, Divider } from 'antd';
import { BookOutlined, EyeOutlined } from '@ant-design/icons';
import { getStudentRegistrations } from '../../../utils/studentRegistrationService';
import { getAllSubjectMaterialsBySubjectIdForStudent } from '../../../utils/studentFileStorage';

const { Title } = Typography;

const SubjectPage = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const { course } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [subjectItems, setSubjectItems] = useState([]);
  const [error, setError] = useState(null);

  const defaultSubject = {
    title: 'Unknown Subject',
    grade: 'Grade Unknown',
    icon: <BookOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
    gradient: 'linear-gradient(135deg, #F7F3FF 0%, #EDE7FF 100%)',
    category: 'General'
  };

  const subject = course || defaultSubject;

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentId = parseInt(localStorage.getItem("UserId"));
        await getStudentRegistrations(studentId);

        const response = await getAllSubjectMaterialsBySubjectIdForStudent(subjectId);
        setSubjectItems(response);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load subject materials.');
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [subjectId]);

  const columns = [
    {
      title: 'Content Name',
      dataIndex: 'savedName',
      key: 'savedName',
    },
    {
      title: 'View Content',
      dataIndex: 'uploadLink',
      key: 'uploadLink',
      render: (link) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Title level={2} style={{ marginBottom: '30px' }}>
        {subject.title} - Topics & Materials
      </Title>

      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <Alert message={error} type="error" />
      ) : subjectItems.length === 0 ? (
        <Empty description="No topics or materials found." />
      ) : (
        subjectItems.map((topic) => (
          <div key={topic.subjectTopicId} style={{ marginBottom: '40px' }}>
            <Title level={4} style={{ marginBottom: '10px' }}>
              {topic.subjectTopicName}
            </Title>

            {topic.materials.length === 0 ? (
              <Empty description="No materials available for this topic." />
            ) : (
              <Table
                columns={columns}
                dataSource={topic.materials.map((item) => ({
                  ...item,
                  key: item.id,
                }))}
                pagination={false}
                size="middle"
                bordered
              />
            )}
            <Divider />
          </div>
        ))
      )}
    </div>
  );
};

export default SubjectPage;