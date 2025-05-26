import { useEffect } from "react";
import { createContext, useState } from "react";
import { getUserRole, isAuthenticated, logout } from "../utils/authService";



export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {

  const [userRole, setUserRole] = useState(null);
  const [isAuth,setIsAuth]=useState(false);


  useEffect(() => {
    const role = getUserRole();
    setUserRole(role);
    setIsAuth(isAuthenticated());
  }, []);

  const handleLogout = () => {
    logout();
    setUserRole(null);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth,userRole ,setUserRole,  handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

