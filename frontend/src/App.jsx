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
import TeacherSettings from "./roles/teacher/TeacherPages/Settings";
import EditProfile from "./roles/admin/AdminPages/EditProfile";
import FirstLogin from "./pages/FirstLogin"; 
import UnAuthorized from "./pages/UnAuthorized";
import StudentLayout from "./roles/student/StudentLayout/StudentLayout";
import Files from "./roles/teacher/TeacherPages/Files";
import Notifications from "./roles/teacher/TeacherPages/Notifications";
import ProtectedRoute from "./auth/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import RequestReset from "./pages/RequestReset";
//import StudentDashboard from "./roles/student/StudentPages/StudentDashboard";

import CourseRegistration from "./roles/teacher/TeacherPages/Registration";

import Assignment from "./roles/teacher/TeacherPages/Assignments";
import StudentRegistration from "./roles/student/StudentPages/StudentRegistration";



const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/firstLogin" element={<FirstLogin />} />
      <Route path="/request-reset-password" element={<RequestReset />} />

     
      {/* Admin routes 


      <Route element={<ProtectedRoute allowedRoles={["admin"]} />} >*/}
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
      {/*</Routes></Route>*/}
     

      {/* Teacher Routes 
      
      
      <Route element={<ProtectedRoute allowedRoles={["teacher"] } />} >*/}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />  
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="profile" element={<TeacherProfile />} />
        <Route path="assignments" element={<Assignment />} />
        <Route path="registration" element={<CourseRegistration />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="quiz" element={<QuizManagement />} />
        <Route path="notifications" errorElement={<Notifications />} />
        <Route path="quiz/createQuiz" element={<QuizCreation/>} />
        <Route path="files" element={<Files />} />
      </Route>
      {/*</Routes></Route>*/}


      
      {/* Student routes */}
      


      
      <Route path="/student"  element={<StudentLayout/>} >
        <Route index element={<StudentDashboard/>}/>
        <Route path="dashboard" element={<StudentDashboard/>}/>
        <Route path="studentregistration" element={<StudentRegistration/>}/>
      </Route>
      

      <Route path="/teacher" element={<QuizManagement/>} />
      <Route path="/teacher/quiz" element={<QuizCreation />} />


     {/*<Route path="/student/dashboard" element={<StudentDashboard />} />*/}
    </Routes>
  );
};

export default App;
