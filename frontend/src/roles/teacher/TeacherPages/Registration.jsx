import React, {  useEffect, useState } from "react";
import {
  Card,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
  InputNumber,
  message,
} from "antd";
import { fetchAllClasses } from "../../../utils/classService";
import { fetchAllSubjects } from "../../../utils/subjectService";
import { teacherRegistration } from "../../../utils/teacherRegistrationService";
// import signalRService from "../../../services/signalRService";
import Swal from "sweetalert2";

const { Option } = Select;
const { TextArea } = Input;

export default function TeacherCourseRegistration() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [grades, setGrades] = useState([]);
  const [subjectNames, setSubjectNames] = useState([]);

  useEffect(() => {
    const loadGrades = async () => {
      try {
        const result = await fetchAllClasses();
        if (result && Array.isArray(result)) {
          const formattedGrades = result
            .filter(
              (cls) => cls && (cls.id || cls.classId || cls.value) && (cls.name || cls.className || cls.label)
            ) // Filter out null/undefined items
            .map((cls) => ({
              value: cls.id || cls.classId || cls.value,
              label: cls.name || cls.className || cls.label,
            }));
          setGrades(formattedGrades);
        }
      } catch (error) {
        console.error("Error loading grades:", error);
        setGrades([]);
      }
    };

    const loadSubject = async () => {
      try {
        const result = await fetchAllSubjects();
        if (result && Array.isArray(result)) {
          const formattedSubjects = result
            .filter(subject => subject && subject.subjectId && subject.name) // Filter out null/undefined items using correct field names
            .map(subject => ({
              value: subject.subjectId,
              label: subject.name
            }));
          setSubjectNames(formattedSubjects);
        }
      } catch (error) {
        console.error('Error loading subjects:', error);
        setSubjectNames([]);
      }
    };

    // Load both grades and subjects
    loadGrades();
    loadSubject();
  }, []);

  const subjectCodes = [
    { value: "MATH001", label: "MATH001" },
    { value: "ENG001", label: "ENG001" },
    { value: "SCI001", label: "SCI001" },
    { value: "HIST001", label: "HIST001" },
    { value: "GEOG001", label: "GEOG001" },
    { value: "PHY001", label: "PHY001" },
    { value: "CHEM001", label: "CHEM001" },
    { value: "BIO001", label: "BIO001" },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Validate required fields
      if (!values.employeeId || !values.firstName || !values.teacherEmail || 
          !values.classIds?.length || !values.subjectIds?.length || 
          !values.subjectCode?.length || !values.numberOfStudents) {
        throw new Error("Please fill in all required fields");
      }

      // Transform form values to match backend API structure
      const apiPayload = {
        teacherId: parseInt(localStorage.getItem("UserId"), 10) || 0,
        employeeId: values.employeeId.toString(),
        classIds: Array.isArray(values.classIds) ? values.classIds : [],
        subjectIds: Array.isArray(values.subjectIds) ? values.subjectIds : [],
        remarks: values.remarks || "",
        teacherEmail: values.teacherEmail.toString(),
        numberOfStudents: parseInt(values.numberOfStudents, 10) || 0,
        firstName: values.firstName.toString(),
        subjectCode: Array.isArray(values.subjectCode) ? values.subjectCode : []
      };

      console.log("Form values received:", values);
      console.log("API Payload being sent:", apiPayload);
      console.log("Payload validation:", {
        hasEmployeeId: !!apiPayload.employeeId,
        hasFirstName: !!apiPayload.firstName,
        hasTeacherEmail: !!apiPayload.teacherEmail,
        hasClassIds: apiPayload.classIds.length > 0,
        hasSubjectIds: apiPayload.subjectIds.length > 0,
        hasSubjectCode: apiPayload.subjectCode.length > 0,
        hasNumberOfStudents: apiPayload.numberOfStudents > 0
      });

      // Call the actual API
      const response = await teacherRegistration(apiPayload);
      console.log("Registration response:", response);

      // Send SignalR notification
      try {
        await signalRService.sendNotification(
          "ReceiveMessage", 
          {
            user: "Teacher Registration System",
            message: `New teacher registration request from ${apiPayload.firstName} (Employee ID: ${apiPayload.employeeId})`
          }
        );
      } catch (notificationError) {
        console.error("Notification error:", notificationError);
        // Don't fail the whole process if notification fails
      }

      // Show success SweetAlert
      await Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You will be notified after admin approval.",
        confirmButtonText: "OK",
        confirmButtonColor: "#1890ff",
        allowOutsideClick: false,
        allowEscapeKey: false
      });

      // Reset form after successful submission and user clicks OK
      form.resetFields();

    } catch (error) {
      console.error("Registration error:", error);

      // Extract error message
      const errorMessage = error.message || "Something went wrong. Please try again.";

      // Show error SweetAlert
      await Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: errorMessage,
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ff4d4f",
        allowOutsideClick: false,
        allowEscapeKey: false
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl p-6 mx-auto">
      <Card title="Teacher Course Registration" className="shadow-lg">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="p-4"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: "Please enter first name" }]}
            >
              <Input placeholder="Enter first name" />
            </Form.Item>

            <Form.Item
              name="teacherEmail"
              label="Teacher Email"
              rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}
            >
              <Input placeholder="Enter teacher email" />
            </Form.Item>

            <Form.Item 
              name="employeeId" 
              label="Employee ID" 
              rules={[{ required: true, message: "Please enter employee ID" }]}
            >
              <Input placeholder="Enter employee ID" />
            </Form.Item>

            <Form.Item 
              name="classIds" 
              label="Classes" 
              rules={[{ required: true, message: "Please select at least one class" }]}
            >
              <Select 
                mode="multiple" 
                placeholder="Select classes"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {grades.map((grade, index) => (
                  <Option
                    key={`grade-${grade.value || index}`}
                    value={grade.value}
                  >
                    {grade.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="subjectIds"
              label="Subjects"
              rules={[{ required: true, message: "Please select at least one subject" }]}
            >
              <Select 
                mode="multiple" 
                placeholder="Select subjects"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {subjectNames.map((subject) => (
                  <Option key={subject.value} value={subject.value}>
                    {subject.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="subjectCode"
              label="Subject Codes"
              rules={[{ required: true, message: "Please select at least one subject code" }]}
            >
              <Select 
                mode="multiple" 
                placeholder="Select subject codes"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {subjectCodes.map((code) => (
                  <Option key={code.value} value={code.value}>
                    {code.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="numberOfStudents"
              label="Number of Students"
              rules={[{ required: true, message: "Please enter number of students" }]}
            >
              <InputNumber
                min={1}
                max={200}
                placeholder="Number of students"
                className="w-full"
              />
            </Form.Item>
          </div>

          <Form.Item name="remarks" label="Remarks">
            <TextArea 
              rows={4} 
              placeholder="Enter any additional remarks or notes" 
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Register Course
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}