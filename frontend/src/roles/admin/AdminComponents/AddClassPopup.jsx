import React, { useState } from 'react'

import { Modal,Form,Input,Button,Typography, message } from 'antd'
import Swal from 'sweetalert2';
import { createClass } from '../../../utils/classService';

const { Title } = Typography;

const AddClassPopup = ({setShowAddClassPopup, onClassAdded}) => {
    const [form] = Form.useForm();
    const[ formData,setFormData]= useState({
        className: "",
        classCode: "",
        description: "",
      });
      const [errors , setErrors]= useState({
        className: "",
        classCode: "",
        description: "",
      });


      const handleChange =(e) => {

            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });
            if (name === "className" && !value) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  className: "Class name is required",
                }));
              } else {
                setErrors((prevErrors) => ({ ...prevErrors, className: "" }));
              }
      
              if (name === "classCode" && !value) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  classCode: "Class code is required",
                }));
              } else {
                setErrors((prevErrors) => ({ ...prevErrors, classCode: "" }));
              }
      
              if (name === "description" && !value) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  description: "Description is required",
                }));
              } else {
                setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
              }
      }

      const handleSubmit   = async () => {
        try {
            const result = await createClass(formData);
            console.log("Class created successfully:", result);
            message.success("Class created successfully");
            form.resetFields();
            await Swal.fire({
                title: 'Success!',
                text: 'Class added successfully',
                icon: 'success',
                confirmButtonText: 'OK',
                });
                setShowAddClassPopup(false);
            onClassAdded && onClassAdded(result);
                
        } catch (error) {
            message.error("Failed to create class" , error.message || error.response?.data || 'There was an error creating the class.');
        }
      }
      

return (
    <>
        <Modal
            open
            title={<Title level={4}>Add Class</Title>}
            onCancel={() => setShowAddClassPopup(false)}
            footer={null}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={handleSubmit}
                initialValues={formData}
            >
                <Form.Item
                    label="Class Name"
                    name="className"
                    validateStatus={errors.className ? "error" : ""}
                    help={errors.className}
                    rules={[{ required: true }]}
                >
                    <Input name="className" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Class Code"
                    name="classCode"
                    validateStatus={errors.classCode ? "error" : ""}
                    help={errors.classCode}
                    rules={[{ required: true }]}
                >
                    <Input name="classCode" onChange={handleChange} />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                    validateStatus={errors.description ? "error" : ""}
                    help={errors.description}
                    rules={[{ required: true }]}
                >
                    <Input name="description" onChange={handleChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Add Class
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
)
}

export default AddClassPopup
