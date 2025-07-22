import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Typography, Statistic } from 'antd';
import { getAllTeachersInSystem } from "../../../utils/adminAnalytics";
import AllTeachersCard from "../AdminComponents/AllTeachersCard";

const AllTeachersDisplay = () => {
    const [teachers, setTeachers] = useState([]);
    const [search, setSearch] = useState("");
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

    // Filter teachers by employeeId (case-insensitive)
    const filteredTeachers = teachers.filter(teacher =>
        teacher.employeeId && teacher.employeeId.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <input
                    type="text"
                    placeholder="Search by Employee ID"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ width: 300, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                />
            </div>
            <Row gutter={[16, 16]}>
                {filteredTeachers.length === 0 ? (
                    <Col span={24} style={{ textAlign: 'center', padding: '20px' }}>
                        No teachers found for the given employee ID.
                    </Col>
                ) : (
                    filteredTeachers.map((teacher) => (
                        <Col span={8} key={teacher.teacherId}>
                            <AllTeachersCard teacher={teacher} onClick={() => handleTeacherCardClick(teacher.teacherId)} />
                        </Col>
                    ))
                )}
            </Row>
        </div>
    )
}

export default AllTeachersDisplay;