import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getAllStudentsBySubjectId } from '../../../utils/analyticsService';
import { Row, Typography, Col } from 'antd';
import StudentsSubjectCard from '../TeacherComponents/StudentsSubjectCard';

const { Text, Title } = Typography;

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

  const handleSelect = (studentId) => {
    navigate(`/teacher/analytics/${subjectId}/${studentId}`);
  }

  return (
    <div style={{ padding: '24px' }}>
      <Title level={3}>Registered Students for Subject ID: {subjectId}</Title>

      <Row gutter={[16, 16]}>
        {students.map((student) => (
            <Col xs={24} sm={12} md={8} lg={6} key={student.id}>
                <StudentsSubjectCard student={student} onClick={() => handleSelect(student.id)} />
            </Col>
        ))}
      </Row>

      {students.length === 0 && (
        <Text type="warning">No students registered for this subject.</Text>
      )}
    </div>
  );
};

export default SubjectStudents;
