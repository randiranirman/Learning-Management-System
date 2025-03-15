import React from "react";
import { Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./Login";
import AdminLayout from "../roles/admin/AdminLayouts/AdminLayout";
import Dashboard from "../roles/admin/AdminPages/Dashboard";
import ManageUsers from "../roles/admin/AdminPages/ManageUsers";
import ManageAssignments from "../roles/admin/AdminPages/ManageAssignments";
import ManageCourses from "../roles/admin/AdminPages/ManageCourses";
import Analytics from "../roles/admin/AdminPages/Analytics";
import Settings from "../roles/admin/AdminPages/Settings";
import MyCourses from "../roles/teacher/TeacherPages/MyCourses";
import StudentDashboard from "../roles/student/StudentPages/StudentDashboard";

const App = () => {
  return (
    <div className='m-50 place-content-between text-white  items-center justify-between bg-cover border-6 border-[#8f58ee]  rounded-3xl shadow-2xl bg-fixed' style={{"backgroundImage":"url(../src/assets/bg.png)"}}   >
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-assignments" element={<ManageAssignments />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="/teacher/myCourses" element={<MyCourses />} />

      <Route path="/student/dashboard" element={<StudentDashboard />} />
    </Routes>
    </div>
  );
};



export default App;
