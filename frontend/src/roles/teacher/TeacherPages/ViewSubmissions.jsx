import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Typography, Button } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { getAllSubmissionsByAssignmentId } from "../../../utils/teacherFileStorage";

const { Title } = Typography;

const ViewSubmissions = () => {
  const { subjectId, assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await getAllSubmissionsByAssignmentId(assignmentId);
        setSubmissions(response);
      } catch (error) {
        console.error("Failed to fetch submissions:", error);
      }
    };

    if (assignmentId && subjectId) {
      fetchSubmissions();
    }
  }, [assignmentId, subjectId]);

  const columns = [
    {
      title: "Student ID",
      dataIndex: "studentId",
      key: "studentId",
    },
    {
      title: "Submission Name",
      dataIndex: "submissionName",
      key: "submissionName",
    },
    {
      title: "Status",
      dataIndex: "submissionStatus",
      key: "submissionStatus",
      render: (status) => (
        <span
          style={{
            color: status === "Overdue" ? "red" : "green",
            fontWeight: 500,
          }}
        >
          {status}
        </span>
      ),
    },
    {
      title: "View Submission",
      key: "viewSubmission",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={() => window.open(record.uploadLink, "_blank")}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>
        Submissions for Assignment ID: {assignmentId} (Subject ID: {subjectId})
      </Title>
      <Table
        dataSource={submissions}
        columns={columns}
        rowKey="submissionId"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default ViewSubmissions;
