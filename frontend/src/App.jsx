import { Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./roles/admin/AdminLayouts/AdminLayout";
import Dashboard from "./roles/admin/AdminPages/Dashboard";
import ManageUsers from "./roles/admin/AdminPages/ManageUsers";
import ManageAssignments from "./roles/admin/AdminPages/ManageAssignments";
import ManageCourses from "./roles/admin/AdminPages/ManageCourses";
import Analytics from "./roles/admin/AdminPages/Analytics";
import Settings from "./roles/admin/AdminPages/Settings";
import QuizManagement from "./roles/teacher/TeacherPages/QuizManagement";
import QuizCreation from "./roles/teacher/TeacherPages/QuizCreation";

import TeacherDashboard from "./roles/teacher/TeacherPages/Dashboard";
import TeacherLayout from "./roles/teacher/TeacherLayouts/TeacherLayout";
import TeacherProfile from "./roles/teacher/TeacherPages/Profile";
import TeacherAssignments from "./roles/teacher/TeacherPages/Assignments";
import TeacherSettings from "./roles/teacher/TeacherPages/Settings";
import EditProfile from "./roles/admin/AdminPages/EditProfile";
import FirstLogin from "./pages/FirstLogin";
import UnAuthorized from "./pages/UnAuthorized";
import StudentLayout from "./roles/student/StudentLayout/StudentLayout";
import Files from "./roles/teacher/TeacherPages/Files";
import Notifications from "./roles/teacher/TeacherPages/Notifications";
import CourseRegistration from "./roles/teacher/TeacherPages/Registration";
import ProtectedRoute from "./auth/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import RequestReset from "./pages/RequestReset";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/firstLogin" element={<FirstLogin />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/request-password-reset" element={<RequestReset />} />

     <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-assignments" element={<ManageAssignments  />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        < Route path="editProfile" element={<EditProfile />}  />
       
      </Route>
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="registration" element={<CourseRegistration />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="quiz" element={<QuizManagement />} />
        <Route path="notifications" errorElement={<Notifications />} />
        <Route path="quiz/createQuiz" element={<QuizCreation/>} />
        <Route path="files" element={<Files />} />
      </Route>
      


      
      {/* Student routes */}
       <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
      <Route path="/student"  element={<StudentLayout/>} />
      </Route>
      
      
      
      

    </Routes>
  );
};

export default App;
  