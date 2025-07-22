import { Card, Row, Col, Typography, Statistic } from 'antd';

const AllTeachersCard = ({ teacher, onClick }) => {
    return(
        <Card hoverable onClick={onClick} title={teacher.employeeId}  variant="borderless">
            <p>Teacher Name: {teacher.teacherFullName}</p>
            <p>Email: {teacher.teacherEmail}</p>
            <p>No of subjects: {teacher.subjectCount}</p>
        </Card>
    )
}

export default AllTeachersCard;