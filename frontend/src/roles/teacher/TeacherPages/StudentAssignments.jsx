import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, Card, Typography, Button, Table } from 'antd';
import { getAllAssignmentsMarksByStudentId } from "../../../utils/analyticsService";
import AssignmentsStudentCard from "../TeacherComponents/AssignmentsStudentCard";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Text, Title } = Typography;

const StudentAssignments = () => {
    const { subjectId, studentId } = useParams();
    const [assignments, setAssignments] = useState([]);
    const chartRef = useRef();

    useEffect(() => {
        const loadAllAssignmentsByStudentId = async () => {
            try {
                const response = await getAllAssignmentsMarksByStudentId(subjectId, studentId);
                setAssignments(response);
            } catch (error) {
                console.error("Error loading Assignments: ", error);
            }
        };
        if (studentId) {
            loadAllAssignmentsByStudentId();
        }
    }, [studentId, subjectId]);

    const handleExportPdf = async () => {
        const input = chartRef.current;
        if (!input) return;

        const canvas = await html2canvas(input, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pageWidth;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = pdfHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`Student_${studentId}_Assignments.pdf`);
    };

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

    const columns = [
        {
            title: 'Assignment ID',
            dataIndex: 'assignmentId',
            key: 'assignmentId',
        },
        {
            title: 'Assignment Title',
            dataIndex: 'assignmentTitle',
            key: 'assignmentTitle',
        },
        {
            title: 'Marks',
            dataIndex: 'marks',
            key: 'marks',
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={3}>Assignment Marks for Student Id: {studentId}</Title>

            {assignments.length > 0 && (
                <>
                    <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                        <Button type="primary" onClick={handleExportPdf}>
                            Export to PDF
                        </Button>
                    </div>

                    <div ref={chartRef}>
                        <Card
                            title="Assignment Performance Chart"
                            style={{
                                marginBottom: '24px',
                                borderRadius: '12px',
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

                        <Card
                            title="Assignment Details"
                            style={{
                                marginBottom: '24px',
                                borderRadius: '12px',
                            }}
                        >
                            <Table
                                columns={columns}
                                dataSource={assignments}
                                rowKey="assignmentId"
                                pagination={false}
                                style={{ marginBottom: '20px' }}
                            />
                        </Card>
                    </div>
                </>
            )}

            {assignments.length === 0 && (
                <Card style={{ textAlign: 'center', padding: '40px' }}>
                    <Text type="warning" style={{ fontSize: '16px' }}>
                        No assignments were completed by this student.
                    </Text>
                </Card>
            )}
        </div>
    );
};

export default StudentAssignments;