import React from 'react';
import { Form, Input, Button, Typography, Modal, message } from 'antd';
import { addSubject } from '../../../utils/subjectService';
import Swal from 'sweetalert2';

const { Title } = Typography;

const AddCoursePopup = ({ setShowCoursePopup, onCourseAdded }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        name: values.name,
        code: values.code,
        description: values.description,
      };

      await addSubject(payload);

      message.success('Subject added successfully');
      Swal.fire({
        title: 'Success!',
        text: 'Subject added successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      form.resetFields();
      setShowCoursePopup(false);
      onCourseAdded && onCourseAdded(payload);

    } catch (error) {
      console.error('Error adding subject:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add subject',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <Modal
      open
      title={<Title level={4}>Add Subject</Title>}
      onCancel={() => setShowCoursePopup(false)}
      footer={null}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          label="Subject Name"
          name="name"
          rules={[{ required: true, message: 'Please enter subject name' }]}
        >
          <Input placeholder="Enter subject name" />
        </Form.Item>

        <Form.Item
          label="Code"
          name="code"
          rules={[{ required: true, message: 'Please enter subject code' }]}
        >
          <Input placeholder="Enter subject code" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter description' }]}
        >
          <Input.TextArea placeholder="Enter subject description" rows={4} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Add Subject
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCoursePopup;
