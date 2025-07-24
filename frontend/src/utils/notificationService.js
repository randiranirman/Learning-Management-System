import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { toast } from "react-toastify";

const SIGNALR_URL = "https://localhost:7293/notificationHub"; // Update if running HTTPS or on a different port

let hubConnection = null;
export const startSignalRConnection = async (userId, addNotification) => {
  try {
    hubConnection = new HubConnectionBuilder()
      .withUrl(`${SIGNALR_URL}?access_token=${localStorage.getItem("accessToken") || ""}`, {
        accessTokenFactory: () => localStorage.getItem("accessToken") || "",
      })
      .configureLogging(LogLevel.Information)
      .withAutomaticReconnect()
      .build();

    // === Admin Notification: New Registration ===
    hubConnection.on(
      "NotifyNewRegistrationAsync",
      (studentId, classId, className, subjectIds, subjectNames, indexNumber) => {
        const message = `📌 New registration: Student ${studentId} registered for class "${className}" (Index: ${indexNumber}) with subjects: ${subjectNames?.join(", ") || "N/A"}`;
        
        toast.info(message, {
          toastId: `new-reg-${studentId}-${classId}`,
        });

        addNotification?.({
          type: "info",
          title: "New Student Registration",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Student Notification: Approved Registration ===
    hubConnection.on(
      "NotifyRegistrationApproved",
      (studentId, registrationId, className, subjectNames) => {
        const message = `✅ Your registration for class "${className}" with subjects ${subjectNames?.join(", ") || "N/A"} has been approved!`;

        toast.success(message, {
          toastId: `approve-reg-${registrationId}`,
          position: "top-right",
        });

        addNotification?.({
          type: "success",
          title: "Registration Approved",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Student Notification: Rejected Registration ===
    hubConnection.on(
      "NotifyRegistrationRejected",
      (studentId, registrationId, className, subjectNames, reason) => {
        const message = `❌ Your registration for class "${className}" with subjects ${subjectNames?.join(", ") || "N/A"} was rejected. Reason: ${reason || "No reason provided"}`;

        toast.error(message, {
          toastId: `reject-reg-${registrationId}`,
          position: "top-right",
        });

        addNotification?.({
          type: "error",
          title: "Registration Rejected",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Teacher Notification to Admin ===
    hubConnection.on(
      "NotifyNewRegistrationAsyncByTeacher",
      (teacherId, classIds, subjectNames) => {
        const message = `📌 Teacher ${teacherId} has registered for classes: ${classIds.join(", ")} with subjects: ${subjectNames?.join(", ") || "N/A"}`;
        
        toast.info(message, {
          toastId: `teacher-reg-${teacherId}`,
          position: "top-right",
        });

        addNotification?.({
          type: "info",
          title: "Teacher Registration",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Teacher Registration Approved ===
    hubConnection.on(
      "NotifyNewRegistrationApprovedAsyncTeacher",
      (teacherId, registrationId, className, subjectNames) => {
        const message = `✅ Your registration for class "${className}" with subjects ${subjectNames?.join(", ") || "N/A"} has been approved!`;

        toast.success(message, {
          toastId: `teacher-approve-reg-${registrationId}`,
          position: "top-right",
        });

        addNotification?.({
          type: "success",
          title: "Teacher Registration Approved",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Registration Completed
    hubConnection.on(
      "NotifyRegistrationCompleted",
      (studentId, className, msg) => {
        const message = `🎉 Registration completed for class "${className}": ${msg}`;

        toast.success(message, {
          toastId: `complete-reg-${studentId}-${className}`,
          position: "top-right",
        });

        addNotification?.({
          type: "success",
          title: "Registration Completed",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Admin Alert for Registration
    hubConnection.on(
      "NotifyAdminsOnRegistration",
      (studentId, className, subjectNames) => {
        const message = `📋 Student ${studentId} registered for class "${className}" with subjects: ${subjectNames?.join(", ") || "N/A"}`;

        toast.info(message, {
          toastId: `admin-reg-${studentId}-${className}`,
          position: "top-right",
        });

        addNotification?.({
          type: "info",
          title: "Admin Registration Alert",
          message,
          timestamp: new Date().toISOString(),
        });
      }
    );

    // === Start connection and auto-join groups ===
    await hubConnection.start();
    console.log("✅ SignalR connection started");

    const userRole = localStorage.getItem("UserRole");

    if (userRole === "admin") {
      await hubConnection.invoke("JoinAdminGroup");
    } else if (userRole === "student" && userId) {
      await hubConnection.invoke("JoinStudentGroup", parseInt(userId));
    } else if (userRole === "teacher" && userId) {
      await hubConnection.invoke("JoinTeacherGroup", parseInt(userId));
    }

  } catch (error) {
    console.error("❌ Error starting SignalR connection:", error);
    toast.error("Failed to connect to notification service");
  }
};

export const getConnectionState = () => {
  return hubConnection?.state || "Disconnected";
};


export const joinGroup = async (groupType, userId = null) => {
  if (hubConnection && hubConnection.state === "Connected") {
    try {
      switch (groupType) {
        case "admin":
          await hubConnection.invoke("JoinAdminGroup");
          break;
        case "student":
          if (userId) await hubConnection.invoke("JoinStudentGroup", parseInt(userId));
          break;
        case "teacher":
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
        case "admin":
          await hubConnection.invoke("LeaveAdminGroup");
          break;
        case "student":
          if (userId) await hubConnection.invoke("LeaveStudentGroup", parseInt(userId));
          break;
        case "teacher":
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


export const stopSignalRConnection = async () => {
  if (hubConnection && hubConnection.state !== "Disconnected") {
    try {
      await hubConnection.stop();
      console.log("🛑 SignalR connection stopped.");
    } catch (error) {
      console.error("❌ Error stopping SignalR connection:", error);
    }
  }
};
