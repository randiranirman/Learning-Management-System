import React from 'react';
import { Form, Input, Button, Typography, Modal, message } from 'antd';
import { addSubject } from '../../../utils/subjectService';
import Swal from 'sweetalert2';

const { Title } = Typography;

const AddCoursePopup = ({ setShowCoursePopup, onCourseAdded }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        name: values.name,
        code: values.code,
        description: values.description,
      };

      const response = await addSubject(payload);

      message.success('Subject added successfully');
      
      // Don't show SweetAlert - use Ant Design message which is less intrusive
      form.resetFields();
      setShowCoursePopup(false);
      
      // Pass the complete response data for real-time update
      onCourseAdded && onCourseAdded(response);

    } catch (error) {
      console.error('Error adding subject:', error);
      
      // Show more specific error message
      const errorMessage = error.response?.data?.message || error.message || 'Failed to add subject';
      message.error(errorMessage);
      
      // Only show SweetAlert for critical errors
      if (error.response?.status === 500) {
        Swal.fire({
          title: 'Server Error!',
          text: 'There was a problem with the server. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open
      title={<Title level={4}>Add Subject</Title>}
      onCancel={() => setShowCoursePopup(false)}
      footer={null}
      maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
      width={600}
      destroyOnClose={true}
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
          <Button type="primary" htmlType="submit" block loading={loading} disabled={loading}>
            {loading ? 'Adding Subject...' : 'Add Subject'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCoursePopup;
