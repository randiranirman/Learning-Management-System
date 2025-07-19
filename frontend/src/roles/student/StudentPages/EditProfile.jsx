import React, { useState } from "react";
import { editStudentDetails } from "../../../utils/studentService";
import { Modal, Form, Input, Button, Row, Col } from "antd";
import Swal from "sweetalert2";

const EditProfile = ({ setShowEditProfile, studentDetails, onUpdate }) => {
  const [form] = Form.useForm();

  const [updatedDetails, setUpdatedDetails] = useState({
    firstName: studentDetails?.firstName || "",
    lastName: studentDetails?.lastName || "",
    email: studentDetails?.email || "",
    address: studentDetails?.address || "",
    contactNumber: studentDetails?.contactNumber || "",
    city: studentDetails?.city || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedDetails({ ...updatedDetails, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const result = await editStudentDetails(updatedDetails);
      await Swal.fire({
        title: 'Success!',
        text: 'Details updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      
      // Update parent component state
      if (onUpdate) {
        onUpdate(updatedDetails);
      }
      
      setShowEditProfile(false);
    } catch (error) {
      console.error(error, "Error updating details");
      await Swal.fire({
        title: 'Error!',
        text: 'Failed to update details. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  };

  return (
    <Modal
      open
      title="Edit Profile"
      onCancel={() => setShowEditProfile(false)}
      footer={null}
      centered
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
        initialValues={updatedDetails}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="First Name" name="firstName">
              <Input name="firstName" onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Last Name" name="lastName">
              <Input name="lastName" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="Email" name="email">
          <Input name="email" type="email" onChange={handleChange} />
        </Form.Item>

        <Form.Item label="Address" name="address">
          <Input name="address" onChange={handleChange} />
        </Form.Item>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="Contact Number" name="contactNumber">
              <Input name="contactNumber" onChange={handleChange} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="City" name="city">
              <Input name="city" onChange={handleChange} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditProfile;
