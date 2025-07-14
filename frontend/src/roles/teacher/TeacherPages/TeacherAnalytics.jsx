import { useEffect, useState } from "react";
import { Row, Col, Typography } from 'antd';
import AnalyticsClassCard from "../TeacherComponents/AnalyticsClassCard";
import { useNavigate } from "react-router-dom";
import { getAllSubjectsForGivenTeacher } from "../../../utils/analyticsService";

const { Text, Title } = Typography;

const TeacherAnalytics = () => {

  const navigate = useNavigate();

  const handleClassSelect = (subjectId) => {
    navigate(`/teacher/analytics/${subjectId}`);
  }
  const [classes, setClasses] = useState([]);
  const teacherId = 2; // this must implement using token for teacher role 

  useEffect(() => {
    const loadAllSubjectsForTeacher = async () => {
      try {
        const response = await getAllSubjectsForGivenTeacher(teacherId);
        setClasses(response);
      } catch (error) {
        console.log("Error while loading classes for this teacher!", error);
      }
    }

    if (teacherId) {
      loadAllSubjectsForTeacher();
    }
  }, [teacherId])

  return (
    <div style={{ padding: '24px', background: '#ffffff', minHeight: '100vh' }}>
        <Title level={4}>
          Analytics
        </Title>
        <Row gutter={[24, 24]}>
          {classes.map((classItem) => (
            <Col xs={24} sm={12} lg={8} key={classItem.subjectId}>
              <AnalyticsClassCard classItem={classItem} onClick={() => handleClassSelect(classItem.subjectId)} />
            </Col>
          ))}
        </Row>
    </div>
  )
}

export default TeacherAnalytics;