import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";

const SIGNALR_URL = "https://localhost:7293/notificationHub"; // Update if running HTTPS or on a different port

let hubConnection = null;

export const startSignalRConnection = async (userId) => {
  try {
    hubConnection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_URL}?access_token=${localStorage.getItem("accessToken") || ""}`, {
        // Also keep the accessTokenFactory as fallback
        accessTokenFactory: () => localStorage.getItem("accessToken") || "",
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // === Admin Notification: New Registration ===
    hubConnection.on(
      "NotifyNewRegistrationAsync",
      (studentId, classId, className, subjectIds, subjectNames, indexNumber) => {
        console.log("🔔 NotifyNewRegistrationAsync received:", {
          studentId, classId, className, subjectIds, subjectNames, indexNumber
        });
        toast.info(
          `📌 New registration: Student ${studentId} registered for class "${className}" (Index: ${indexNumber}) with subjects: ${subjectNames?.join(", ") || "N/A"}`,
          {
            toastId: `new-reg-${studentId}-${classId}`,
            position: "top-right",
          }
        );
      }
    );

    // === Student Notification: Approved Registration ===
    hubConnection.on(
      "NotifyRegistrationApproved",
      (studentId, registrationId, className, subjectNames) => {
        toast.success(
          `✅ Your registration for class "${className}" with subjects ${subjectNames?.join(", ") || "N/A"} has been approved!`,
          {
            toastId: `approve-reg-${registrationId}`,
            position: "top-right",
          }
        );
      }
    );

    // === Student Notification: Rejected Registration ===
    hubConnection.on(
      "NotifyRegistrationRejected",
      (studentId, registrationId, className, subjectNames, reason) => {
        toast.error(
          `❌ Your registration for class "${className}" with subjects ${subjectNames?.join(", ") || "N/A"} was rejected. Reason: ${reason || "No reason provided"}`,
          {
            toastId: `reject-reg-${registrationId}`,
            position: "top-right",
          }
        );
      }
    );

    // === Additional Handlers for Extra Backend Methods ===
    
    // Registration Completed (from backend)
    hubConnection.on(
      "NotifyRegistrationCompleted",
      (studentId, className, message) => {
        toast.success(
          `🎉 Registration completed for class "${className}": ${message}`,
          {
            toastId: `complete-reg-${studentId}-${className}`,
            position: "top-right",
          }
        );
      }
    );

    // Admin notification for registration (from backend)
    hubConnection.on(
      "NotifyAdminsOnRegistration",
      (studentId, className, subjectNames) => {
        toast.info(
          `📋 Student ${studentId} registered for class "${className}" with subjects: ${subjectNames?.join(", ") || "N/A"}`,
          {
            toastId: `admin-reg-${studentId}-${className}`,
            position: "top-right",
          }
        );
      }
    );

    await hubConnection.start();
    console.log("✅ SignalR connection started");

    // Debug: Log current localStorage values
    console.log("🔍 Debug localStorage values:");
    console.log("- UserRole:", localStorage.getItem("UserRole"));
    console.log("- UserId:", localStorage.getItem("UserId"));
    console.log("- accessToken:", localStorage.getItem("accessToken") ? "Present" : "Missing");

    // Auto-join appropriate groups based on user role
    const userRole = localStorage.getItem("UserRole");
    console.log("🎭 Attempting to join group for role:", userRole);
    
    if (userRole === "admin") {
      console.log("Calling JoinAdminGroup...");
      await hubConnection.invoke("JoinAdminGroup");
      console.log("Successfully joined Admin group");
    } else if (userRole === "student" && userId) {
      console.log(` Calling JoinStudentGroup with userId: ${userId}...`);
      await hubConnection.invoke("JoinStudentGroup", parseInt(userId));
      console.log(`Successfully joined Student group for user ${userId}`);
    } else if (userRole === "teacher" && userId) {
      console.log(` Calling JoinTeacherGroup with userId: ${userId}...`);
      await hubConnection.invoke("JoinTeacherGroup", parseInt(userId));
      console.log(`Successfully joined Teacher group for user ${userId}`);
    } else {
      console.warn(" No matching role found or missing userId. Role:", userRole, "UserId:", userId);
    }

  } catch (error) {
    console.error("❌ Error starting SignalR connection:", error);
    toast.error("Failed to connect to notification service");
  }
};

export const stopSignalRConnection = async () => {
  if (hubConnection) {
    try {
      // Leave groups gracefully before disconnecting
      const userRole = localStorage.getItem("UserRole");
      const userId = localStorage.getItem("UserId");
      
      if (userRole === "Admin") {
        await hubConnection.invoke("LeaveAdminGroup");
      } else if (userRole === "Student" && userId) {
        await hubConnection.invoke("LeaveStudentGroup", parseInt(userId));
      } else if (userRole === "Teacher" && userId) {
        await hubConnection.invoke("LeaveTeacherGroup", parseInt(userId));
      }
      
      await hubConnection.stop();
      console.log("🛑 SignalR connection stopped gracefully");
    } catch (error) {
      console.error("❌ Error stopping SignalR connection:", error);
      // Force stop if graceful stop fails
      await hubConnection.stop();
    }
  }
};

// === Helper Functions for Manual Notifications ===

export const joinGroup = async (groupType, userId = null) => {
  if (hubConnection && hubConnection.state === "Connected") {
    try {
      switch (groupType) {
        case "Admin":
          await hubConnection.invoke("JoinAdminGroup");
          break;
        case "Student":
          if (userId) await hubConnection.invoke("JoinStudentGroup", parseInt(userId));
          break;
        case "Teacher":
          if (userId) await hubConnection.invoke("JoinTeacherGroup", parseInt(userId));
          break;
        default:
          console.warn("Unknown group type:", groupType);
      }
      console.log(`✅ Joined ${groupType} group${userId ? ` for user ${userId}` : ""}`);
    } catch (error) {
      console.error(`❌ Error joining ${groupType} group:`, error);
    }
  }
};

export const leaveGroup = async (groupType, userId = null) => {
  if (hubConnection && hubConnection.state === "Connected") {
    try {
      switch (groupType) {
        case "Admin":
          await hubConnection.invoke("LeaveAdminGroup");
          break;
        case "Student":
          if (userId) await hubConnection.invoke("LeaveStudentGroup", parseInt(userId));
          break;
        case "Teacher":
          if (userId) await hubConnection.invoke("LeaveTeacherGroup", parseInt(userId));
          break;
        default:
          console.warn("Unknown group type:", groupType);
      }
      console.log(`✅ Left ${groupType} group${userId ? ` for user ${userId}` : ""}`);
    } catch (error) {
      console.error(`❌ Error leaving ${groupType} group:`, error);
    }
  }
};

export const sendTestNotification = async () => {
  if (hubConnection && hubConnection.state === "Connected") {
    try {
      await hubConnection.invoke("SendTestNotification");
      console.log("🧪 Test notification sent");
    } catch (error) {
      console.error("❌ Error sending test notification:", error);
    }
  }
};

export const getConnectionState = () => {
  return hubConnection?.state || "Disconnected";
};

// Test function to manually trigger notification (for debugging)
export const testNotificationHandler = () => {
  console.log("🧪 Testing notification handler manually...");
  if (hubConnection && hubConnection.state === "Connected") {
    // Manually trigger the notification handler
    const testData = {
      studentId: 123,
      classId: 456,
      className: "Test Class",
      subjectIds: [1, 2],
      subjectNames: ["Math", "Science"],
      indexNumber: "TEST001"
    };
    
    // Simulate the notification event
    console.log("🔔 Manually triggering NotifyNewRegistrationAsync...");
    toast.info(
      `📌 TEST: Student ${testData.studentId} registered for class "${testData.className}" (Index: ${testData.indexNumber}) with subjects: ${testData.subjectNames.join(", ")}`,
      {
        toastId: `test-notification`,
        position: "top-right",
      }
    );
    return true;
  } else {
    console.error("❌ SignalR connection not available or not connected");
    return false;
  }
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  window.testSignalR = {
    testNotificationHandler,
    getConnectionState,
    sendTestNotification
  };
}
