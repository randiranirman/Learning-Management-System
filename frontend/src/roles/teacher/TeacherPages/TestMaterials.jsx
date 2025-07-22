import { use, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Card, Table, Button, Space, Typography, Popconfirm, message, Modal, Form, Input, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { getAllSubjectMaterialsBySubjectId, createMaterial, createSubjectTopic, deleteTopicMaterials, editSubjectTopic, updateTopicMaterials, deleteSubjectTopic } from "../../../utils/teacherFileStorage.js";

const { Title } = Typography;

const TestMaterials = () => {
  const location = useLocation();
  const subjectId = new URLSearchParams(location.search).get("subjectId"); // extract subjectId from URL (as query param)

  const [topics, setTopics] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [form] = Form.useForm();
  const [fileUrl, setFileUrl] = useState(null);
  const [isAddTopicModalOpen, setIsAddTopicModalOpen] = useState(false);
  const [addTopicForm] = Form.useForm();
  const [isEditTopicModalOpen, setIsEditTopicModalOpen] = useState(false);
  const [editTopicForm] = Form.useForm();
  const [editingTopicId, setEditingTopicId] = useState(null);

  const [isEditMaterialModalOpen, setIsEditMaterialModalOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [editMaterialForm] = Form.useForm();

  useEffect(() => {
    fetchData();
  }, [subjectId]);

  useEffect(() => {
    if (isEditMaterialModalOpen) {
      console.log("Edit file URL:", fileUrl);
    }
  }, [fileUrl]);

  const fetchData = async () => {
    try {
      const materials = await getAllSubjectMaterialsBySubjectId(subjectId);
      setTopics(materials);
    } catch (error) {
      console.error("Error fetching materials:", error);
      message.error("Failed to fetch materials.");
    }
  };

  const handleAddTopic = async () => {
    try {
      const values = await addTopicForm.validateFields();
      const newTopic = await createSubjectTopic(subjectId, values.topicName);

      setTopics((prevTopics) => [
        ...prevTopics,
        {
          subjectTopicId: newTopic.id,
          subjectTopicName: newTopic.topicName,
          materials: [],
        },
      ]);

      message.success("Topic added successfully");
      setIsAddTopicModalOpen(false);
      addTopicForm.resetFields();
    } catch (error) {
      console.error("Error adding topic:", error);
      message.error("Failed to add topic");
    }
  };

  const handleEditTopic = (topicId, currentName) => {
    setEditingTopicId(topicId);
    setIsEditTopicModalOpen(true);
    editTopicForm.setFieldsValue({ topicName: currentName });
  };

  const handleUpdateTopic = async () => {
    try {
      const values = await editTopicForm.validateFields();
      const updatedTopic = await editSubjectTopic(
        editingTopicId,
        values.topicName
      );

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.subjectTopicId === editingTopicId
            ? { ...topic, subjectTopicName: values.topicName }
            : topic
        )
      );

      message.success("Topic updated successfully");
      setIsEditTopicModalOpen(false);
      editTopicForm.resetFields();
    } catch (error) {
      console.error("Failed to update topic:", error);
      message.error("Failed to update topic");
    }
  };

  const handleDeleteTopic = async (topicId) => {
  try {
    await deleteSubjectTopic(topicId);
    setTopics((prevTopics) =>
      prevTopics.filter((topic) => topic.subjectTopicId !== topicId)
    );
    message.success("Topic and its materials deleted successfully");
  } catch (error) {
    console.error("Failed to delete topic:", error);
    message.error("Failed to delete topic");
  }
};


  const handleEditMaterial = (material) => {
    setEditingMaterial(material);
    setIsEditMaterialModalOpen(true);
    setFileUrl(material.uploadLink);
    editMaterialForm.setFieldsValue({ newMaterialName: material.savedName });
  };

  const handleEditMaterialSubmit = async () => {
    try {
      const values = await editMaterialForm.validateFields();
      console.log("ok", values);
      if (!fileUrl) {
        message.error("Please upload a file");
        return;
      }

      await updateTopicMaterials(editingMaterial.id, {
        newMaterialName: values.newMaterialName,
        uploadLink: fileUrl,
      });

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.subjectTopicId === editingMaterial.topicId
            ? {
                ...topic,
                materials: topic.materials.map((mat) =>
                  mat.id === editingMaterial.id
                    ? {
                        ...mat,
                        savedName: values.newMaterialName,
                        uploadLink: fileUrl,
                      }
                    : mat
                ),
              }
            : topic
        )
      );

      message.success("Material updated successfully");
      setIsEditMaterialModalOpen(false);
      setEditingMaterial(null);
      editMaterialForm.resetFields();
    } catch (error) {
      console.error("Failed to update material:", error);
      message.error("Failed to update material");
    }
  };

  const handleDeleteMaterial = async (materialId, topicId) => {
    try {
      console.log("Deleting material:", materialId);
      await deleteTopicMaterials(materialId);

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.subjectTopicId === topicId
            ? {
                ...topic,
                materials: topic.materials.filter(
                  (material) => material.id !== materialId
                ),
              }
            : topic
        )
      );

      message.success("Material deleted successfully");
    } catch (error) {
      console.error("Failed to delete material:", error);
      message.error("Failed to delete material");
    }
  };

  const handleAddMaterial = (topicId) => {
    setSelectedTopicId(topicId);
    form.resetFields();
    setFileUrl(null);
    setIsModalOpen(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (!fileUrl) {
        message.error("Please upload a file first");
        return;
      }

      const newMaterial = await createMaterial(selectedTopicId, {
        savedName: values.savedName,
        uploadLink: fileUrl,
      });

      setTopics((prevTopics) =>
        prevTopics.map((topic) =>
          topic.subjectTopicId === selectedTopicId
            ? {
                ...topic,
                materials: [
                  ...topic.materials,
                  {
                    id: newMaterial.materialId,
                    savedName: newMaterial.savedName,
                    uploadLink: newMaterial.uploadLink,
                    topicId: newMaterial.topicId,
                  },
                ],
              }
            : topic
        )
      );

      message.success("Material added successfully");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating material:", error);
      message.error("Failed to add material");
    }
  };

  const uploadProps = {
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

  return (
    <div style={{ padding: "20px" }}>
      <Title level={3}>Subject Materials</Title>
      {topics.map((topic) => (
        <Card
          key={topic.subjectTopicId}
          title={topic.subjectTopicName}
          extra={
            <Space>
              <Button
                icon={<EditOutlined />}
                onClick={() =>
                  handleEditTopic(topic.subjectTopicId, topic.subjectTopicName)
                }
              >
                Edit
              </Button>

              <Popconfirm
                title="Are you sure to delete this topic?"
                onConfirm={() => handleDeleteTopic(topic.subjectTopicId)}
              >
                <Button danger icon={<DeleteOutlined />}>
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          }
          style={{ marginBottom: "24px" }}
        >
          <Table
            dataSource={topic.materials}
            rowKey="id"
            pagination={false}
            columns={[
              {
                title: "ID",
                dataIndex: "id",
              },
              {
                title: "Name",
                dataIndex: "savedName",
              },
              {
                title: "View Material",
                dataIndex: "uploadLink",
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
                title: "Actions",
                render: (_, record) => (
                  <Space>
                    <Button
                      icon={<EditOutlined />}
                      onClick={() => handleEditMaterial(record)}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this material?"
                      onConfirm={() =>
                        handleDeleteMaterial(record.id, topic.subjectTopicId)
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button danger icon={<DeleteOutlined />}>
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />

          <div style={{ marginTop: "16px", textAlign: "right" }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleAddMaterial(topic.subjectTopicId)}
            >
              Add Material
            </Button>
          </div>
        </Card>
      ))}

      {/* Add Material Modal */}
      <Modal
        title="Add New Material"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={() => setIsModalOpen(false)}
        okText="Add"
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="savedName"
            label="Material Name"
            rules={[{ required: true, message: "Please enter material name" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Upload File">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Topic Modal */}
      <Modal
        title="Add New Topic"
        open={isAddTopicModalOpen}
        onOk={handleAddTopic}
        onCancel={() => setIsAddTopicModalOpen(false)}
        okText="Add"
      >
        <Form form={addTopicForm} layout="vertical">
          <Form.Item
            name="topicName"
            label="Topic Name"
            rules={[{ required: true, message: "Please enter topic name" }]}
          >
            <Input placeholder="Enter topic name" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Topic Name"
        open={isEditTopicModalOpen}
        onOk={handleUpdateTopic}
        onCancel={() => {
          setIsEditTopicModalOpen(false);
          editTopicForm.resetFields();
        }}
        okText="Update"
      >
        <Form form={editTopicForm} layout="vertical">
          <Form.Item
            name="topicName"
            label="New Topic Name"
            rules={[
              { required: true, message: "Please enter the new topic name" },
            ]}
          >
            <Input placeholder="Enter new topic name" />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Edit Material"
        open={isEditMaterialModalOpen}
        onOk={handleEditMaterialSubmit}
        onCancel={() => {
          setIsEditMaterialModalOpen(false);
          setEditingMaterial(null);
          editMaterialForm.resetFields();
        }}
        okText="Update"
      >
        <Form layout="vertical" form={editMaterialForm}>
          <Form.Item
            name="newMaterialName"
            label="Material Name"
            rules={[
              { required: true, message: "Please enter new material name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Upload New File">
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      

      <div style={{ position: "relative", bottom: "0", left: "0" }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsAddTopicModalOpen(true)}
        >
          Add Topic
        </Button>
      </div>
    </div>
  );
};

export default TestMaterials;
