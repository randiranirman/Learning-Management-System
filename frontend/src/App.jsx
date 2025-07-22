import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import FirstLogin from "./pages/FirstLogin";
import UnAuthorized from "./pages/UnAuthorized";
import ResetPassword from "./pages/ResetPassword";
import RequestReset from "./pages/RequestReset";

// Admin Components
import AdminLayout from "./roles/admin/AdminLayouts/AdminLayout";
import Dashboard from "./roles/admin/AdminPages/Dashboard";
import ManageUsers from "./roles/admin/AdminPages/ManageUsers";
import ManageAssignments from "./roles/admin/AdminPages/ManageAssignments";
import ManageCourses from "./roles/admin/AdminPages/ManageCourses";
import ManageClasses from "./roles/admin/AdminPages/ManageClasses";
import Analytics from "./roles/admin/AdminPages/Analytics";
import Settings from "./roles/admin/AdminPages/Settings";

import StudentDashboard from "./roles/student/StudentPages/StudentDashboard";
import QuizManagement from "./roles/teacher/TeacherPages/QuizManagement";
import QuizCreation from "./roles/teacher/TeacherPages/QuizCreation";
import SubjectPage from './roles/student/StudentPages/SubjectPage';
import TeacherDashboard from "./roles/teacher/TeacherPages/TestDashboard"; // Dashboard is the main teacher dashboard this for testing purposes
import TDashboard from "./roles/teacher/TeacherPages/Dashboard";

import EditProfile from "./roles/admin/AdminPages/EditProfile";
import AdminTasks from "./roles/admin/AdminPages/AdminTasks";
import AdminNotifications from "./roles/admin/AdminPages/AdminNotifications";
import TeacherRegistrationManagement from "./roles/admin/AdminPages/TeacherRegistrationManagement";
import StudentRegistrationManagement from "./roles/admin/AdminPages/StudentRegistrationManagement";

// Teacher Components

import TeacherLayout from "./roles/teacher/TeacherLayouts/TeacherLayout";
import TeacherDashboard from "./roles/teacher/TeacherPages/Dashboard";
import Assignment from "./roles/teacher/TeacherPages/Assignments";
import CourseRegistration from "./roles/teacher/TeacherPages/Registration";
import TeacherSettings from "./roles/teacher/TeacherPages/Settings";
import QuizManagement from "./roles/teacher/TeacherPages/QuizManagement";
import QuizCreation from "./roles/teacher/TeacherPages/QuizCreation";
import Notifications from "./roles/teacher/TeacherPages/Notifications";
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

// Student Components
import StudentLayout from "./roles/student/StudentLayout/StudentLayout";
import StudentDashboard from "./roles/student/StudentPages/StudentDashboard";
import StudentRegistration from "./roles/student/StudentPages/StudentRegistration";
import SubjectPage from './roles/student/StudentPages/SubjectPage';
import StudentNotifications from "./roles/student/StudentPages/StudentNotifications";
import StudentCalender from "./roles/student/StudentPages/StudentCalender";
import StudentAssignment from "./roles/student/StudentPages/StudentAssignment";
import StudentSettings from "./roles/student/StudentPages/StudentSettings";

// Debug Components
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
import AssignmentSubmissions from "./roles/teacher/TeacherPages/AssignmentSubmissions";
import ViewSubmissions from "./roles/teacher/TeacherPages/ViewSubmissions";




// 404 Page
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Routes>
      {/* Public routes */}
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
        <Route path="manage-classes" element={<ManageClasses />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="settings" element={<Settings />} />
        <Route path="manage-tasks" element={<AdminTasks />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="teacherRegistrationManagement" element={<TeacherRegistrationManagement />} />
        <Route path="studentRegistrationsManagement" element={<StudentRegistrationManagement />} />
        <Route path="editProfile" element={<EditProfile />} />

        <Route path="notifications" element={<Notification />} />
        < Route path="editProfile" element={<EditProfile />}  />
        <Route path="analytics/teachers" element={<AllTeachersDisplay />} />
        <Route path="analytics/teacher" element={<AllTeacherAssigedSubjects />} />
        <Route path="analytics/students" element={<AllStudentsDisplay />} />

        {/* Debug routes */}
        <Route path="test" element={<NotificationTest />} />
        <Route path="debug" element={<SignalRDebugger />} />

      </Route>

      {/* Teacher routes */}
      <Route path="/teacher" element={<TeacherLayout />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="dashboard" element={<TeacherDashboard />} />
        <Route path="assignments" element={<Assignment />} />
        <Route path="assignments/:subjectId" element={<Assignment />} />
        <Route path="registration" element={<CourseRegistration />} />
        <Route path="settings" element={<TeacherSettings />} />
        <Route path="quiz" element={<QuizManagement />} />
        <Route path="quiz/createQuiz" element={<QuizCreation />} />

        {/* <Route path="notifications" element={<Notifications />} /> */}
        {/* <Route path="files" element={<Files />} /> */}
        <Route path="files" element={<TestMaterials />} />

        <Route path="notifications" element={<Notifications />} />
        <Route path="files" element={<Files />} />

        <Route path="analytics" element={<TeacherAnalytics />} />
        <Route path="analytics/:subjectId" element={<SubjectStudents />} />
        <Route path="analytics/:subjectId/:studentId" element={<StudentAssignments />} />
        <Route path="analytics/assignments/:subjectId" element={<AssignmentsSubject />} />
        <Route path="analytics/assignments/:subjectId/:assignmentId" element={<AllStudentsPerAssignment />} />
        <Route path="subject/:subjectId" element={<TeacherSubject />} />
        <Route path="subject/:subjectId/view-submissions" element={<AssignmentSubmissions />} />
        <Route path="subject/:subjectId/view-submissions/:assignmentId" element={<ViewSubmissions />} />
      </Route>

      {/* Student routes */}
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="dashboard" element={<StudentDashboard />} />

        <Route path="studentRegistration" element={<StudentRegistration />} />
        {/* <Route path="notifications" element={<StudentNotifications />} /> */}

        <Route path="registration" element={<StudentRegistration />} />
        <Route path="subject/:subjectId" element={<SubjectPage />} />
        <Route path="notifications" element={<StudentNotifications />} />

        <Route path="calendar" element={<StudentCalender />} />
        <Route path="assignments" element={<StudentAssignment />} />
        <Route path="settings" element={<StudentSettings />} />
        <Route path="subject/:subjectId/assignments/submission" element={<AssignmentSubmission />} />
        <Route path="subject/:subjectId" element={<SubjectLayout />}>
        <Route index element={<SubjectPage />} />
          <Route path="assignments" element={<StudentAssignment />} />
        </Route>
      </Route>

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
};

export default App;
