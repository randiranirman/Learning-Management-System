// services/signalRService.js
import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';

class SignalRService {
  constructor() {
    this.connection = null;
    this.isConnected = false;
    this.maxRetries = 3;
    this.retryDelay = 2000;
  }

  
  async initializeConnection(userRole = null, userId = null) {
    if (this.connection && this.connection.state === signalR.HubConnectionState.Connected) {
      console.log("SignalR already connected");
      return true;
    }

    if (this.connection && this.connection.state !== signalR.HubConnectionState.Disconnected) {
      console.log("SignalR connection in progress or reconnecting...");
      return false;
    }

    // Validate token before attempting connection
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('[SignalR] Cannot connect: No access token available');
      toast.error('Authentication required for notifications');
      return false;
    }

    try {
      console.log('[SignalR] Starting connection negotiation...');
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("https://localhost:7293/notificationHub", {
          accessTokenFactory: () => {
            const token = localStorage.getItem('accessToken');
            
            console.log('[SignalR] Token available:', !!token);
            if (!token) {
              console.warn('[SignalR] No access token found');
              return '';
            }
            return token;
          },
          skipNegotiation: false,
          transport: signalR.HttpTransportType.WebSockets | signalR.HttpTransportType.ServerSentEvents | signalR.HttpTransportType.LongPolling,
          withCredentials: false
        })
        .configureLogging(signalR.LogLevel.Information)
        .withAutomaticReconnect([0, 2000, 10000, 30000])
        .build();

      this.connection.onreconnecting(() => {
        this.isConnected = false;
        console.log("SignalR reconnecting...");
      });

      this.connection.onreconnected(() => {
        this.isConnected = true;
        console.log("SignalR reconnected");
        this.connection.invoke("JoinAdminGroup").catch(err => console.error("Failed to rejoin admin group:", err));
      });

      this.connection.onclose(() => {
        this.isConnected = false;
        console.log("SignalR connection closed");
      });

      this.connection.on("NotifyNewRegistration", (studentId, classId, className, subjectIds, subjectNames, indexNumber) => {
        console.log("New registration notification received (method 1):", {
          studentId, classId, className, subjectIds, subjectNames, indexNumber
        });
        toast.info(`📌 New registration from Student ${studentId} for ${className} (Index: ${indexNumber}) with subjects: ${subjectNames ? subjectNames.join(", ") : 'N/A'}`);
      });

      this.connection.on("NotifyNewRegistrationAsync", (data) => {
        console.log("New registration notification received (method 2):", data);
        const { StudentId, ClassName, SubjectNames, IndexNumber } = data;
        toast.info(`📌 New registration from ${StudentId} for ${ClassName} (Index: ${IndexNumber}) with subjects: ${SubjectNames ? SubjectNames.join(", ") : 'N/A'}`);
      });

      this.connection.on('NotifyRegistrationApproved', (studentId, registrationId, className, subjectNames) => {
        console.log("Registration approved notification received:", {
          studentId, registrationId, className, subjectNames
        });
        toast.success(
          `✅ Your registration for class "${className}" with subjects ${subjectNames ? subjectNames.join(', ') : 'N/A'} has been approved!`
        );
      });

      this.connection.on('NotifyRegistrationRejected', (studentId, registrationId, className, subjectNames, reason) => {
        console.log("Registration rejected notification received:", {
          studentId, registrationId, className, subjectNames, reason
        });
        toast.error(
          `❌ Your registration for class "${className}" with subjects ${subjectNames ? subjectNames.join(', ') : 'N/A'} was rejected. Reason: ${reason || 'No reason provided'}`
        );
      });

      this.connection.on('ReceiveMessage', (user, message) => {
        console.log('Generic message received:', { user, message });
        toast.info(`Message from ${user}: ${message}`);
      });

      this.connection.on('NotifyRegistrationCompleted', (data) => {
        console.log('Registration completed notification received:', data);
        const { ClassName, Message } = data;
        toast.success(
          `✅ Registration Completed: ${Message}`
        );
      });

      this.connection.on('NotifyAdminsOnRegistration', (data) => {
        console.log('Admin registration notification received:', data);
        const { StudentId, ClassName, SubjectNames } = data;
        toast.info(
          `📝 Student ${StudentId} registered for ${ClassName} with subjects: ${SubjectNames ? SubjectNames.join(', ') : 'N/A'}`
        );
      });

      await this.connection.start();
      this.isConnected = true;
      console.log("SignalR connected successfully!");
      
      // Join appropriate groups based on user role
      if (userRole === 'Admin') {
        await this.connection.invoke("JoinAdminGroup");
        console.log("Joined admin group successfully!");
      } else if (userRole === 'Student' && userId) {
        await this.connection.invoke("JoinStudentGroup", parseInt(userId));
        console.log(`Joined student group for user ${userId}`);
      } else if (userRole === 'Teacher' && userId) {
        await this.connection.invoke("JoinTeacherGroup", parseInt(userId));
        console.log(`Joined teacher group for user ${userId}`);
      }
      
      return true;
      
    } catch (err) {
      console.error("SignalR connection failed:", err);
      this.isConnected = false;
      toast.error('Failed to connect to notification service');
      return false;
    }
  }

  getConnectionState() {
    if (!this.connection) return "Disconnected";
    return this.connection.state;
  }

  isConnectionActive() {
    return this.isConnected && this.connection && this.connection.state === signalR.HubConnectionState.Connected;
  }

  async sendNotification(method, data) {
    if (!this.isConnectionActive()) {
      console.error("SignalR connection is not active");
      return;
    }
    
    try {
      await this.connection.invoke(method, data);
      console.log(`Notification sent via ${method}:`, data);
    } catch (err) {
      console.error(`Failed to send notification via ${method}:`, err);
    }
  }

  async stopConnection() {
    if (this.connection) {
      await this.connection.stop();
      this.isConnected = false;
      console.log("SignalR connection stopped");
    }
  }

  async reconnect() {
    try {
      await this.stopConnection();
      this.connection = null;
      await this.initializeConnection();
    } catch (err) {
      console.error("Failed to reconnect SignalR:", err);
    }
  }
}

const signalRService = new SignalRService();
export default signalRService;
