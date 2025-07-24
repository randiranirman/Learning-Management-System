import AdminAnalyticsMainCard from "../AdminComponents/AdminAnalyticsMainCard"
import React, { useEffect, useState } from 'react';
import { getAdminOverviewInAnalytics } from "../../../utils/adminAnalytics";
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const Analytics = () => {

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);

  const navigation = useNavigate();

  const items = [
    {
      id: 1,
      key: 'Total Students',
      value: totalStudents
    },
    {
      id: 2,
      key: 'Total Teachers',
      value: totalTeachers
    }
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAdminOverviewInAnalytics();
        setTotalStudents(response.noOfStudents);
        setTotalTeachers(response.noOfTeachers);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      }
    };
    fetchData();
  }, []);

  const handleMainCardClick = (id) => {
    if (id === 1) { // clicked on student card
      navigation('/admin/analytics/students');
    } else if (id === 2) { // clicked on teacher card
      navigation('/admin/analytics/teachers');
    }
  }

  return (
    <div>
      <Title level={3} style={{'padding': '20px'}}>
        Analytics
      </Title>
      <Row gutter={[16, 16]}>
        {items.map(item => (
          <Col xs={24} sm={8} key={item.id}> 
            <AdminAnalyticsMainCard item={item} onClick={() => handleMainCardClick(item.id)} />
          </Col>
        ))}
      </Row>
    </div>
  )
}

export default Analytics;