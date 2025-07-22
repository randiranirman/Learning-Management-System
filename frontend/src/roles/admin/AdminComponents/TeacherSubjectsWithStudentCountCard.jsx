import { Card, Row, Col, Typography, Statistic } from 'antd';

const TeacherSubjectsWithStudentCountCard = ({ subject }) => {
  return (
    <div>
      <Card hoverable title={subject.subjectTitle} variant="borderless">
        <p>Subject ID: {subject.subjectId}</p>
        <p>Grade: {subject.grade}</p>
        <p>Student Count: {subject.registeredStudentCount}</p>
      </Card>
    </div>
  );
};


export default TeacherSubjectsWithStudentCountCard;