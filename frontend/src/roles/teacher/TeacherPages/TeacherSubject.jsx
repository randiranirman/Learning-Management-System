import { use } from "react";
import { useParams, useLocation } from "react-router-dom";

const TeacherSubject = () => {
    const { subjectId } = useParams();
    const location = useLocation();
    const subjectName = new URLSearchParams(location.search).get('subjectName');
    
    return (
        <div>
            <h1>Subject ID: {subjectId}</h1>
            <h1>Subject Name: {subjectName}</h1>
        </div>
  )
}

export default TeacherSubject;