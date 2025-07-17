import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';

class SignalRService {
    constructor() {
        this.connection = null;
        this.isConnected = false;
        this.notificationHandlers = new Map();
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
    }

    async initializeConnection() {
        if (this.connection) {
            return;
        }

        try {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl('https://localhost:7293/notificationHub', {
                    accessTokenFactory: () => localStorage.getItem('accessToken')
                })
                .withAutomaticReconnect({
                    nextRetryDelayInMilliseconds: retryContext => {
                        if (retryContext.previousRetryCount < 3) {
                            return Math.random() * 10000;
                        }
                        return null;
                    }
                })
                .configureLogging(signalR.LogLevel.Information)
                .build();

            this.setupConnectionHandlers();
            await this.startConnection();
        } catch (error) {
            console.error('Failed to initialize SignalR connection:', error);
            throw error;
        }
    }

    setupConnectionHandlers() {
        this.connection.onclose(async (error) => {
            console.log('SignalR connection closed:', error);
            this.isConnected = false;
            await this.handleReconnection();
        });

        this.connection.onreconnecting((error) => {
            console.log('SignalR reconnecting:', error);
            this.isConnected = false;
            toast.info('Connection lost, attempting to reconnect...');
        });

        this.connection.onreconnected((connectionId) => {
            console.log('SignalR reconnected:', connectionId);
            this.isConnected = true;
            this.rejoinGroups();
            toast.success('Connection restored!');
        });

        // Setup notification handlers
        this.setupNotificationHandlers();
    }

