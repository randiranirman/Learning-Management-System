import { Table, InputNumber, Button, message } from "antd";
import { useEffect, useState } from "react";
import { getAllSubmissionMarksByAssignmentId, editSubmission } from "../../../utils/studentSubmissionMarks";

const EditGradingTable = ({ assignmentId }) => {
  const [data, setData] = useState([]);
  const [editedMarks, setEditedMarks] = useState({});

  useEffect(() => {
    const fetchMarks = async () => {
      try {
        const res = await getAllSubmissionMarksByAssignmentId(assignmentId);
        setData(res);
      } catch (err) {
        message.error("Failed to fetch allocated marks.");
      }
    };
    if (assignmentId){
      fetchMarks();
    }
  }, [assignmentId]);

  const handleMarkChange = (submissionId, value) => {
    setEditedMarks({ ...editedMarks, [submissionId]: value });
  };

  const handleUpdate = async (submissionId) => {
    const newMark = editedMarks[submissionId];
    if (newMark === undefined) return;

    try {
      console.log("request for edit submissions: ", submissionId, newMark);
      const response = await editSubmission(submissionId, newMark);
      message.success("Mark updated.");
    } catch (err) {
      message.error("Failed to update mark.");
    }
  };

  const columns = [
    { title: "Student ID", dataIndex: "studentId" },
    { title: "Submission Name", dataIndex: "submissionName" },
    {
      title: "Marks",
      dataIndex: "assignmentMarks",
      render: (val, record) => (
        <InputNumber
          min={0}
          max={100}
          defaultValue={val}
          onChange={(val) => handleMarkChange(record.submissionId, val)}
        />
      ),
    },
    {
      title: "Update",
      render: (_, record) => (
        <Button onClick={() => handleUpdate(record.submissionId)}>Update</Button>
      ),
    },
  ];

  return <Table columns={columns} dataSource={data} rowKey="submissionId" />;
};

export default EditGradingTable;
