import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllStudentsThatMadeSubmissionByAssignmentId } from "../../../utils/analyticsService";
import StudentsAssignmentCard from "../TeacherComponents/StudentsAssignmentCard";
import { Row, Col, Card, Typography, Avatar, Space } from 'antd';

const { Text, Title } = Typography;

const AllStudentsPerAssignment = () => {
    const { subjectId, assignmentId } = useParams();
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const loadAllStudentsThatMadeSubmissionsForAssignment = async () => {
            try {
                const response = await getAllStudentsThatMadeSubmissionByAssignmentId(assignmentId);
                setStudents(response);
            } catch(error) {
                console.log(`Error while loading students for assignment Id: ${assignmentId}`, error);
            }
        }
        if (assignmentId) {
            loadAllStudentsThatMadeSubmissionsForAssignment();
        }
    }, [subjectId, assignmentId])

    return (
        <div>
            <Title level={3}>Students and thier marks for Assignment Id: {assignmentId}</Title>
            <Row gutter={[16, 16]}>
                {students.map((student) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={student.studentId}>
                        <StudentsAssignmentCard student={student} />
                    </Col>
                ))}
            </Row>
            {students.length === 0 && (
                <Text type="warning">No Students weren't done this Assignment.</Text>
            )}
        </div>
    )
}

export default AllStudentsPerAssignment;