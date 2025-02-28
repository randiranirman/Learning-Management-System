import { Routes, Route } from "react-router-dom";
import MyCourses from "./pages/MyCourses";
import Assignments from './pages/Assignments';
import Calender from './pages/Calender';
import Files from './pages/Files';
import Settings from './pages/Settings';
import Profile from "./pages/Profile";
import Grades from "./pages/Grades";
import Header from "./components/header/Header";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<MyCourses />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/calender" element={<Calender />} />
        <Route path="/files" element={<Files />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/grades" element={<Grades />} />
      </Routes>
      <Header />
    </>
    
  )
}

export default App;
