import { useEffect, useState } from "react";
import { getSubjectsByTeacherId } from "../../../utils/teacherFileStorage";
import { useNavigate } from "react-router-dom";
import { Card } from "antd";
import {
  BookOutlined,
  CalculatorOutlined,
  TranslationOutlined,
  ExperimentOutlined,
  HistoryOutlined,
  ShoppingOutlined,
  CustomerServiceOutlined,
  HeartOutlined,
} from "@ant-design/icons";

const TestDashboard = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const navigation = useNavigate();
  const teacherId = pharseInt(localStorage.getItem("UserId"));

  const handleSubjectSelect = (subject) => {
    navigation(`/teacher/subject/${subject.subjectId}?subjectName=${subject.name}`);
  };

  const subjectStyles = {
    maths: {
      icon: <CalculatorOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #E8E2FF 0%, #F5F3FF 100%)",
    },
    string: {
      icon: <TranslationOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #FFF1F0 0%, #FFE7E6 100%)",
    },
    sinhala: {
      icon: <BookOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #F0F4FF 0%, #E6F0FF 100%)",
    },
    science: {
      icon: <ExperimentOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #F0FFFF 0%, #E6FFFE 100%)",
    },
    history: {
      icon: <HistoryOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #F0FFF4 0%, #E6FFFA 100%)",
    },
    commerce: {
      icon: <ShoppingOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #FAF0FF 0%, #F0E6FF 100%)",
    },
    drama: {
      icon: <CustomerServiceOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #FFF8F0 0%, #FFE6E6 100%)",
    },
    buddhism: {
      icon: <HeartOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #F0FFF0 0%, #E6FFE6 100%)",
    },
    default: {
      icon: <BookOutlined style={{ fontSize: "24px", color: "#5038ED" }} />,
      gradient: "linear-gradient(135deg, #F7F3FF 0%, #EDE7FF 100%)",
    },
  };

  useEffect(() => {
    const fetchAllSubjectsByTeacherId = async () => {
      try {
        const response = await getSubjectsByTeacherId(teacherId);
        console.log("Fetched subjects:", response);
        console.log("Teacher ID:", teacherId);
        
        setSubjects(
          response.map((subject, index) => {
            const style = subjectStyles[subject.name.toLowerCase()] || subjectStyles.default;
            return {
              ...subject,
              gradient: style.gradient,
              icon: style.icon,
              delay: index * 150,
            };
          })
        );
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    if (teacherId) {
      fetchAllSubjectsByTeacherId();
    }
  }, [teacherId]);

  useEffect(() => {
    subjects.forEach((subject, index) => {
      setTimeout(() => {
        setVisibleCards((prev) => [...prev, subject.subjectId]);
      }, subject.delay);
    });
  }, [subjects]);

  const cardStyle = (subject) => ({
    background: subject?.gradient || subjectStyles.default.gradient,
    border: "none",
    borderRadius: "16px",
    height: "160px",
    cursor: subject ? "pointer" : "default",
    transform: visibleCards.includes(subject?.subjectId || "no-subjects") ? "translateY(0) scale(1)" : "translateY(30px) scale(0.9)",
    opacity: visibleCards.includes(subject?.subjectId || "no-subjects") ? 1 : 0,
    transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    boxShadow: visibleCards.includes(subject?.subjectId || "no-subjects") ? "0 8px 30px rgba(0,0,0,0.12)" : "0 4px 15px rgba(0,0,0,0.08)",
    position: "relative",
    overflow: "hidden",
  });

  const bodyStyle = {
    padding: "20px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    zIndex: 2,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(80, 56, 237, 0.05)",
    zIndex: 1,
  };

  const iconContainerStyle = {
    position: "absolute",
    top: "16px",
    right: "16px",
    zIndex: 3,
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#ffffff",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            marginBottom: "40px",
            color: "#2c3e50",
            textAlign: "left",
          }}
        >
          MY SUBJECTS
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "24px",
            padding: "0",
          }}
        >
          {subjects.length > 0 ? (
            subjects.map((subject) => (
              <Card
                key={subject.subjectId}
                style={cardStyle(subject)}
                bodyStyle={bodyStyle}
                onClick={() => handleSubjectSelect(subject)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = visibleCards.includes(subject.subjectId)
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(30px) scale(0.9)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = visibleCards.includes(subject.subjectId)
                    ? "translateY(0) scale(1)"
                    : "translateY(30px) scale(0.9)";
                  e.currentTarget.style.boxShadow = visibleCards.includes(subject.subjectId)
                    ? "0 8px 30px rgba(0,0,0,0.12)"
                    : "0 4px 15px rgba(0,0,0,0.08)";
                }}
              >
                <div style={overlayStyle}></div>
                <div style={iconContainerStyle}>{subject.icon}</div>
                <div>
                  <h3 style={{ color: "#5038ED", fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                    {subject.name}
                  </h3>
                  <p style={{ color: "#6B46C1", fontSize: "12px", fontWeight: "500" }}>Subject ID: {subject.subjectId}</p>
                </div>
              </Card>
            ))
          ) : (
            <Card
              key="no-subjects"
              style={cardStyle(null)}
              bodyStyle={bodyStyle}
            >
              <div style={overlayStyle}></div>
              <div style={iconContainerStyle}>{subjectStyles.default.icon}</div>
              <div>
                <h3 style={{ color: "#5038ED", fontSize: "18px", fontWeight: "600", marginBottom: "8px" }}>
                  No Subjects Available
                </h3>
                <p style={{ color: "#6B46C1", fontSize: "12px", fontWeight: "500" }}>
                  Please contact the administrator to assign subjects.
                </p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;