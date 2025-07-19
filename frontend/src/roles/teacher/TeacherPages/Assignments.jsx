import React, { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Modal, Form, Input, DatePicker, Upload, message } from "antd";
import { PlusOutlined, UploadOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";
import { addNewAssignment, getAssignmentsBySubjectId, updateAssignmentById, deleteAssignmentById } from "../../../utils/teacherFileStorage";
import { useParams } from "react-router-dom";

const AssignmentTable = () => {
  const { subjectId } = useParams(); // This must come from the route
  const [assignments, setAssignments] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [form] = Form.useForm();
  const [fileUrl, setFileUrl] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await getAssignmentsBySubjectId(subjectId);
        setAssignments(response);
      } catch (error) {
        console.error("Error fetching assignments:", error);
        message.error("Failed to fetch assignments");
      }
    };

    if (subjectId) {
      fetchAssignments();
    }
  }, [subjectId]);

  const handleEdit = (record) => {
    setIsEditing(true);
    setEditingAssignment(record);
    setFileUrl(record.uploadLink);
    setIsModalVisible(true);
    form.setFieldsValue({
      title: record.title,
      dueTime: dayjs(record.dueTime),
      subjectId: record.subjectId,
      classId: record.classId || 1, // default or extract from record
    });
  };

  const handleDelete = (record) => {
    Modal.confirm({
      title: "Are you sure you want to delete this assignment?",
      content: `Assignment Title: "${record.title}"`,
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await deleteAssignmentById(record.id);
          setAssignments(assignments.filter((item) => item.id !== record.id));
          message.success("Assignment deleted successfully");
        } catch (error) {
          console.error("Error deleting assignment:", error);
          message.error("Failed to delete assignment");
        }
      },
    });
  };

  const handleBackendAddAssignment = async (newAssignment) => {
    try {
      const response = await addNewAssignment(newAssignment);
      const frontendAssignment = {
        id: response.id,
        title: response.title,
        dueTime: response.dueTime,
        status: response.status,
        subjectId: response.subjectId,
        uploadLink: response.uploadLink,
      };
      setAssignments([...assignments, frontendAssignment]);
      message.success("Assignment added successfully");
    } catch (error) {
      console.error("Error adding assignment:", error);
      message.error("Failed to add assignment");
    }
  };

  const handleBackendEditAssignment = async (id, updatedAssignment) => {
    try {
      console.log(
        "Updating assignment with ID:",
        id,
        "Data:",
        updatedAssignment
      );
      const requestBody = {
        assignmentTitle: updatedAssignment.assignmentTitle,
        dueTime: updatedAssignment.dueTime,
        uploadLink: updatedAssignment.uploadLink,
      };
      const response = await updateAssignmentById(id, requestBody);
      console.log("Update response:", response);
      const updatedAssignments = assignments.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedAssignment,
              title: updatedAssignment.assignmentTitle,
            }
          : item
      );
      setAssignments(updatedAssignments);
      message.success("Assignment updated successfully");
    } catch (error) {
      console.error("Error updating assignment:", error);
      message.error("Failed to update assignment");
    }
  };

  const handleAddOrEditAssignment = async () => {
    try {
      const values = await form.validateFields();
      const data = {
        assignmentTitle: values.title,
        dueTime: values.dueTime.toISOString(),
        uploadLink: fileUrl,
      };

      if (isEditing && editingAssignment) {
        await handleBackendEditAssignment(editingAssignment.id, data);
      } else {
        data.classId = parseInt(values.classId);
        data.subjectId = parseInt(values.subjectId);
        await handleBackendAddAssignment(data);
      }

      form.resetFields();
      setFileUrl(null);
      setIsModalVisible(false);
      setIsEditing(false);
      setEditingAssignment(null);
    } catch (error) {
      console.error("Form validation or save failed:", error);
    }
  };

  const props = {
    name: "file",
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }) => {
      const data = new FormData();
      data.append("UPLOADCARE_PUB_KEY", "d437aebdd5cd6018bb4a");
      data.append("UPLOADCARE_STORE", "1");
      data.append("file", file);

      try {
        const res = await axios.post(
          "https://upload.uploadcare.com/base/",
          data
        );
        const cdnUrl = `https://ucarecdn.com/${res.data.file}/`;
        setFileUrl(cdnUrl);
        onSuccess("ok");
        message.success("File uploaded successfully");
      } catch (error) {
        onError(error);
        message.error("File upload failed");
      }
    },
  };

  const columns = [
    { title: "Assignment ID", dataIndex: "id", key: "id" },
    { title: "Assignment Title", dataIndex: "title", key: "title" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "complete" ? "green" : "orange"}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
    { title: "Subject ID", dataIndex: "subjectId", key: "subjectId" },
    {
      title: "Upload Link",
      dataIndex: "uploadLink",
      key: "uploadLink",
      render: (link) => (
        <a href={link} target="_blank" rel="noopener noreferrer">
          View File
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <h2 style={{ margin: 0 }}>Manage Assignments</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsEditing(false);
            setEditingAssignment(null);
            form.resetFields();
            setFileUrl(null);
            setIsModalVisible(true);
          }}
        >
          Add Assignment
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={assignments}
        rowKey="id"
        bordered
        pagination={{ pageSize: 6 }}
      />

      <Modal
        title={isEditing ? "Edit Assignment" : "Add New Assignment"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          setIsEditing(false);
          setEditingAssignment(null);
        }}
        onOk={handleAddOrEditAssignment}
        okText={isEditing ? "Update" : "Add"}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="title"
            label="Assignment Title"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="dueTime"
            label="Due Date"
            rules={[{ required: true }]}
          >
            <DatePicker showTime style={{ width: "100%" }} />
          </Form.Item>
          {!isEditing && (
            <>
              <Form.Item
                name="subjectId"
                label="Subject ID"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name="classId"
                label="Class ID"
                rules={[{ required: true }]}
              >
                <Input type="number" />
              </Form.Item>
            </>
          )}
          <Form.Item label="Upload File">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssignmentTable;
