import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllAssignmentsBySubjectIdForStudent } from "../../../utils/studentFileStorage";
import { Table, Button, Typography, Space } from "antd";
import { EyeOutlined, FileSearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Title } = Typography;

const StudentAssignment = () => {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAllAssignmentsForSpecificSubject = async () => {
      try {
        const response = await getAllAssignmentsBySubjectIdForStudent(subjectId);
        console.log(response);
        setAssignments(response);
      } catch (error) {
        console.log(`Error while fetching Assignments for subject Id: ${subjectId}`);
        throw error;
      }
    };

    if (subjectId) {
      getAllAssignmentsForSpecificSubject();
    }
  }, [subjectId]);

  const columns = [
    {
      title: "Assignment ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Assignment Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Assignment Due Date",
      dataIndex: "dueTime",
      key: "dueTime",
      render: (dueTime) => dayjs(dueTime).format("YYYY-MM-DD HH:mm"),
    },
    {
      title: "Assignment Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span style={{ color: status === "complete" ? "green" : "orange" }}>
          {status.toUpperCase()}
        </span>
      ),
    },
    {
      title: "View Assignment",
      dataIndex: "uploadLink",
      key: "uploadLink",
      render: (link) => (
        <Button
          type="link"
          href={link}
          target="_blank"
          icon={<EyeOutlined />}
        >
          View
        </Button>
      ),
    },
    {
      title: "View Submission",
      key: "viewSubmission",
      render: (_, record) => (
        <Button
          type="primary"
          icon={<FileSearchOutlined />}
          onClick={() => navigate(`/student/subject/${subjectId}/assignments/submission?assignmentId=${record.id}&dueTime=${record.dueTime}`)}
        >
          View Submission
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <Title level={2}>Assignments for Subject ID: {subjectId}</Title>
      <Table
        columns={columns}
        dataSource={assignments.map((assignment) => ({
          ...assignment,
          key: assignment.id,
        }))}
        bordered
      />
    </div>
  );
};

export default StudentAssignment;