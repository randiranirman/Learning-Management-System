import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select, DatePicker, Space } from "antd";
import {
  UserOutlined,
  CheckCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { fetchAllSubjects } from "../../../utils/subjectService";
import { fetchAllClasses } from "../../../utils/classService";
import { registerStudent } from "../../../utils/studentRegistrationService";

const { Option } = Select;

const StudentRegistration = () => {
  const [form] = Form.useForm();
  const [classOptions, setClassOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await fetchAllClasses();
        setClassOptions(classes || []);

        const subjects = await fetchAllSubjects();
        setSubjectOptions(subjects || []);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const studentId = parseInt(localStorage.getItem("UserId"));

      // Map class name to class ID
      const selectedClass = classOptions.find(
        (cls) => cls.name === values.grade
      );

      // Map subject names to subject IDs
      const selectedSubjectIds = subjectOptions
        .filter((subject) => values.subjects.includes(subject.name))
        .map((subject) => subject.subjectId);

      const studentRegisterData = {
        name: values.studentName,
        studentId: studentId,
        classId: selectedClass?.id,
        subjectIds: selectedSubjectIds,
        indexNumber: values.indexNumber,
      };

      console.log(studentRegisterData)

      const response = await registerStudent(studentRegisterData);
      console.log("Student registered successfully:", response);
      form.resetFields();
    } catch (error) {
      console.log("Registration failed", error);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 800,
          margin: "auto",
          padding: "40px",
          background: "#f7f7f7",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ textAlign: "center", color: "#1890ff", fontWeight: "bold" }}
        >
          Student Registration Form
        </h2>

        <Form
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item
            label="Student Name"
            name="studentName"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Full Name" />
          </Form.Item>

          <Form.Item
            label="New Grade"
            name="grade"
            rules={[{ required: true, message: "Please select your grade!" }]}
          >
            <Select placeholder="Select Grade" allowClear>
              {classOptions.map((cls) => (
                <Option key={cls.id} value={cls.name}>
                  {cls.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Subjects"
            name="subjects"
            rules={[{ required: true, message: "Please select subjects!" }]}
          >
            <Select mode="multiple" placeholder="Select Subjects" allowClear>
              {subjectOptions.map((subject) => (
                <Option key={subject.subjectId} value={subject.name}>
                  {subject.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              { required: true, message: "Please select your date of birth!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            label="Index Number"
            name="indexNumber"
            rules={[
              { required: true, message: "Please enter index number!" },
            ]}
          >
            <Input placeholder="Enter your index number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter your address!" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your address" />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space size="large">
              <Button
                type="default"
                icon={<EditOutlined />}
                style={{ width: "100px" }}
              >
                Edit
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                icon={<CheckCircleOutlined />}
                style={{ width: "100px" }}
              >
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default StudentRegistration;
