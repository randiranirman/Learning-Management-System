import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Table, Input, Typography, Space } from "antd";
import { getSubjectsWithStudentCountByTeacherId } from "../../../utils/adminAnalytics";

const { Title } = Typography;

const AllTeacherAssigedSubjects = () => {
  const [searchParams] = useSearchParams();
  const teacherId = searchParams.get("teacherId");

  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await getSubjectsWithStudentCountByTeacherId(teacherId);
        setSubjects(response);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
      }
    };

    if (teacherId) {
      fetchSubjects();
    }
  }, [teacherId]);

  const filteredSubjects = subjects.filter(subject =>
    subject.subjectTitle && subject.subjectTitle.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Subject ID",
      dataIndex: "subjectId",
      key: "subjectId",
    },
    {
      title: "Subject Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Subject Title",
      dataIndex: "subjectTitle",
      key: "subjectTitle",
    },
    {
      title: "Registered Student Count",
      dataIndex: "noOfRegisteredStudents",
      key: "noOfRegisteredStudents",
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>Subjects Assigned to the Teacher</Title>

      <Space direction="vertical" style={{ width: "100%", marginBottom: 16 }}>
        <Input
          placeholder="Search by Subject Title"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 300 }}
        />
      </Space>

      <Table
        dataSource={filteredSubjects}
        columns={columns}
        rowKey="subjectId"
        pagination={{ pageSize: 6 }}
        locale={{ emptyText: "No subjects found for the given title or teacher." }}
      />
    </div>
  );
};

export default AllTeacherAssigedSubjects;
