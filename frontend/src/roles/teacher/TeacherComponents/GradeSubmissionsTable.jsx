import { Table, Input, Button, message, Space } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { madeSubmissions, allocateMarksForAssignment } from "../../../utils/studentSubmissionMarks";
import { useState } from "react";

const GradeSubmissionsTable = ({ submissions, subjectId, assignmentId, assignmentTitle, setIsMarksAllocated }) => {
  const [marks, setMarks] = useState({});
  const [gradingLoading, setGradingLoading] = useState(false);

  const handleSubmit = async (submission) => {
    const val = marks[submission.submissionId];
    if (!val || isNaN(val) || val < 0 || val > 100) {
      return message.error("Enter a valid mark.");
    }

    const payload = {
      submissionId: submission.submissionId,
      studentId: submission.studentId,
      subjectId: parseInt(subjectId),
      submissionName: submission.submissionName,
      assignmentTitle,
      assignmentMarks: parseInt(val),
    };

    try {
      await madeSubmissions(assignmentId, payload);
      message.success("Marks submitted.");
    } catch (err) {
      message.error("Failed to submit marks.");
    }
  };

  const handleMarkAsGraded = async () => {
    try {
      setGradingLoading(true);
      await allocateMarksForAssignment(assignmentId);
      message.success("Assignment marked as graded.");
      setIsMarksAllocated(true); // Notify parent
    } catch (err) {
      message.error("Failed to mark assignment as graded.");
    } finally {
      setGradingLoading(false);
    }
  };

  const columns = [
    { title: "Student ID", dataIndex: "studentId" },
    { title: "Submission Name", dataIndex: "submissionName" },
    {
      title: "Marks",
      render: (_, record) => (
        <Input
          type="number"
          min={0}
          max={100}
          style={{ width: 80 }}
          onChange={(e) => setMarks({ ...marks, [record.submissionId]: e.target.value })}
        />
      ),
    },
    {
      title: "Submit",
      render: (_, record) => (
        <Button icon={<CheckOutlined />} onClick={() => handleSubmit(record)}>
          Submit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={handleMarkAsGraded} loading={gradingLoading}>
          Mark as Graded
        </Button>
      </Space>

      <Table columns={columns} dataSource={submissions} rowKey="submissionId" />
    </div>
  );
};

export default GradeSubmissionsTable;
