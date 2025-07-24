import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStudentsBySubjectId } from '../../../utils/analyticsService';
import { Table, Typography, Button } from 'antd';
import DropdownNavigation from '../TeacherComponents/DropdownNavigation';
import { EyeOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const SubjectStudents = () => {
  const { subjectId } = useParams();
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAllStudentsBySubjectId = async () => {
      try {
        const response = await getAllStudentsBySubjectId(subjectId);
        setStudents(response);
      } catch (error) {
        console.error("Error loading students: ", error);
      }
    };

    if (subjectId) {
      loadAllStudentsBySubjectId();
    }
  }, [subjectId]);

  const handleViewAnalytics = (studentId) => {
    navigate(`/teacher/analytics/${subjectId}/${studentId}`);
  };

  const columns = [
    {
      title: 'Student ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Index Number',
      dataIndex: 'indexNumber',
      key: 'indexNumber',
    },
    {
      title: 'Student Name',
      dataIndex: 'fullName',
      key: 'fullName',
      render: (text) => text || <Text type="secondary">N/A</Text>,
    },
    {
      title: 'View Analytics',
      key: 'actions',
      render: (_, record) => (
        <Button
          type="primary"
          icon={<EyeOutlined />}
          onClick={() => handleViewAnalytics(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Analytics</Title>
      <DropdownNavigation />
      <Title level={3}>Registered Students for Subject ID: {subjectId}</Title>

      <Table
        columns={columns}
        dataSource={students}
        rowKey="id"
        pagination={{ pageSize: 6 }}
      />

      {students.length === 0 && (
        <Text type="warning">No students registered for this subject.</Text>
      )}
    </div>
  );
};

export default SubjectStudents;