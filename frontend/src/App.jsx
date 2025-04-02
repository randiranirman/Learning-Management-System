import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminLayout from "./roles/admin/AdminLayouts/AdminLayout";
import Dashboard from "./roles/admin/AdminPages/Dashboard";
import ManageUsers from "./roles/admin/AdminPages/ManageUsers";
import ManageAssignments from "./roles/admin/AdminPages/ManageAssignments";
import ManageCourses from "./roles/admin/AdminPages/ManageCourses";
import Analytics from "./roles/admin/AdminPages/Analytics";
import Settings from "./roles/admin/AdminPages/Settings";
import StudentDashboard from "./roles/student/StudentPages/StudentDashboard";
import QuizManagement from "./roles/teacher/TeacherPages/QuizManagement";
import QuizCreation from "./roles/teacher/TeacherPages/QuizCreation";

import TeacherDashboard from "./roles/teacher/TeacherPages/Dashboard";
import TeacherLayout from "./roles/teacher/TeacherLayouts/TeacherLayout";
import TeacherProfile from "./roles/teacher/TeacherPages/Profile";
import TeacherAssignments from "./roles/teacher/TeacherPages/Assignments";
import TeacherSettings from "./roles/teacher/TeacherPages/Settings";
import EditProfile from "./roles/admin/AdminPages/EditProfile";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

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

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="assignments" element={<TeacherAssignments />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="quiz" element={<QuizManagement />} />
        <Route path="quiz/createQuiz" element={<QuizCreation/>} />
      </Route>

      {/* Student routes */}
      <Route path="/student" element={<StudentDashboard />} />

    </Routes>
  );
};

export default App;
