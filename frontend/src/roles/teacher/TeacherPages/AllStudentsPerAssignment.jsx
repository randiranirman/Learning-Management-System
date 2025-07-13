import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { getAllStudentsThatMadeSubmissionByAssignmentId } from "../../../utils/analyticsService";
import StudentsAssignmentCard from "../TeacherComponents/StudentsAssignmentCard";
import { Row, Col, Card, Typography, Button } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const { Text, Title } = Typography;

const AllStudentsPerAssignment = () => {
    const { subjectId, assignmentId } = useParams();
    const [students, setStudents] = useState([]);
    const exportRef = useRef();

    useEffect(() => {
        const loadAllStudentsThatMadeSubmissionsForAssignment = async () => {
            try {
                const response = await getAllStudentsThatMadeSubmissionByAssignmentId(assignmentId);
                setStudents(response);
            } catch (error) {
                console.log(`Error while loading students for assignment Id: ${assignmentId}`, error);
            }
        };
        if (assignmentId) {
            loadAllStudentsThatMadeSubmissionsForAssignment();
        }
    }, [subjectId, assignmentId]);

    const handleExportPdf = async () => {
        const input = exportRef.current;
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

        pdf.save(`Assignment_${assignmentId}_Student_Marks.pdf`);
    };

    const MarksHistogram = ({ data }) => {
        const createBins = (students) => {
            const bins = {};
            const binSize = 10;
            for (let i = 0; i <= 100; i += binSize) {
                const binLabel = `${i}-${i + binSize - 1}`;
                bins[binLabel] = 0;
            }

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
            })).filter(bin => bin.count > 0);
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
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <Button type="primary" onClick={handleExportPdf}>
                    Export to PDF
                </Button>
            </div>

            <div ref={exportRef}>
                <Title level={3}>Students and their marks for Assignment Id: {assignmentId}</Title>

                {students.length > 0 && (
                    <Card
                        title="Student Marks Distribution"
                        style={{
                            marginBottom: '24px',
                            borderRadius: '12px',
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
        </div>
    );
};

export default AllStudentsPerAssignment;
