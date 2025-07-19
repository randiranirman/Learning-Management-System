import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";

const SIGNALR_URL= "https://localhost:7293/notificationHub"; // Base API URL for notifications


let hubConnection = null;
export const startSignalRConnection = async (userId) => {
     try {
       hubConnection = new HubConnectionBuilder()
         .withUrl(SIGNALR_URL, {
           accessTokenFactory: () => {
             // Optional: Return a JWT token if your SignalR hub requires authentication
             return localStorage.getItem('token') || '';
           },
         })
         .configureLogging(LogLevel.Information)
         .withAutomaticReconnect()
         .build();

       // Handle new registration notification (for admins)
       hubConnection.on('NotifyNewRegistration', (studentId, classId, className, subjectIds, subjectNames, indexNumber) => {
         toast.info(
           `New registration: Student ${studentId} registered for class "${className}" (Index: ${indexNumber}) with subjects: ${subjectNames.join(', ')}`,
           {
             toastId: `new-reg-${studentId}-${classId}`, // Prevent duplicate toasts
             position: 'top-right',
           }
         );
       });

       // Handle registration approved notification (for students)
       hubConnection.on('NotifyRegistrationApproved', (studentId, registrationId, className, subjectNames) => {
         toast.success(
           `Your registration for class "${className}" with subjects ${subjectNames.join(', ')} has been approved!`,
           {
             toastId: `approve-reg-${registrationId}`,
             position: 'top-right',
           }
         );
       });

       // Handle registration rejected notification (for students)
       hubConnection.on('NotifyRegistrationRejected', (studentId, registrationId, className, subjectNames, reason) => {
         toast.error(
           `Your registration for class "${className}" with subjects ${subjectNames.join(', ')} was rejected. Reason: ${reason}`,
           {
             toastId: `reject-reg-${registrationId}`,
             position: 'top-right',
           }
         );
       });

       await hubConnection.start();
       console.log('SignalR connection started');
     } catch (error) {
       console.error('Error starting SignalR connection:', error);
       toast.error('Failed to connect to notification service');
     }
   };

   export const stopSignalRConnection = async () => {
     if (hubConnection) {
       await hubConnection.stop();
       console.log('SignalR connection stopped');
     }
   };