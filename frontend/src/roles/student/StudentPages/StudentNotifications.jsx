import React  from 'react'
import { fetchAllSubjects } from '../../../utils/subjectService'

const StudentNotifications = () => {


  const response = fetchAllSubjects();
    

    

    

    console.log("response from the fetch all subjects", response.data);
  return (
    

    <>
    
            <h1>This is the notification page for student </h1>
            <p>all the messages will be displayed here </p>
    </>
  )
}

export default StudentNotifications
