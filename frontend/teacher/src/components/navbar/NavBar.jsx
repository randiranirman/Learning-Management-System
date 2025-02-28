import SmallButton from "./SmallButton";
import myCoursesImg from '../../assets/myCoursesImg.svg';
import assignmentImg from '../../assets/assignmentImg.svg';
import calendarImg from '../../assets/calendarImg.svg';
import filesImg from '../../assets/filesImg.svg';
import settingsImg from '../../assets/settingsImg.svg';
import { Link } from "react-router-dom";
import LearnSphereLogo from '../../assets/learnSphere logo.svg';
import CancleVector from '../../assets/Vector.svg';

const navComponents = [
    {icon: myCoursesImg, title: "My Courses", key: 1, path: '/'},
    {icon: assignmentImg, title: "Assignment", key: 2, path: '/assignments'},
    {icon: calendarImg, title: "Calender", key: 3, path: '/calender'},
    {icon: filesImg, title: "Files", key: 4, path: '/files'},
    {icon: settingsImg, title: "Settings", key: 5, path: 'settings'}
]

const NavBar = ({ showNav, onClose }) => {
  return (
    <div className={`fixed top-0 left-0 h-full w-1/4 bg-white shadow-lg z-50 transform ${showNav ? "translate-x-0" : "-translate-x-full"} transition-transform duration-200`}>
      <div className="flex align-center justify-center">
        <img src={CancleVector} alt="cancleVector" className="cursor-pointer" onClick={onClose} />
      </div>
      <div className="flex align-center justify-center">
        <img src={LearnSphereLogo} alt="learnSpherelogo" className="" />
      </div>
      <div className="flex flex-col gap-y-4 [&>*:last-child]:mt-4 ml-2 mr-2"> {/*4 = 8px */}
        {navComponents.map(navComponent => (
            <Link to={navComponent.path} key={navComponent.key}>
              <SmallButton icon={navComponent.icon} title={navComponent.title} />
            </Link>
        ))}
      </div>
    </div>
  )
}

export default NavBar;
