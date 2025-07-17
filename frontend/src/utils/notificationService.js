
import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';

// initialize the SignalR connection
const connection = new signalR.HubConnectionBuilder()
.withUrl("/notificationHub")
.configureLogging(signalR.LogLevel.Information)
.withAutomaticReconnect()
.build();




// start the connection


async function startConnection() {
    try {
        await connection.start();
        console.log('SignalR Connected');

        // Join the appropriate group based on user role
        const userId = parseInt(localStorage.getItem("UserId")); // Implement this to get the logged-in user's ID
        const userRole = localStorage.getItem("UserRole"); // Implement this to get the user's role (e.g., 'Student' or 'Admin')

       if (userRole === 'Student') {
            await connection.invoke('JoinStudentGroup', userId);
            console.log(`Joined Student_${userId} group`);
        } else if (userRole === 'Teacher') {
            await connection.invoke('JoinTeacherGroup', userId);
            console.log(`Joined Teacher_${userId} group`);
        } else if (userRole === 'Admin') {
            await connection.invoke('JoinAdminGroup');
            console.log('Joined Admins group');
        }
    } catch (err) {
        console.error('SignalR Connection Error:', err);
        // Retry connection after a delay
        setTimeout(startConnection, 5000);
    }

    // start the connection when the app loads
    


}

startConnection();
    // Handle connection close and reconnection
connection.onclose(async () => {
    console.log('SignalR Disconnected. Attempting to reconnect...');
    await startConnection();
});

// Handle NewRegistration (for admins)
connection.on('NewRegistration', (data) => {
    const message = `New registration request from Student ID ${data.studentId} for class ID ${data.classId} (Subjects: ${data.subjectIds.join(', ')}) received on ${new Date(data.registeredAt).toLocaleString()}.`;
    showNotification(message, 'info');
});

// Handle RegistrationApproved (for students)
connection.on('RegistrationApproved', (data) => {
    const message = `Your registration for ${data.className} (${data.subjectNames.join(', ')}) has been approved on ${new Date(data.approvedAt).toLocaleString()}.`;
    showNotification(message, 'success');
});

// Handle RegistrationRejected (for students)
connection.on('RegistrationRejected', (data) => {
    const message = `Your registration for ${data.className} (${data.subjectNames.join(', ')}) was rejected. Reason: ${data.reason}`;
    showNotification(message, 'error');
});

function showNotification(message, type) {
    switch (type) {
        case 'success':
            toast.success(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        case 'error':
            toast.error(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        case 'info':
            toast.info(message, {
                position: 'top-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            break;
        default:
            toast(message);
    }
}