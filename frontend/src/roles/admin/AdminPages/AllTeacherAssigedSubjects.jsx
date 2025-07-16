import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getSubjectsWithStudentCountByTeacherId } from "../../../utils/adminAnalytics";
import TeacherSubjectsWithStudentCountCard from "../AdminComponents/TeacherSubjectsWithStudentCountCard";
import { Row, Col } from "antd";

const AllTeacherAssigedSubjects = () => {
  const [searchParams] = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsWithStudentCountByTeacherId(
          teacherId
        );
        setSubjects(response);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    if (teacherId) {
      fetchSubjects();
    }
  }, [teacherId]);

  return (
    <div>
      <Row gutter={[16, 16]}>
        {subjects.length === 0 ? (
          <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
            No subjects are assigned to this teacher.
          </Col>
        ) : (
          subjects.map((subject) => (
            <Col span={8} key={subject.subjectId}>
              <TeacherSubjectsWithStudentCountCard subject={subject} />
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default AllTeacherAssigedSubjects;
