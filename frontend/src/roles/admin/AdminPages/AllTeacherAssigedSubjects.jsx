import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getSubjectsWithStudentCountByTeacherId } from "../../../utils/adminAnalytics";
import TeacherSubjectsWithStudentCountCard from "../AdminComponents/TeacherSubjectsWithStudentCountCard";
import { Row, Col } from "antd";

const AllTeacherAssigedSubjects = () => {
  const [searchParams] = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

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

  // Filter subjects by subjectTitle (case-insensitive)
  const filteredSubjects = subjects.filter(subject =>
    subject.subjectTitle && subject.subjectTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by Subject Title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 300, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredSubjects.length === 0 ? (
          <Col span={24} style={{ textAlign: "center", padding: "20px" }}>
            No subjects are assigned to this teacher.
          </Col>
        ) : (
          filteredSubjects.map((subject) => (
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
