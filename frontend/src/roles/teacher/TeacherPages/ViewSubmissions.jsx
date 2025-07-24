import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Table, Typography, Button, InputNumber, message } from "antd";
import { EyeOutlined, CheckOutlined } from "@ant-design/icons";
import { getAllSubmissionsByAssignmentId } from "../../../utils/teacherFileStorage";
import {
  madeSubmissions,
  checkIsMarkAllocation,
  allocateMarksForAssignment
} from "../../../utils/studentSubmissionMarks";
import EditGradingTable from "../TeacherComponents/EditGradingTable";
import GradeSubmissionsTable from "../TeacherComponents/GradeSubmissionsTable";

const { Title } = Typography;

const ViewSubmissions = () => {
  const { subjectId, assignmentId } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [marks, setMarks] = useState({});
  const [loadingIds, setLoadingIds] = useState([]);

  const [isMarksAllocated, setIsMarksAllocated] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const assignmentTitle = queryParams.get("AssignmentTitle");

  useEffect(() => {
    const checkAllocation = async () => {
      try {
        const result = await checkIsMarkAllocation(assignmentId);

        if (result === null) {
          // No mark allocation (404)
          setIsMarksAllocated(false);
        } else {
          setIsMarksAllocated(result.isMarksAllocated ?? false);
        }
      } catch (err) {
        // Unexpected error (network error, 500, etc.)
        console.error("Error while checking mark allocation:", err);
        setIsMarksAllocated(false);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      setLoading(true); // Optional: show loading before starting
      checkAllocation();
      console.log("xnjndsjdjsjdb: ", isMarksAllocated);
    }
  }, [assignmentId]);

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

  const handleMarksChange = (value, submissionId) => {
    setMarks((prev) => ({
      ...prev,
      [submissionId]: value,
    }));
  };

  const handleSubmitMarks = async (submission) => {
    const markValue = marks[submission.submissionId];
    if (markValue == null || markValue < 0) {
      message.warning("Please enter a valid mark.");
      return;
    }

    const requestBody = {
      submissionId: submission.submissionId,
      studentId: submission.studentId,
      subjectId: parseInt(subjectId),
      submissionName: submission.submissionName,
      assignmentTitle,
      assignmentMarks: markValue,
    };

    try {
      setLoadingIds((prev) => [...prev, submission.submissionId]);
      await madeSubmissions(assignmentId, requestBody);
      message.success(`Marks submitted for Student ID ${submission.studentId}`);
    } catch (error) {
      message.error("Failed to submit marks.");
    } finally {
      setLoadingIds((prev) =>
        prev.filter((id) => id !== submission.submissionId)
      );
    }
  };

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
    {
      title: "Give Marks",
      key: "giveMarks",
      render: (_, record) => (
        <div style={{ display: "flex", gap: "8px" }}>
          <InputNumber
            min={0}
            max={100}
            value={marks[record.submissionId]}
            onChange={(value) => handleMarksChange(value, record.submissionId)}
          />
          <Button
            type="primary"
            icon={<CheckOutlined />}
            loading={loadingIds.includes(record.submissionId)}
            onClick={() => handleSubmitMarks(record)}
          >
            Submit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Title level={3}>
        Submissions for "{assignmentTitle}", {isMarksAllocated? "Graded": "Not Graded"}
      </Title>

      {isMarksAllocated ? (
        <EditGradingTable assignmentId={assignmentId} />
      ) : (
        <GradeSubmissionsTable
          submissions={submissions}
          subjectId={subjectId}
          assignmentId={assignmentId}
          assignmentTitle={assignmentTitle}
          setIsMarksAllocated={setIsMarksAllocated}
        />
      )}
    </div>
  );
};

export default ViewSubmissions;
