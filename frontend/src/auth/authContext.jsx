import { useEffect } from "react";
import { createContext, useState } from "react";
import { getUserRole, isAuthenticated, logout } from "../utils/authService";



export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {

  const [userRole, setUserRole] = useState(null);
  const [isAuth,setIsAuth]=useState(false);


  useEffect(() => {
    try {
      const role = getUserRole();
      const authenticated = isAuthenticated();
      setUserRole(role);
      setIsAuth(authenticated);
      console.log("Auth context initialized - Role:", role, "Authenticated:", authenticated);
    } catch (error) {
      console.error("Error getting user role:", error);
      setUserRole(null);
      setIsAuth(false);
    }
  }, []);

  const handleLogin = (role) => {
    setUserRole(role);
    setIsAuth(true);
  };

  const handleLogout = () => {
    logout();
    setUserRole(null);
    setIsAuth(false);
  }

  return (
    <AuthContext.Provider value={{ isAuth, userRole, setUserRole, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

