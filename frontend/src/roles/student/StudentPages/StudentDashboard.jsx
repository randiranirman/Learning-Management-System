
import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import {
  BookOutlined,
  DesktopOutlined,
  HistoryOutlined,
  CalculatorOutlined,
  TranslationOutlined,
  ExperimentOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  HeartOutlined
} from '@ant-design/icons';

const StudentDashboard = () => {
  const [visibleCards, setVisibleCards] = useState([]);

  const courses = [
    {
      id: 1,
      title: 'Sinhala',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <BookOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0
    },
    {
      id: 2,
      title: 'Information Communication Technology',
      grade: 'Grade 10 - Information an...',
      category: 'ICT category',
      icon: <DesktopOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      delay: 200
    },
    {
      id: 3,
      title: 'History',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <HistoryOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
      delay: 400
    },
    {
      id: 4,
      title: 'Mathematics',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <CalculatorOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
      delay: 600
    },
    {
      id: 5,
      title: 'English',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <TranslationOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
      delay: 800
    },
    {
      id: 6,
      title: 'Science',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <ExperimentOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      delay: 1000
    },
    {
      id: 7,
      title: 'Commerce',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
      delay: 1200
    },
    {
      id: 8,
      title: 'Drama',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <CustomerServiceOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #fad0c4 0%, #ffd1ff 100%)',
      delay: 1400
    },
    {
      id: 9,
      title: 'Buddhism',
      grade: 'Grade 10 - Sinhala',
      category: 'Arts category',
      icon: <HeartOutlined style={{ fontSize: '24px', color: 'white' }} />,
      gradient: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%)',
      delay: 1600
    }
  ];

  useEffect(() => {
    courses.forEach((course, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, course.id]);
      }, course.delay);
    });
  }, []);

  const handleCardClick = (course) => {
    // Using native alert as SweetAlert2 is not available in this environment
    // In a real project, you would use: Swal.fire({...})
    alert(`Opening ${course.title} course!`);
  };

  const cardStyle = (course) => ({
    background: course.gradient,
    border: 'none',
    borderRadius: '16px',
    height: '160px',
    cursor: 'pointer',
    transform: visibleCards.includes(course.id) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
    opacity: visibleCards.includes(course.id) ? 1 : 0,
    transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: visibleCards.includes(course.id) ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 15px rgba(0,0,0,0.08)',
    position: 'relative',
    overflow: 'hidden'
  });

  const cardBodyStyle = {
    padding: '20px',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    zIndex: 2
  };

  const titleStyle = {
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    textShadow: '0 2px 4px rgba(0,0,0,0.2)'
  };

  const gradeStyle = {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '12px',
    marginBottom: '4px',
    fontWeight: '500'
  };

  const categoryStyle = {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px'
  };

  const iconContainerStyle = {
    position: 'absolute',
    top: '16px',
    right: '16px',
    zIndex: 3
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.1)',
    zIndex: 1
  };

  return (
    <div style={{ 
      padding: '40px 20px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <div style={{ 
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <h1 style={{
          fontSize: '32px',
          fontWeight: '700',
          marginBottom: '40px',
          color: '#2c3e50',
          textAlign: 'left'
        }}>
          MY COURSES
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          padding: '0'
        }}>
          {courses.map((course) => (
            <Card
              key={course.id}
              style={cardStyle(course)}
              bodyStyle={cardBodyStyle}
              onClick={() => handleCardClick(course)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = visibleCards.includes(course.id) ? 'translateY(-8px) scale(1.02)' : 'translateY(30px) scale(0.9)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = visibleCards.includes(course.id) ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)';
                e.currentTarget.style.boxShadow = visibleCards.includes(course.id) ? '0 8px 30px rgba(0,0,0,0.12)' : '0 4px 15px rgba(0,0,0,0.08)';
              }}
            >
              <div style={overlayStyle}></div>
              <div style={iconContainerStyle}>
                {course.icon}
              </div>
              <div>
                <h3 style={titleStyle}>{course.title}</h3>
                <p style={gradeStyle}>{course.grade}</p>
                <p style={categoryStyle}>{course.category}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};


export default StudentDashboard;
