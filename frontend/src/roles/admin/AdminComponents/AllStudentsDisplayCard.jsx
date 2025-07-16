import { Card, Row, Col, Typography, Statistic } from 'antd';

const AllStudentsDisplayCard = ({ student }) => {
  return (
    <Card hoverable title={student.indexNo}  variant="borderless">
        <p>Student Name: {student.fullName}</p>
        <p>Grade: {student.grade}</p>
    </Card>
  )
}

export default AllStudentsDisplayCard;