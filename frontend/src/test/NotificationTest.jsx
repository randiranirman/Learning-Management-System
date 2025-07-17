import React, { useEffect, useState } from 'react'
import signalRService from '../services/signalRService';

const NotificationTest = () => {
    
    const[status, setStatus] = useState("Disconnected");
    useEffect(() => {
        async function connect() {
            await signalRService.initializeConnection();
            setStatus(signalRService.getConnectionState());
        }
        connect();

    }, [])
  return (
    

    <>
        <h1>This is the Notification Test page</h1>
        <p>Connection Status: {status}</p>
        <button onClick={async () => {
            await signalRService.sendNotification('NewRegistration', {
                studentId: 123,
                classId: 456,
                subjectIds: [1, 2, 3],
                registeredAt: new Date().toISOString()
            });
            console.log('Notification sent');
        }}>Send Test Notification</button>


    </>


  )
}

export default NotificationTest
