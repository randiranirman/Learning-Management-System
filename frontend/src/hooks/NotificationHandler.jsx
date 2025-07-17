import React, { useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NotificationHandler = () => {
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('/notificationHub', {
                accessTokenFactory: () => localStorage.getItem('accessToken') // Implement for JWT
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        async function start() {
            try {
                await connection.start();
                console.log('SignalR Connected');

                const userId = localStorage.getItem('UserId'); // Implement to get user ID
                const userRole = localStorage.getItem('UserRole'); // Implement to get user role

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
                setTimeout(start, 5000);
            }
        }

        // Notification handlers
        connection.on('NewRegistration', (data) => {
            toast.info(`New registration request from Student ID ${data.studentId} for class ID ${data.classId} (Subjects: ${data.subjectIds.join(', ')}) received on ${new Date(data.registeredAt).toLocaleString()}.`, {
                position: 'top-right',
                autoClose: 5000
            });
        });

        connection.on('RegistrationApproved', (data) => {
            toast.success(`Your registration for ${data.className} (${data.subjectNames.join(', ')}) has been approved on ${new Date(data.approvedAt).toLocaleString()}.`, {
                position: 'top-right',
                autoClose: 5000
            });
        });

        connection.on('RegistrationRejected', (data) => {
            toast.error(`Your registration for ${data.className} (${data.subjectNames.join(', ')}) was rejected. Reason: ${data.reason}`, {
                position: 'top-right',
                autoClose: 5000
            });
        });

        // Start connection
        start();

        // Cleanup on component unmount
        return () => {
            const userId = localStorage.getItem('UserId');
            const userRole = localStorage.getItem('UserRole');

            if (userRole === 'Student') {
                connection.invoke('LeaveStudentGroup', userId);
            } else if (userRole === 'Teacher') {
                connection.invoke('LeaveTeacherGroup', userId);
            } else if (userRole === 'Admin') {
                connection.invoke('LeaveAdminGroup');
            }
            connection.stop();
        };
    }, []);

    return null; // No UI, only handles notifications
};

export default NotificationHandler;