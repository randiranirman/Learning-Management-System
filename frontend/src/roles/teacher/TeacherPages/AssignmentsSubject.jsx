import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAssignmentsWithSubmissionBySubjectId } from "../../../utils/analyticsService";
import AssignmentsSubjectCard from "../TeacherComponents/AssignmentsSubjectCard";
import { Row, Col, Card, Typography, Avatar, Space } from 'antd';
import DropdownNavigation from "../TeacherComponents/DropdownNavigation";

const { Text, Title } = Typography;

const AssignmentsSubject = () => {
    const { subjectId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const navigate = useNavigate();

    const handleSelectedAssignment = (assignmentId) => {
        navigate(`/teacher/analytics/assignments/${subjectId}/${assignmentId}`);
    }

    useEffect(() => {
        const loadAllAssignmentsWithSubmissions = async () => {
            try {
                const response = await getAllAssignmentsWithSubmissionBySubjectId(subjectId);
                setAssignments(response);
            } catch (error) {
                console.log(`Error while loading assignments subject Id: ${subjectId}`, error);
            }
        }
        if (subjectId) {
            loadAllAssignmentsWithSubmissions();
        }
    }, [subjectId])

    return (
        <div style={{ padding: '24px' }}>
            <DropdownNavigation subjectTitle="Science" subjectGrade={10} />
            <Title level={3}>Assignments for Subject Id: {subjectId}</Title>
            <Row gutter={[16, 16]}>
                {assignments.map((assignment) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={assignment.id}>
                        <AssignmentsSubjectCard assignment={assignment} onClick={() => handleSelectedAssignment(assignment.id)} />
                    </Col>
                ))}
            </Row>
            {assignments.length === 0 && (
                <Text type="warning">No Assignments were made for this Subject</Text>
            )}
        </div>
        
    )
}

export default AssignmentsSubject;