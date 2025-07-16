import { Card, Row, Col, Typography, Statistic } from 'antd';
import { useEffect, useState } from "react";
import AllStudentsDisplayCard from "../AdminComponents/AllStudentsDisplayCard";
import { getAllStudentsInSystem } from "../../../utils/adminAnalytics";

const AllStudentsDisplay = () => {
  const [students, setStudents] = useState([]);

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

  return (
    <Row gutter={[16, 16]}>
      {students.map((student) => (
        <Col span={8} key={student.id}>
          <AllStudentsDisplayCard student={student} />
        </Col>
      ))}
    </Row>
  )
}

export default AllStudentsDisplay;