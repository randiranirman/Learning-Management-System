import { useEffect, useState } from "react";
import { Row, Col, Typography, Divider } from 'antd';
import AnalyticsClassCard from "../TeacherComponents/AnalyticsClassCard";
import { useNavigate } from "react-router-dom";
import { getAllSubjectsForGivenTeacher } from "../../../utils/analyticsService";

const { Text, Title } = Typography;

const TeacherAnalytics = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState([]);

  // Ideally fetched from local storage or auth context
  const teacherId = 2; // parseInt(localStorage.getItem("UserId"))

  const handleClassSelect = (subjectId) => {
    navigate(`/teacher/analytics/${subjectId}`);
  };

  useEffect(() => {
    const loadAllSubjectsForTeacher = async () => {
      try {
        const response = await getAllSubjectsForGivenTeacher(teacherId);
        setClasses(response);
      } catch (error) {
        console.log("Error while loading subjects for this teacher!", error);
      }
    };

    if (teacherId) {
      loadAllSubjectsForTeacher();
    }
  }, [teacherId]);

  return (
    <div style={{ padding: '24px', background: '#ffffff', minHeight: '100vh' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '24px' }}>
        <Title level={2} style={{ marginBottom: 0 }}>Subject Performance Analytics</Title>
        <Text type="secondary">Gain insights into student engagement and assignment metrics across your subjects.</Text>
      </div>

      <Divider orientation="left">Subjects You Teach</Divider>

      <Row gutter={[24, 24]}>
        {classes.length === 0 ? (
          <Col span={24}>
            <Text type="secondary">No subjects assigned yet.</Text>
          </Col>
        ) : (
          classes.map((classItem) => (
            <Col xs={24} sm={12} lg={8} key={classItem.subjectId}>
              <AnalyticsClassCard 
                classItem={classItem} 
                onClick={() => handleClassSelect(classItem.subjectId)} 
              />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default TeacherAnalytics;
