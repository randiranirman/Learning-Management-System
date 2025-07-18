import { Card, Row, Col, Typography, Statistic } from 'antd';
import { useEffect, useState } from "react";
import AllStudentsDisplayCard from "../AdminComponents/AllStudentsDisplayCard";
import { getAllStudentsInSystem } from "../../../utils/adminAnalytics";

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

  // Filter students by index number (case-insensitive)
  const filteredStudents = students.filter(student =>
    student.indexNo && student.indexNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        Registered Students
      </Typography.Title>
      <div style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Search by Index Number"
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 300, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredStudents.length === 0 ? (
          <Col span={24} style={{ textAlign: 'center', padding: '20px' }}>
            No students found for the given index number.
          </Col>
        ) : (
          filteredStudents.map((student) => (
            <Col span={8} key={student.id}>
              <AllStudentsDisplayCard student={student} />
            </Col>
          ))
        )}
      </Row>
    </div>
  )
}

export default AllStudentsDisplay;