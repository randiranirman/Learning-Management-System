import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Typography, Input, Button } from 'antd';
import { EyeOutlined } from "@ant-design/icons";
import { getAllTeachersInSystem } from "../../../utils/adminAnalytics";

const { Title } = Typography;

const AllTeachersDisplay = () => {
  const [teachers, setTeachers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await getAllTeachersInSystem();
        setTeachers(response);
      } catch (error) {
        console.error("Failed to fetch teachers:", error);
      }
    };
    fetchTeachers();
  }, []);

  // Filter teachers by employeeId
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.employeeId?.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeId",
      key: "employeeId",
    },
    {
      title: "Teacher Name",
      dataIndex: "teacherFullName",
      key: "teacherFullName",
    },
    {
      title: "Teacher Email",
      dataIndex: "teacherEmail",
      key: "teacherEmail",
    },
    {
      title: "Subject Count",
      dataIndex: "subjectCount",
      key: "subjectCount",
    },
    {
      title: "View Subjects",
      key: "action",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => navigate(`/admin/analytics/teacher?teacherId=${record.teacherId}`)}
        >
          View Subjects
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Title level={3} style={{ marginBottom: 24 }}>
        Registered Teachers
      </Title>

      <Input
        placeholder="Search by Employee ID"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 16, padding: 8 }}
      />

      <Table
        dataSource={filteredTeachers}
        columns={columns}
        rowKey="teacherId"
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "This Index have No Teachers" }}
      />
    </div>
  );
};

export default AllTeachersDisplay;
