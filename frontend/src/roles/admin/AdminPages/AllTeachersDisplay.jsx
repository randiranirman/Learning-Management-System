import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { getAllTeachersInSystem } from "../../../utils/adminAnalytics";
import AllTeachersCard from "../AdminComponents/AllTeachersCard";

const AllTeachersDisplay = () => {
    const [teachers, setTeachers] = useState([]);
    const navigation = useNavigate();

    const handleTeacherCardClick = (teacherId) => {
        navigation(`/admin/analytics/teacher?teacherId=${teacherId}`);
    }

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await getAllTeachersInSystem();
                setTeachers(response);
            } catch (error) {
                console.error("Failed to fetch teachers:", error);
            }
        };
        fetchTeachers();
    }, []);

    return (
        <div>
            <Row gutter={[16, 16]}>
                {teachers.map((teacher) => (
                    <Col span={8} key={teacher.teacherId}>
                        <AllTeachersCard teacher={teacher} onClick={() => handleTeacherCardClick(teacher.teacherId)} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default AllTeachersDisplay;