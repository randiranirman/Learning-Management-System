import { myCoursesImg, calendarImg, quizManagementImg, assignmentImg, settingsImg, courseImgVector } from "../../../assets/assets";
import FullHeaderTemplate from "../../../components/FullHearderTemplate/FullHeaderTemplate";

const teacherDropDownProps = [
  {key: 1, title: "Profile", path: '/teacher/profile'},
  {key: 2, title: "Courses", path: '/teacher/courses'},
  {key: 3, title: "Settings", path: '/teacher/settings'},
  {key: 4, title: "Log out", path: '#'},
]

const teacherSideNavComponents = [
  {icon: myCoursesImg, title: "Dashboard", key: 1, path: '/teacher'},
  {icon: calendarImg, title: "Assignments", key: 2, path: '/teacher/assignments'},
  {icon: quizManagementImg, title: "Quiz", key: 3, path: '/teacher/quiz'},
  {icon: assignmentImg, title: "Submissions", key: 4, path: '/teacher/files'},
  {icon: settingsImg, title: "Settings", key: 5, path: '/teacher/settings'}
]

const TeacherFullHeader = () => {
  return (
    <FullHeaderTemplate DropDownProps={teacherDropDownProps} SideNavProps={teacherSideNavComponents} />
  )
}

export default TeacherFullHeader;