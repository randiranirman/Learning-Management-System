import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
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
import { fetchAllSubjects } from '../../../utils/subjectService';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [visibleCards, setVisibleCards] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map subject names to icons, gradients, and categories - Light colors matching sidebar theme
  const subjectStyles = {
    maths: {
      icon: <CalculatorOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #E8E2FF 0%, #F5F3FF 100%)',
      category: 'Mathematics'
    },
    string: {
      icon: <TranslationOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #FFF1F0 0%, #FFE7E6 100%)',
      category: 'Programming'
    },
    sinhala: {
      icon: <BookOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%)',
      category: 'Language'
    },
    history: {
      icon: <HistoryOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #F0FFF4 0%, #E6FFFA 100%)',
      category: 'Social Studies'
    },
    english: {
      icon: <TranslationOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #FFF5F5 0%, #FFE7E7 100%)',
      category: 'Language'
    },
    science: {
      icon: <ExperimentOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #F0FFFF 0%, #E6FFFE 100%)',
      category: 'Science'
    },
    commerce: {
      icon: <ShoppingOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #FAF0FF 0%, #F0E6FF 100%)',
      category: 'Business'
    },
    drama: {
      icon: <CustomerServiceOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #FFF8F0 0%, #FFE6E6 100%)',
      category: 'Arts'
    },
    buddhism: {
      icon: <HeartOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #F0FFF0 0%, #E6FFE6 100%)',
      category: 'Religion'
    },
    default: {
      icon: <BookOutlined style={{ fontSize: '24px', color: '#5038ED' }} />,
      gradient: 'linear-gradient(135deg, #F7F3FF 0%, #EDE7FF 100%)',
      category: 'General'
    }
  };

  useEffect(() => {
  const fetchSubjects = async () => {
    try {
      setLoading(true);
      const subjects = await fetchAllSubjects(parseInt(localStorage.getItem("UserId"))); // ✅ Use the correct function
      

      console.log("Fetched subjects:", subjects);

      const formattedCourses = subjects.map((subject, index) => ({
        id: subject.subjectId,
        title: subject.name.charAt(0).toUpperCase() + subject.name.slice(1),
        grade: 'Grade 10 - Sinhala', // or dynamically use real grade info if available
        category: subjectStyles[subject.name.toLowerCase()]?.category || subjectStyles.default.category,
        gradient: subjectStyles[subject.name.toLowerCase()]?.gradient || subjectStyles.default.gradient,
        icon: subjectStyles[subject.name.toLowerCase()]?.icon || subjectStyles.default.icon,
        delay: index * 200
      }));

      setCourses(formattedCourses);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setError('Failed to load subjects. Please try again.');
      setLoading(false);
    }
  };

  fetchSubjects();
}, []);;

  useEffect(() => {
    courses.forEach((course, index) => {
      setTimeout(() => {
        setVisibleCards(prev => [...prev, course.id]);
      }, course.delay);
    });
  }, [courses]);

  const handleCardClick = (course) => {
    navigate(`/student/subject/${course.id}`);
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
    color: '#5038ED',
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '8px',
    textShadow: 'none'
  };

  const gradeStyle = {
    color: '#6B46C1',
    fontSize: '12px',
    marginBottom: '4px',
    fontWeight: '500'
  };

  const categoryStyle = {
    color: '#8B5CF6',
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
    background: 'rgba(80, 56, 237, 0.05)',
    zIndex: 1
  };

  return (
    <div style={{
      padding: '40px 20px',
      backgroundColor: '#FAFAFA',
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

        {loading && <p>Loading subjects...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {!loading && !error && (
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
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;