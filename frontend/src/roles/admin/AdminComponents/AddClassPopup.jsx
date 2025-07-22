import React, { useState } from 'react'

import { Modal,Form,Input,Button,Typography, message } from 'antd'
import Swal from 'sweetalert2';
import { createClass } from '../../../utils/classService';

const { Title } = Typography;

const AddClassPopup = ({setShowAddClassPopup, onClassAdded}) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const[ formData,setFormData]= useState({
        className: "",
        classCode: "",
        description: "",
        credit: 0,
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

      const handleSubmit = async () => {
        setLoading(true);
        try {
            // Map frontend form data to backend expected format
            const classData = {
                name: formData.className,
                code: formData.classCode,
                description: formData.description,
                credit: parseInt(formData.credit) || 0
            };
            
            const result = await createClass(classData);
            console.log("Class created successfully:", result);
            
            // Map backend response to frontend expected format
            const mappedResult = {
                id: result.classId,
                name: result.name || formData.className,
                code: result.code || formData.classCode,
                description: result.description || formData.description,
                credit: result.grade || parseInt(formData.credit) || 0,
                createdAt: result.createdAt,
                maxStudents: result.maxStudents,
                status: result.status
            };
            
            message.success('Class created successfully');
            form.resetFields();
            setFormData({
                className: "",
                classCode: "",
                description: "",
                credit: 0,
            });
            
            setShowAddClassPopup(false);
            onClassAdded && onClassAdded(mappedResult);
                
        } catch (error) {
            console.error("Error creating class:", error);
            const errorMessage = error.response?.data?.message || error.message || 'There was an error creating the class.';
            message.error("Failed to create class: " + errorMessage);
        } finally {
            setLoading(false);
        }
      }
      

return (
    <>
        <Modal
            open
            title={<Title level={4}>Add Class</Title>}
            onCancel={() => setShowAddClassPopup(false)}
            footer={null}
            maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
            width={600}
            destroyOnClose={true}
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

                <Form.Item
                    label="Credit Hours"
                    name="credit"
                    rules={[{ required: true, message: 'Credit hours is required' }]}
                >
                    <Input 
                        name="credit" 
                        type="number" 
                        min="0" 
                        max="10" 
                        onChange={handleChange} 
                        placeholder="Enter credit hours (e.g., 3)"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
                        {loading ? 'Creating Class...' : 'Add Class'}
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    </>
)
}

export default AddClassPopup
