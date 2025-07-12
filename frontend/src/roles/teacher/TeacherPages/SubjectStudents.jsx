import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAllStudentsBySubjectId } from '../../../utils/analyticsService';

const SubjectStudents = () => {
    const { subjectId } = useParams(); // extract the subject Id from the route
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const loadAllStudentsBySubjectId = async () => {
            try {
                const response = await getAllStudentsBySubjectId(subjectId);
                setStudents(response);
            } catch(error) {
                console.log("Error in page reloading: ", err);
                throw err;
            }
        };
        if (subjectId) {
            loadAllStudentsBySubjectId();
        }
    }, [subjectId])

    return (
        <div>
            <h1> {subjectId} </h1>
            {students.map((student) => (
                <div key={student.id}>
                    <p>{student.id} : {student.fullName} : {student.indexNumber}</p>
                </div>
            ))}
        </div>
    )
}

export default SubjectStudents;
