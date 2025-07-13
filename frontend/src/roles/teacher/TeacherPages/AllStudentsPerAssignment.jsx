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

    // Histogram component for student marks distribution
    const MarksHistogram = ({ data }) => {
        // Create bins for marks (0-10, 11-20, 21-30, etc.)
        const createBins = (students) => {
            const bins = {};
            const binSize = 10;
            
            // Initialize bins
            for (let i = 0; i <= 100; i += binSize) {
                const binLabel = `${i}-${i + binSize - 1}`;
                bins[binLabel] = 0;
            }
            
            // Count students in each bin
            students.forEach(student => {
                const mark = parseInt(student.marks);
                const binIndex = Math.floor(mark / binSize) * binSize;
                const binLabel = `${binIndex}-${binIndex + binSize - 1}`;
                if (bins[binLabel] !== undefined) {
                    bins[binLabel]++;
                }
            });
            
            return Object.entries(bins).map(([range, count]) => ({
                range,
                count,
                startValue: parseInt(range.split('-')[0])
            })).filter(bin => bin.count > 0); // Only show bins with data
        };
        
        const binData = createBins(data);
        const maxCount = Math.max(...binData.map(bin => bin.count));
        const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#fa8c16', '#13c2c2', '#eb2f96'];
        
        return (
            <div style={{ padding: '20px', backgroundColor: '#fff' }}>
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'end', 
                    justifyContent: 'space-around',
                    height: '300px',
                    borderBottom: '2px solid #d9d9d9',
                    borderLeft: '2px solid #d9d9d9',
                    position: 'relative',
                    gap: '5px'
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
                        <span>{maxCount}</span>
                        <span>{Math.round(maxCount * 0.75)}</span>
                        <span>{Math.round(maxCount * 0.5)}</span>
                        <span>{Math.round(maxCount * 0.25)}</span>
                        <span>0</span>
                    </div>
                    
                    {binData.map((bin, index) => (
                        <div key={bin.range} style={{ 
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
                                {bin.count}
                            </div>
                            <div
                                style={{
                                    width: '50px',
                                    height: `${maxCount > 0 ? (bin.count / maxCount) * 100 : 0}%`,
                                    backgroundColor: colors[index % colors.length],
                                    borderRadius: '4px 4px 0 0',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    border: '1px solid #d9d9d9'
                                }}
                                title={`Marks ${bin.range}: ${bin.count} students`}
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
                    {binData.map((bin) => (
                        <div key={bin.range} style={{ 
                            width: '60px',
                            textAlign: 'center'
                        }}>
                            {bin.range}
                        </div>
                    ))}
                </div>
                
                {/* Statistics */}
                <div style={{
                    marginTop: '20px',
                    padding: '10px',
                    backgroundColor: '#f5f5f5',
                    borderRadius: '8px',
                    fontSize: '14px'
                }}>
                    <Row gutter={[16, 8]}>
                        <Col span={6}>
                            <Text strong>Total Students: </Text>
                            <Text>{data.length}</Text>
                        </Col>
                        <Col span={6}>
                            <Text strong>Average: </Text>
                            <Text>{data.length > 0 ? (data.reduce((sum, student) => sum + parseInt(student.marks), 0) / data.length).toFixed(1) : 0}</Text>
                        </Col>
                        <Col span={6}>
                            <Text strong>Highest: </Text>
                            <Text>{data.length > 0 ? Math.max(...data.map(s => parseInt(s.marks))) : 0}</Text>
                        </Col>
                        <Col span={6}>
                            <Text strong>Lowest: </Text>
                            <Text>{data.length > 0 ? Math.min(...data.map(s => parseInt(s.marks))) : 0}</Text>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Students and their marks for Assignment Id: {assignmentId}</Title>
            
            {students.length > 0 && (
                <Card 
                    title="Student Marks Distribution" 
                    style={{ 
                        marginBottom: '24px',
                        borderRadius: '12px',
                        // boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <MarksHistogram data={students} />
                    <div style={{ 
                        textAlign: 'center', 
                        marginTop: '20px',
                        fontSize: '14px',
                        color: '#595959'
                    }}>
                        <Text strong>Marks Range</Text> vs <Text strong>Number of Students</Text>
                    </div>
                </Card>
            )}
            
            <Title level={4} style={{ marginBottom: '16px' }}>Student Details</Title>
            <Row gutter={[16, 16]}>
                {students.map((student) => (
                    <Col xs={24} sm={12} md={8} lg={6} key={student.studentId}>
                        <StudentsAssignmentCard student={student} />
                    </Col>
                ))}
            </Row>
            {students.length === 0 && (
                <Card style={{ textAlign: 'center', padding: '40px' }}>
                    <Text type="warning" style={{ fontSize: '16px' }}>
                        No students have completed this assignment.
                    </Text>
                </Card>
            )}
        </div>
    )
}

export default AllStudentsPerAssignment;