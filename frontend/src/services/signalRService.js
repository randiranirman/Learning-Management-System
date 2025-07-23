// // services/signalRService.js
// import * as signalR from '@microsoft/signalr';
// import { toast } from 'react-toastify';

// class SignalRService {
//   constructor() {
//     this.connection = null;
//     this.isConnected = false;
//   }

//   async initializeConnection() {
//     if (this.connection) {
//       console.log("SignalR already initialized");
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token')?.trim();
//       if (!token) {
//         toast.error("Missing token. Cannot connect to SignalR.");
//         return;
//       }

//       this.connection = new signalR.HubConnectionBuilder()
//         .withUrl("https://localhost:7293/notificationHub", {
//           accessTokenFactory: () => token,
//         })
//         .configureLogging(signalR.LogLevel.Information)
//         .withAutomaticReconnect()
//         .build();

//       this.connection.onreconnecting(() => {
//         this.isConnected = false;
//         console.log("SignalR reconnecting...");
//       });

//       this.connection.onreconnected(async () => {
//         this.isConnected = true;
//         console.log("SignalR reconnected");
//         try {
//           await this.connection.invoke("JoinAdminGroup");
//           console.log("Rejoined admin group after reconnect");
//         } catch (err) {
//           console.error("Failed to rejoin admin group:", err);
//         }
//       });

//       this.connection.onclose(() => {
//         this.isConnected = false;
//         console.log("SignalR connection closed");
//       });

//       // === NOTIFICATION HANDLERS ===

//       this.connection.on("NotifyNewRegistration", (studentId, classId, className, subjectIds, subjectNames, indexNumber) => {
//         console.log("New registration (method 1):", { studentId, classId, className, subjectIds, subjectNames, indexNumber });
//         toast.info(`📌 New registration from Student ${studentId} for ${className} (Index: ${indexNumber}) with subjects: ${subjectNames?.join(", ") || 'N/A'}`);
//       });

//       this.connection.on("NotifyNewRegistrationAsync", (data) => {
//         console.log("New registration (method 2):", data);
//         const { StudentId, ClassName, SubjectNames, IndexNumber } = data;
//         toast.info(`📌 New registration from ${StudentId} for ${ClassName} (Index: ${IndexNumber}) with subjects: ${SubjectNames?.join(", ") || 'N/A'}`);
//       });

//       this.connection.on('NotifyRegistrationApproved', (studentId, registrationId, className, subjectNames) => {
//         console.log("Registration approved:", { studentId, registrationId, className, subjectNames });
//         toast.success(`✅ Your registration for class "${className}" with subjects ${subjectNames?.join(', ') || 'N/A'} has been approved!`);
//       });

//       this.connection.on('NotifyRegistrationRejected', (studentId, registrationId, className, subjectNames, reason) => {
//         console.log("Registration rejected:", { studentId, registrationId, className, subjectNames, reason });
//         toast.error(`❌ Your registration for class "${className}" with subjects ${subjectNames?.join(', ') || 'N/A'} was rejected. Reason: ${reason || 'No reason provided'}`);
//       });

//       this.connection.on('ReceiveMessage', (user, message) => {
//         console.log('Generic message received:', { user, message });
//         toast.info(`📨 Message from ${user}: ${message}`);
//       });

//       this.connection.on('ReceiveNotification', (notification) => {
//         console.log('General notification received:', notification);
//         const { Title, Message, Type } = notification;
//         switch (Type) {
//           case 'success':
//             toast.success(`${Title}: ${Message}`);
//             break;
//           case 'warning':
//             toast.warning(`${Title}: ${Message}`);
//             break;
//           case 'error':
//             toast.error(`${Title}: ${Message}`);
//             break;
//           default:
//             toast.info(`${Title}: ${Message}`);
//         }
//       });

//       this.connection.on('NewAssignment', (assignment) => {
//         console.log('New assignment notification received:', assignment);
//         const { SubjectName, AssignmentTitle, AssignmentDescription } = assignment;
//         toast.info(`📚 New Assignment in ${SubjectName}: ${AssignmentTitle} - ${AssignmentDescription}`);
//       });

//       this.connection.on('SystemMessage', (message) => {
//         console.log('System message received:', message);
//         const { Message, Type } = message;
//         const content = `🔧 System: ${Message}`;
//         Type === 'warning' ? toast.warning(content) : toast.info(content);
//       });

//       this.connection.on('BroadcastNotification', (broadcast) => {
//         console.log('Broadcast notification received:', broadcast);
//         const { Title, Message, Type } = broadcast;
//         const content = `📢 ${Title}: ${Message}`;
//         switch (Type) {
//           case 'success':
//             toast.success(content);
//             break;
//           case 'warning':
//             toast.warning(content);
//             break;
//           default:
//             toast.info(content);
//         }
//       });

//       await this.connection.start();
//       this.isConnected = true;
//       console.log("✅ SignalR connected successfully!");

//       await this.connection.invoke("JoinAdminGroup");
//       console.log("Joined admin group successfully!");

//     } catch (err) {
//       console.error("❌ SignalR connection failed:", err);
//       this.isConnected = false;
//       toast.error('Failed to connect to notification service');
//     }
//   }

//   getConnectionState() {
//     if (!this.connection) return "Disconnected";
//     return this.connection.state;
//   }

//   isConnectionActive() {
//     return this.isConnected && this.connection && this.connection.state === signalR.HubConnectionState.Connected;
//   }

//   async sendNotification(method, data) {
//     if (!this.isConnectionActive()) {
//       console.error("SignalR connection is not active");
//       return;
//     }

//     try {
//       await this.connection.invoke(method, data);
//       console.log(`Notification sent via ${method}:`, data);
//     } catch (err) {
//       console.error(`Failed to send notification via ${method}:`, err);
//     }
//   }

//   async stopConnection() {
//     if (this.connection) {
//       await this.connection.stop();
//       this.isConnected = false;
//       console.log("SignalR connection stopped");
//     }
//   }

//   async reconnect() {
//     try {
//       await this.stopConnection();
//       this.connection = null;
//       await this.initializeConnection();
//     } catch (err) {
//       console.error("Failed to reconnect SignalR:", err);
//     }
//   }
// }

//   const signalRService = new SignalRService();
//   export default signalRService;
