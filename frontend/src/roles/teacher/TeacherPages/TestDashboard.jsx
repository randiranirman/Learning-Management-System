import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../../../utils/teacherFileStorage";
import TeacherSubjectsCard from "../TeacherComponents/TeacherSubjectsCard";
import { Card, Avatar, Typography, Divider, Row, Col, Statistic } from "antd";
import { useNavigate } from "react-router-dom";

const TestDashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const navigation = useNavigate();
  const teacherId = 2; // this must be dynamically set based on logged-in teacher

  const handleSubjectSelect = (subject) => {
    navigation(`/teacher/subject/${subject.subjectId}?subjectName=${subject.name}`);
  };

  useEffect(() => {
    const fetchAllSubjectsByTeacherId = async () => {
      try {
        const response = await getSubjectsByTeacherId(teacherId);
        console.log("Subjects fetched:", response);
        setSubjects(response);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };
    if (teacherId) {
      fetchAllSubjectsByTeacherId();
    }
  }, [teacherId]);

  return (
    <div>
      <Row gutter={[24, 24]}>
        {subjects.map((subject) => (
          <Col xs={24} sm={12} lg={8} key={subject.subjectId}>
            <TeacherSubjectsCard
              subject={subject}
              onClick={() => handleSubjectSelect(subject)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default TestDashboard;