    setupNotificationHandlers() {
        // New registration notification (for admins)
        this.connection.on('NewRegistration', (data) => {
            console.log('New registration received:', data);
            const message = `New registration request from Student ID ${data.studentId} for ${data.className} (${data.subjectNames?.join(', ') || 'Multiple subjects'})`;
            toast.info(message, {
                position: 'top-right',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            // Call custom handlers if registered
            this.notifyHandlers('NewRegistration', data);
        });

        // Registration approved notification (for students)
        this.connection.on('RegistrationApproved', (data) => {
            console.log('Registration approved:', data);
            const message = `Your registration for ${data.className} (${data.subjectNames?.join(', ') || 'subjects'}) has been approved!`;
            toast.success(message, {
                position: 'top-right',
                autoClose: 8000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            this.notifyHandlers('RegistrationApproved', data);
        });

        // Registration rejected notification (for students)
        this.connection.on('RegistrationRejected', (data) => {
            console.log('Registration rejected:', data);
            const message = `Your registration for ${data.className} (${data.subjectNames?.join(', ') || 'subjects'}) was rejected. ${data.reason ? 'Reason: ' + data.reason : ''}`;
            toast.error(message, {
                position: 'top-right',
                autoClose: 10000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            
            this.notifyHandlers('RegistrationRejected', data);
        });

        // Assignment notifications
        this.connection.on('NewAssignment', (data) => {
            console.log('New assignment:', data);
            const message = `New assignment "${data.title}" has been posted for ${data.subjectName}`;
            toast.info(message, {
                position: 'top-right',
                autoClose: 8000,
            });
            
            this.notifyHandlers('NewAssignment', data);
        });

        // General notifications
        this.connection.on('GeneralNotification', (data) => {
            console.log('General notification:', data);
            const toastType = data.type === 'success' ? toast.success : 
                            data.type === 'error' ? toast.error : 
                            data.type === 'warning' ? toast.warning : toast.info;
            
            toastType(data.message, {
                position: 'top-right',
                autoClose: 6000,
            });
            
            this.notifyHandlers('GeneralNotification', data);
        });
    }

    async startConnection() {
        try {
            await this.connection.start();
            this.isConnected = true;
            this.reconnectAttempts = 0;
            console.log('SignalR Connected successfully');
            
            // Join appropriate groups based on user role
            await this.joinUserGroups();
        } catch (error) {
            console.error('SignalR Connection failed:', error);
            this.isConnected = false;
            await this.handleReconnection();
        }
    }

    async joinUserGroups() {
        const userId = localStorage.getItem('UserId');
        const userRole = localStorage.getItem('UserRole');
        
        if (!userId || !userRole) {
            console.warn('User ID or Role not found in localStorage');
            return;
        }

        try {
            const parsedUserId = parseInt(userId);
            
            if (userRole === 'Student') {
                await this.connection.invoke('JoinStudentGroup', parsedUserId);
                console.log(`Joined Student_${parsedUserId} group`);
            } else if (userRole === 'Teacher') {
                await this.connection.invoke('JoinTeacherGroup', parsedUserId);
                console.log(`Joined Teacher_${parsedUserId} group`);
            } else if (userRole === 'Admin') {
                await this.connection.invoke('JoinAdminGroup');
                console.log('Joined Admins group');
            }
        } catch (error) {
            console.error('Error joining user groups:', error);
        }
    }

    async rejoinGroups() {
        if (this.isConnected) {
            await this.joinUserGroups();
        }
    }

    async handleReconnection() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
            
            setTimeout(async () => {
                try {
                    await this.startConnection();
                } catch (error) {
                    console.error('Reconnection failed:', error);
                }
            }, 2000 * this.reconnectAttempts);
        } else {
            console.error('Max reconnection attempts reached');
            toast.error('Unable to restore connection. Please refresh the page.');
        }
    }

    // Register custom notification handlers
    onNotification(eventName, handler) {
        if (!this.notificationHandlers.has(eventName)) {
            this.notificationHandlers.set(eventName, []);
        }
        this.notificationHandlers.get(eventName).push(handler);
    }

    // Remove notification handler
    offNotification(eventName, handler) {
        if (this.notificationHandlers.has(eventName)) {
            const handlers = this.notificationHandlers.get(eventName);
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }

    // Notify all registered handlers
    notifyHandlers(eventName, data) {
        if (this.notificationHandlers.has(eventName)) {
            this.notificationHandlers.get(eventName).forEach(handler => {
                try {
                    handler(data);
                } catch (error) {
                    console.error('Error in notification handler:', error);
                }
            });
        }
    }

    // Send notification to server (if needed)
    async sendNotification(eventName, data) {
        if (this.isConnected && this.connection) {
            try {
                await this.connection.invoke(eventName, data);
            } catch (error) {
                console.error('Error sending notification:', error);
            }
        }
    }

    // Clean up connection
    async disconnect() {
        if (this.connection) {
            try {
                const userId = localStorage.getItem('UserId');
                const userRole = localStorage.getItem('UserRole');
                
                if (userId && userRole) {
                    const parsedUserId = parseInt(userId);
                    
                    if (userRole === 'Student') {
                        await this.connection.invoke('LeaveStudentGroup', parsedUserId);
                    } else if (userRole === 'Teacher') {
                        await this.connection.invoke('LeaveTeacherGroup', parsedUserId);
                    } else if (userRole === 'Admin') {
                        await this.connection.invoke('LeaveAdminGroup');
                    }
                }
                
                await this.connection.stop();
                console.log('SignalR connection closed');
            } catch (error) {
                console.error('Error closing SignalR connection:', error);
            }
            
            this.connection = null;
            this.isConnected = false;
        }
    }

    // Get connection state
    getConnectionState() {
        if (!this.connection) return 'Disconnected';
        
        switch (this.connection.state) {
            case signalR.HubConnectionState.Connected:
                return 'Connected';
            case signalR.HubConnectionState.Connecting:
                return 'Connecting';
            case signalR.HubConnectionState.Reconnecting:
                return 'Reconnecting';
            case signalR.HubConnectionState.Disconnected:
                return 'Disconnected';
            case signalR.HubConnectionState.Disconnecting:
                return 'Disconnecting';
            default:
                return 'Unknown';
        }
    }
}

// Create singleton instance
const signalRService = new SignalRService();

export default signalRService;
