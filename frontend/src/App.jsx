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
import SubjectPage from './roles/student/StudentPages/SubjectPage';
import TeacherDashboard from "./roles/teacher/TeacherPages/TestDashboard"; // Dashboard is the main teacher dashboard this for testing purposes
import TDashboard from "./roles/teacher/TeacherPages/Dashboard";
import TeacherLayout from "./roles/teacher/TeacherLayouts/TeacherLayout";
import TeacherSettings from "./roles/teacher/TeacherPages/Settings";
import EditProfile from "./roles/admin/AdminPages/EditProfile";
import FirstLogin from "./pages/FirstLogin"; 
import UnAuthorized from "./pages/UnAuthorized";
import StudentLayout from "./roles/student/StudentLayout/StudentLayout";
import Files from "./roles/teacher/TeacherPages/Files";
// import Notifications from "./roles/teacher/TeacherPages/Notifications";
// import Notifications from "./roles/teacher/TeacherPages/Notifications";
import ProtectedRoute from "./auth/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import RequestReset from "./pages/RequestReset";
import CourseRegistration from "./roles/teacher/TeacherPages/Registration";
import Assignment from "./roles/teacher/TeacherPages/Assignments";
import StudentRegistration from "./roles/student/StudentPages/StudentRegistration";
// import StudentNotifications from "./roles/student/StudentPages/StudentNotifications";
import TeacherAnalytics from "./roles/teacher/TeacherPages/TeacherAnalytics";
import SubjectStudents from "./roles/teacher/TeacherPages/SubjectStudents";
import StudentAssignments from "./roles/teacher/TeacherPages/StudentAssignments";
import AssignmentsSubject from "./roles/teacher/TeacherPages/AssignmentsSubject";
import AllStudentsPerAssignment from "./roles/teacher/TeacherPages/AllStudentsPerAssignment";
import StudentAssignment from "./roles/student/StudentPages/StudentAssignment";
import StudentSettings from "./roles/student/StudentPages/StudentSettings";
import AdminTasks from "./roles/admin/AdminPages/AdminTasks";
import TeacherRegistrationManagement from "./roles/admin/AdminPages/TeacherRegistrationManagement";
import StudentCalender from "./roles/student/StudentPages/StudentCalender";
import StudentRegistrationManagement from "./roles/admin/AdminPages/StudentRegistrationManagement";
// import AdminNotifications from "./roles/admin/AdminPages/AdminNotifications";
import NotificationTest from "./test/NotificationTest";
import SignalRDebugger from "./components/SignalRDebugger";
import ManageClasses from "./roles/admin/AdminPages/ManageClasses";



import AllTeachersDisplay from "./roles/admin/AdminPages/AllTeachersDisplay";
import AllStudentsDisplay from "./roles/admin/AdminPages/AllStudentsDisplay";
import AllTeacherAssigedSubjects from "./roles/admin/AdminPages/AllTeacherAssigedSubjects";
import TeacherSubject from "./roles/teacher/TeacherPages/TeacherSubject";
import TestMaterials from "./roles/teacher/TeacherPages/TestMaterials";
import AssignmentSubmission from "./roles/student/StudentPages/AssignmentSubmission";
import SubjectLayout from "./roles/student/StudentLayout/SubjectLayout";




const App = () => {
  return (
    
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/firstLogin" element={<FirstLogin />} />
      <Route path="/request-password-reset" element={<RequestReset />} />

     
      {/* Admin routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-assignments" element={<ManageAssignments />} />
        <Route path="manage-courses" element={<ManageCourses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="manage-tasks" element={<AdminTasks />} />
        {/* <Route path="notifications" element={<AdminNotifications />} /> */}
        <Route path="test" element={<NotificationTest />} />
        <Route path="debug" element={<SignalRDebugger />} />
        <Route path="manage-classes" element={<ManageClasses />} />
        <Route path="teacherRegistrationManagement" element={<TeacherRegistrationManagement />} />
        <Route path="studentRegistrationsManagement" element={<StudentRegistrationManagement />} />
        <Route path="editProfile" element={<EditProfile />} />
        <Route path="notifications" element={<Notification />} />
        < Route path="editProfile" element={<EditProfile />}  />
        <Route path="analytics/teachers" element={<AllTeachersDisplay />} />
        <Route path="analytics/teacher" element={<AllTeacherAssigedSubjects />} />
        <Route path="analytics/students" element={<AllStudentsDisplay />} />
      </Route>

      {/* Teacher Routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="assignments" element={<Assignment />} />
        <Route path="dashboard-old" element={<TDashboard />} />
        <Route path="assignments/:subjectId" element={<Assignment />} />
        <Route path="registration" element={<CourseRegistration />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="quiz" element={<QuizManagement />} />
        <Route path="quiz/createQuiz" element={<QuizCreation />} />
        {/* <Route path="notifications" element={<Notifications />} /> */}
        <Route path="files" element={<Files />} />
        <Route path="files" element={<TestMaterials />} />
        <Route path="analytics" element={<TeacherAnalytics />} />
        <Route path="analytics/:subjectId" element={<SubjectStudents />} />
        <Route path="analytics/:subjectId/:studentId" element={<StudentAssignments />} />
        <Route path="analytics/assignments/:subjectId" element={<AssignmentsSubject />} />
        <Route path="analytics/assignments/:subjectId/:assignmentId" element={<AllStudentsPerAssignment />} />
        <Route path="subject/:subjectId" element={<TeacherSubject />} />
      </Route>


      

      {/* Student routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="studentRegistration" element={<StudentRegistration />} />
        {/* <Route path="notifications" element={<StudentNotifications />} /> */}
        <Route path="calendar" element={<StudentCalender />} />
        <Route path="assignments" element={<StudentAssignment />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="subject/:subjectId/assignments/submission" element={<AssignmentSubmission />} />
        <Route path="subject/:subjectId" element={<SubjectLayout />}>
        <Route index element={<SubjectPage />} />
          <Route path="assignments" element={<StudentAssignment />} />
        </Route>
      </Route>
      
    </Routes>
  );
};

export default App;
