import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import { getAllAssignmentsMarksByStudentId } from "../../../utils/analyticsService";
import AssignmentsStudentCard from "../TeacherComponents/AssignmentsStudentCard";

const { Text, Title } = Typography;

const StudentAssignments = () => {
    const { subjectId, studentId } = useParams();
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const loadAllAssignmentsByStudentId = async () => {
            try {
                const response = await getAllAssignmentsMarksByStudentId(subjectId, studentId);
                setAssignments(response);
            } catch(error) {
                console.error("Error loading Assignments: ", error);
            }
        };
        if (studentId) {
            loadAllAssignmentsByStudentId();
        }
    }, [studentId, subjectId])

    return (
        <div>
            <Title level={3}>Assignment Marks for Student Id: {studentId}</Title>
            <Row gutter={[16, 16]}>
                {assignments.map((assignment) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={assignment.assignmentId}>
                        <AssignmentsStudentCard assignment={assignment} />
                    </Col>
                ))}
            </Row>
            {assignments.length === 0 && (
                <Text type="warning">No Assignments weren't done by this student.</Text>
            )}
        </div>
    )
}

export default StudentAssignments;
