import React from 'react';
import { useParams } from 'react-router-dom';
import { Card, Row, Col } from 'antd';
import {
  BookOutlined,
  DesktopOutlined,
  HistoryOutlined,
  CalculatorOutlined,
  TranslationOutlined,
  ExperimentOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
} from '@ant-design/icons';

const SubjectPage = () => {
  const { subjectId } = useParams(); // Get the subjectId from the URL

  // Sample subject data for all 9 subjects
  const subjects = {
    1: { title: 'Sinhala', grade: 'Grade 10 - Sinhala', icon: <BookOutlined />, gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    2: { title: 'Information Communication Technology', grade: 'Grade 10 - ICT',  icon: <DesktopOutlined />, gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    3: { title: 'History', grade: 'Grade 10 - History',  icon: <HistoryOutlined />, gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    4: { title: 'Mathematics', grade: 'Grade 10 - Math',  icon: <CalculatorOutlined />, gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    5: { title: 'English', grade: 'Grade 10 - English',  icon: <TranslationOutlined />, gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
    6: { title: 'Science', grade: 'Grade 10 - Science',  icon: <ExperimentOutlined />, gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)' },
    7: { title: 'Commerce', grade: 'Grade 10 - Commerce',  icon: <ShoppingOutlined />, gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
    8: { title: 'Drama', grade: 'Grade 10 - Drama',  icon: <CustomerServiceOutlined />, gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)' },
    9: { title: 'Buddhism', grade: 'Grade 10 - Buddhism',  icon: <HeartOutlined />, gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)' },
  };

  // Get the subject data based on the subjectId
  const subject = subjects[subjectId] || {};

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

          {/* Subject Content (Add your subject content here) */}
          <div style={{ backgroundColor: '#fff', borderRadius: '16px', padding: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600' }}>Subject Details</h3>
           
            <ul style={{ fontSize: '16px', color: '#555' }}>
              <li>Lectures</li>
              <li>Assignments</li>
              <li>Resources</li>
            </ul>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default SubjectPage;
