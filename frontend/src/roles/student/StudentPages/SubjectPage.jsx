import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Card, Row, Col, Spin, Alert } from 'antd';
import { BookOutlined } from '@ant-design/icons';
import { getStudentRegistrations } from '../../../utils/studentRegistrationService';

const SubjectPage = () => {
  const { subjectId } = useParams(); // Get the subjectId from the URL
  const location = useLocation(); // Get the navigation state
  const { course } = location.state || {}; // Extract the course object from state
  
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  // Fallback subject data if course is not available
  const defaultSubject = {
    title: 'Unknown Subject',
    grade: 'Grade Unknown',
    icon: <BookOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
    gradient: 'linear-gradient(135deg, #F7F3FF 0%, #EDE7FF 100%)',
    category: 'General'
  };

  // Use course from state or fallback to default
  const subject = course || defaultSubject;
  
  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const studentId = parseInt(localStorage.getItem("UserId"));
        const registrations = await getStudentRegistrations(studentId);
        setStudentData(registrations);
        console.log('Student registration data:', registrations);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to load additional subject information');
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [subjectId]);

  return (
    <div style={{ padding: '40px 20px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Row justify="center">
        <Col span={24} md={12}>
          {/* Card displaying subject header */}
          <Card
            style={{
              background: subject.gradient,
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              marginBottom: '20px',
            }}
          >
            <div style={{ position: 'relative' }}>
              {/* Icon */}
              <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: '2' }}>
                {subject.icon}
              </div>

              {/* Title */}
              <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#fff', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
                {subject.title}
              </h2>

              {/* Grade */}
              <p style={{ fontSize: '14px', fontWeight: '500', color: '#fff' }}>
                {subject.grade}
              </p>

              {/* Category */}
              <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.8)', textTransform: 'uppercase' }}>
                {subject.category}
              </p>
            </div>
          </Card>

          {/* Subject Content */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600' }}>Subject Details</h3>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <Spin size="large" />
                <p style={{ marginTop: '16px', color: '#666' }}>Loading subject information...</p>
              </div>
            ) : error ? (
              <Alert
                message="Error"
                description={error}
                type="error"
                style={{ marginBottom: '16px' }}
              />
            ) : null}
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
              <Card size="small" title="Basic Information" style={{ borderRadius: '8px' }}>
                <p><strong>Subject ID:</strong> {subjectId}</p>
                <p><strong>Subject Name:</strong> {subject.title}</p>
                <p><strong>Category:</strong> {subject.category}</p>
                <p><strong>Grade Level:</strong> {subject.grade}</p>
              </Card>
              
              <Card size="small" title="Academic Progress" style={{ borderRadius: '8px' }}>
                <p><strong>Status:</strong> <span style={{ color: '#52c41a' }}>Active</span></p>
                <p><strong>Enrollment Date:</strong> {studentData?.createdAt ? new Date(studentData.createdAt).toLocaleDateString() : 'N/A'}</p>
                <p><strong>Class:</strong> {studentData?.className || 'Not Available'}</p>
                <p><strong>Index Number:</strong> {studentData?.indexNumber || 'N/A'}</p>
              </Card>
            </div>
            
            <Card size="small" title="Subject Resources" style={{ borderRadius: '8px' }}>
              <ul style={{ fontSize: '16px', color: '#555', marginBottom: 0 }}>
                <li> Course Materials and Lectures</li>
                <li> Assignments and Projects</li>
                <li>📊 Grades and Performance Analytics</li>
                <li>💬 Discussion Forums</li>
                <li>📅 Class Schedule and Announcements</li>
              </ul>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubjectPage;