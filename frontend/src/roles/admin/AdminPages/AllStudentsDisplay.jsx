import { Table, Typography, Input } from 'antd';
import { useEffect, useState } from "react";
import { getAllStudentsInSystem } from "../../../utils/adminAnalytics";

const { Title } = Typography;

const AllStudentsDisplay = () => {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudentsInSystem();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.indexNo && student.indexNo.toLowerCase().includes(search.toLowerCase())
  );

  const columns = [
    {
      title: 'Student Index',
      dataIndex: 'indexNo',
      key: 'indexNo',
    },
    {
      title: 'Student Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    }
  ];

  return (
    <div style={{ padding: '24px', background: '#fff', minHeight: '100vh' }}>
      <Title level={3} style={{ marginBottom: 16 }}>
        Registered Students
      </Title>

      <Input
        placeholder="Search by Index Number"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ width: 300, marginBottom: 20, padding: 8 }}
      />

      <Table
        columns={columns}
        dataSource={filteredStudents}
        rowKey="id"
        pagination={{ pageSize: 8 }}
        locale={{
          emptyText: search
            ? "This Index has No students"
            : "No students available"
        }}
      />
    </div>
  );
};

export default AllStudentsDisplay;