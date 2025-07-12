import { useState } from "react";
import { Row, Col, Typography } from 'antd';
import AnalyticsClassCard from "../TeacherComponents/AnalyticsClassCard";
import { useNavigate } from "react-router-dom";

const { Text, Title } = Typography;

const TeacherAnalytics = () => {

  const [selectedClass, setSelectedClass] = useState(null);

  const navigate = useNavigate();

  const handleClassSelect = (subjectId) => {
    navigate(`/teacher/analytics/${subjectId}`);
  }

  const classes = [
    {
      subjectId: 1,
      subjectTitle: "t1",
      subjectGrade: 10,
      noOfAssignments: 2,
      noOfRegisterdStudents: 2
    },
    {
      subjectId: 2,
      subjectTitle: "t2",
      subjectGrade: 10,
      noOfAssignments: 2,
      noOfRegisterdStudents: 1
    },
    {
      subjectId: 3,
      subjectTitle: "t3",
      subjectGrade: 9,
      noOfAssignments: 1,
      noOfRegisterdStudents: 0
    }
  ]

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
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