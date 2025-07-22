import { useEffect, useState } from "react";
import { Typography, Card, Button, Modal, Form, Input, Upload, message, Space, Popconfirm, Empty } from "antd";
import { UploadOutlined, EyeOutlined, EditOutlined, DeleteOutlined, FileAddOutlined } from "@ant-design/icons";
import { useParams, useLocation } from "react-router-dom";
import { getSubmissionForStudentAndAssignment, editSubmissionForAssignmentByStudent, deleteSubmissionForAssignmentByStudent, madeSubmissionForAssignmentByStudent } from "../../../utils/studentFileStorage";
import { uploadToUploadCare } from "../../../utils/uploadcareService";

const { Title, Text } = Typography;

const AssignmentSubmission = () => {
  const { subjectId } = useParams();
  const location = useLocation();
  const assignmentId = parseInt(new URLSearchParams(location.search).get("assignmentId"));
  const assignmentDueTime = new URLSearchParams(location.search).get("dueTime");

  const studentId = parseInt(localStorage.getItem("UserId"));

  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchSubmission = async () => {
      try {
        const response = await getSubmissionForStudentAndAssignment(studentId, assignmentId);
        setSubmission(response);
      } catch (error) {
        console.log("No submission found.");
        setSubmission(null);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId && studentId) {
      fetchSubmission();
    }
  }, [assignmentId, studentId]);

  const handleFileUpload = async (info) => {
    const file = info.file;
    const cdnLink = await uploadToUploadCare(file);
    form.setFieldsValue({ uploadLink: cdnLink });
    message.success("File uploaded successfully!");
  };

  const handleEdit = () => {
    console.log("Editing submission:", form);
    form.setFieldsValue({
      submissionName: submission.submissionName,
      uploadLink: submission.uploadLink,
    });
    setIsEdit(true);
    setFormVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteSubmissionForAssignmentByStudent(submission.id);
      message.success("Submission deleted");
      setSubmission(null);
    } catch (err) {
      message.error("Failed to delete submission");
    }
  };

  const handleSubmit = async () => {
    try {
      const values = form.getFieldsValue();
      if (!values.uploadLink) {
        message.error("Please upload a file.");
        return;
      }

      if (isEdit) {
        await editSubmissionForAssignmentByStudent(submission.id, {
          submissionName: values.submissionName,
          uploadLink: values.uploadLink,
        });
        message.success("Submission updated!");
      } else {
        await madeSubmissionForAssignmentByStudent({
          submissionName: values.submissionName,
          uploadLink: values.uploadLink,
          assignmentId,
          studentId,
          assignmentDueTime,
        });
        message.success("Submission created!");
      }

      // Refresh submission
      const updated = await getSubmissionForStudentAndAssignment(studentId, assignmentId);
      setSubmission(updated);
      setFormVisible(false);
      form.resetFields();
    } catch (err) {
      console.error(err);
      message.error("Submission failed");
    }
  };

  return (
    <div style={{ padding: "40px 20px", backgroundColor: "#fff", minHeight: "100vh" }}>
      <Title level={2}>Assignment Submission</Title>

      {loading ? (
        <p>Loading...</p>
      ) : submission ? (
        <Card bordered style={{ maxWidth: 600 }}>
          <Space direction="vertical" size="middle">
            <Text><strong>Submission Name:</strong> {submission.submissionName}</Text>
            <Text><strong>Status:</strong> {submission.status}</Text>
            <Text><strong>Submitted Time:</strong> {new Date(submission.submitedTime).toLocaleString()}</Text>
            <Button
              type="link"
              href={submission.uploadLink}
              target="_blank"
              icon={<EyeOutlined />}
            >
              View Submitted File
            </Button>
            <Space>
              <Button icon={<EditOutlined />} onClick={handleEdit}>
                Edit Submission
              </Button>
              <Popconfirm
                title="Are you sure you want to delete this submission?"
                onConfirm={handleDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          </Space>
        </Card>
      ) : (
        <Empty
          description="No submission made yet"
        >
          <Button
            type="primary"
            icon={<FileAddOutlined />}
            onClick={() => {
              setIsEdit(false);
              setFormVisible(true);
              form.resetFields();
            }}
          >
            Submit Assignment
          </Button>
        </Empty>
      )}

      <Modal
        title={isEdit ? "Edit Submission" : "Submit Assignment"}
        open={formVisible}
        onCancel={() => setFormVisible(false)}
        onOk={handleSubmit}
        okText={isEdit ? "Update" : "Submit"}
        destroyOnClose
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="submissionName"
            label="Submission Name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            <Input placeholder="Enter submission name" />
          </Form.Item>
          <Form.Item
            name="uploadLink"
            label="Upload File"
            rules={[{ required: true, message: "Please upload a file" }]}
          >
            <Upload
              maxCount={1}
              beforeUpload={() => false}
              onChange={handleFileUpload}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssignmentSubmission;