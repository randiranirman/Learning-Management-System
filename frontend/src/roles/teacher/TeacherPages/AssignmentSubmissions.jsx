import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Button, Space, Typography } from "antd";
import { EyeOutlined, FileSearchOutlined } from "@ant-design/icons";
import { getAssignmentsBySubjectId } from "../../../utils/teacherFileStorage";

const { Title } = Typography;

const AssignmentSubmissions = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getAssignmentsBySubjectId(subjectId);
        setAssignments(response);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
      }
    };

    if (subjectId) {
      fetchAssignments();
    }
  }, [subjectId]);

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
        <span style={{ color: status === "complete" ? "green" : "red" }}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: "View Assignment",
      key: "viewAssignment",
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
    {
      title: "View Submissions",
      key: "viewSubmissions",
      render: (_, record) => (
        <Button
          type="link"
          icon={<FileSearchOutlined />}
          onClick={() =>
            navigate(`/teacher/subject/${subjectId}/view-submissions/${record.id}`)
          }
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>Assignment Submissions for Subject ID: {subjectId}</Title>
      <Table
        dataSource={assignments}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default AssignmentSubmissions;