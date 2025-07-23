import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, Space } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const EditClassPopup = ({ classData, setShowEditPopup, onClassUpdated }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize form with existing class data
  useEffect(() => {
    if (classData) {
      form.setFieldsValue({
        name: classData.name,
        code: classData.code,
        description: classData.description,
        credit: classData.credit
      });
    }
  }, [classData, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      const updatedClassData = {
        ...classData,
        ...values,
        id: classData.id,
        classId: classData.classId || classData.id
      };

      await onClassUpdated(updatedClassData);
    } catch (error) {
      console.error("Error in EditClassPopup:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    setShowEditPopup(false);
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <EditOutlined />
          <span>Edit Class - {classData?.name || 'Unknown Class'}</span>
        </div>
      }
      open={true}
      onCancel={handleCancel}
      footer={null}
      width={600}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        style={{ marginTop: '20px' }}
      >
        <Form.Item
          label="Class Name"
          name="name"
          rules={[
            { required: true, message: 'Please enter class name' },
            { min: 2, message: 'Class name must be at least 2 characters' },
            { max: 100, message: 'Class name cannot exceed 100 characters' }
          ]}
        >
          <Input 
            placeholder="Enter class name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          label="Class Code"
          name="code"
          rules={[
            { required: true, message: 'Please enter class code' },
            { min: 2, message: 'Class code must be at least 2 characters' },
            { max: 20, message: 'Class code cannot exceed 20 characters' }
          ]}
        >
          <Input 
            placeholder="Enter class code (e.g., CS101)"
            size="large"
            style={{ textTransform: 'uppercase' }}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: 'Please enter class description' },
            { min: 10, message: 'Description must be at least 10 characters' },
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <TextArea
            placeholder="Enter class description"
            rows={4}
            size="large"
            showCount
            maxLength={500}
          />
        </Form.Item>

        <Form.Item
          label="Credits"
          name="credit"
          rules={[
            { required: true, message: 'Please enter credit hours' },
            { type: 'number', min: 1, message: 'Credit must be at least 1' },
            { type: 'number', max: 10, message: 'Credit cannot exceed 10' }
          ]}
        >
          <InputNumber
            placeholder="Enter credit hours"
            size="large"
            min={1}
            max={10}
            style={{ width: '100%' }}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0, marginTop: '30px' }}>
          <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
            <Button 
              onClick={handleCancel}
              size="large"
            >
              Cancel
            </Button>
            <Button 
              type="primary" 
              htmlType="submit"
              loading={isLoading}
              size="large"
            >
              Update Class
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EditClassPopup;