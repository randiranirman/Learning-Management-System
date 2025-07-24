import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllAssignmentsWithSubmissionBySubjectId } from "../../../utils/analyticsService";
import { Row, Typography, Button, Card, Table } from 'antd';
import DropdownNavigation from "../TeacherComponents/DropdownNavigation";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EyeOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

const AssignmentsSubject = () => {
  const { subjectId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const navigate = useNavigate();
  const exportRef = useRef();

  useEffect(() => {
    const loadAssignments = async () => {
      try {
        const response = await getAllAssignmentsWithSubmissionBySubjectId(subjectId);
        setAssignments(response);
      } catch (error) {
        console.error(`Error loading assignments for subject ID: ${subjectId}`, error);
      }
    };

    if (subjectId) {
      loadAssignments();
    }
  }, [subjectId]);

  const handleViewAnalytics = (assignmentId) => {
    navigate(`/teacher/analytics/assignments/${subjectId}/${assignmentId}`);
  };

  const handleExportPdf = async () => {
    const input = exportRef.current;
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');

    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pdfHeight);
    pdf.save(`Subject_${subjectId}_Assignments.pdf`);
  };

  const columns = [
    {
      title: "Assignment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Assignment Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Text type={status === "complete" ? "success" : "warning"}>{status}</Text>
      ),
    },
    {
      title: "No. of Submissions",
      dataIndex: "noOfSubmissions",
      key: "noOfSubmissions",
    },
    {
      title: "View Analytics",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          type="primary"
          onClick={() => handleViewAnalytics(record.id)}
        >
          View
        </Button>
      ),
    },
  ];

  const SubmissionsChart = ({ data }) => {
    const maxSubmissions = Math.max(...data.map(item => item.noOfSubmissions));
    const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1', '#fa8c16'];

    return (
      <div style={{ padding: '20px', backgroundColor: '#fff' }}>
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
            <span>{maxSubmissions}</span>
            <span>{Math.round(maxSubmissions * 0.75)}</span>
            <span>{Math.round(maxSubmissions * 0.5)}</span>
            <span>{Math.round(maxSubmissions * 0.25)}</span>
            <span>0</span>
          </div>

          {data.map((item, index) => (
            <div key={item.id} style={{
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
                {item.noOfSubmissions}
              </div>
              <div
                style={{
                  width: '40px',
                  height: `${maxSubmissions > 0 ? (item.noOfSubmissions / maxSubmissions) * 100 : 0}%`,
                  backgroundColor: colors[index % colors.length],
                  borderRadius: '4px 4px 0 0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                title={`${item.title}: ${item.noOfSubmissions} submissions`}
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
            <div key={item.id} style={{
              width: '60px',
              textAlign: 'center',
              transform: 'rotate(-15deg)',
              transformOrigin: 'center'
            }}>
              {item.title}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '24px', backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <DropdownNavigation subjectTitle="Science" subjectGrade={10} />

      <div style={{ marginBottom: '20px', textAlign: 'right' }}>
        <Button type="primary" onClick={handleExportPdf}>
          Export to PDF
        </Button>
      </div>

      <div ref={exportRef}>
        <Title level={3}>Assignments for Subject ID: {subjectId}</Title>

        {assignments.length > 0 && (
          <>
            <Card
              title="Assignment Submissions Chart"
              style={{ marginBottom: '24px', borderRadius: '12px' }}
            >
              <SubmissionsChart data={assignments} />
              <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Text strong>Assignments</Text> vs <Text strong>No. of Submissions</Text>
              </div>
            </Card>

            <Card
              title="Assignment Details Table"
              style={{ marginBottom: '24px', borderRadius: '12px' }}
            >
              <Table
                columns={columns}
                dataSource={assignments}
                rowKey="id"
                pagination={{ pageSize: 5 }}
              />
            </Card>
          </>
        )}

        {assignments.length === 0 && (
          <Card style={{ textAlign: 'center', padding: '40px' }}>
            <Text type="warning" style={{ fontSize: '16px' }}>
              No assignments were made for this subject.
            </Text>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AssignmentsSubject;
