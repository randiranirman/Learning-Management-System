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

    // Simple chart component using CSS bars
    const SimpleBarChart = ({ data }) => {
        const maxMarks = Math.max(...data.map(item => item.marks));
        const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#fa8c16'];
        
        return (
            <div style={{ padding: '20px', backgroundColor: '#ffffff' }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'end', 
                    justifyContent: 'space-around',
                    height: '300px',
                    borderBottom: '2px solid #d9d9d9',
                    borderLeft: '2px solid #d9d9d9',
                    position: 'relative'
                }}>
                    {/* Y-axis labels */}
                    <div style={{ 
                        position: 'absolute', 
                        left: '-30px', 
                        top: '0',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        fontSize: '12px',
                        color: '#595959'
                    }}>
                        <span>{maxMarks}</span>
                        <span>{Math.round(maxMarks * 0.75)}</span>
                        <span>{Math.round(maxMarks * 0.5)}</span>
                        <span>{Math.round(maxMarks * 0.25)}</span>
                        <span>0</span>
                    </div>
                    
                    {data.map((item, index) => (
                        <div key={item.assignmentId} style={{ 
                            display: 'flex', 
                            flexDirection: 'column',
                            alignItems: 'center',
                            height: '100%',
                            justifyContent: 'end'
                        }}>
                            <div style={{
                                fontSize: '12px',
                                fontWeight: 'bold',
                                color: '#595959',
                                marginBottom: '5px'
                            }}>
                                {item.marks}
                            </div>
                            <div
                                style={{
                                    width: '40px',
                                    height: `${(item.marks / maxMarks) * 100}%`,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: '4px 4px 0 0',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                                title={`${item.assignmentTitle}: ${item.marks} marks`}
                            />
                        </div>
                    ))}
                </div>
                
                {/* X-axis labels */}
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-around',
                    marginTop: '10px',
                    fontSize: '12px',
                    color: '#595959'
                }}>
                    {data.map((item) => (
                        <div key={item.assignmentId} style={{ 
                            width: '60px',
                            textAlign: 'center',
                            transform: 'rotate(-15deg)',
                            transformOrigin: 'center'
                        }}>
                            {item.assignmentTitle}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Assignment Marks for Student Id: {studentId}</Title>
            
            {assignments.length > 0 && (
                <Card 
                    title="Assignment Performance Chart" 
                    style={{ 
                        marginBottom: '24px',
                        borderRadius: '12px',
                        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <SimpleBarChart data={assignments} />
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '20px',
                        fontSize: '14px',
                        color: '#595959'
                    }}>
                        <Text strong>Assignments</Text> vs <Text strong>Marks</Text>
                    </div>
                </Card>
            )}
            
            <Title level={4} style={{ marginBottom: '16px' }}>Assignment Details</Title>
            <Row gutter={[16, 16]}>
                {assignments.map((assignment) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={assignment.assignmentId}>
                        <AssignmentsStudentCard assignment={assignment} />
                    </Col>
                ))}
            </Row>
            
            {assignments.length === 0 && (
                <Card style={{ textAlign: 'center', padding: '40px' }}>
                    <Text type="warning" style={{ fontSize: '16px' }}>
                        No assignments were completed by this student.
                    </Text>
                </Card>
            )}
        </div>
    )
}

export default StudentAssignments;