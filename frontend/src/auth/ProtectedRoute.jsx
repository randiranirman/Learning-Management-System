import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './authContext';

const ProtectedRoute = ({allowedRoles}) => {
    const {isAuth , userRole} = useContext(AuthContext);

    if( !isAuth){
        return  <Navigate to="/" replace />// redirect to the login page if not authenticated

    }
    if( allowedRoles && !allowedRoles.includes(userRole)){
        return <Navigate to="/unauthorized" replace /> // redirect to unauthorized page if user role is not allowed
    }


  return (
    <Outlet /> // render the child components if authenticated and authorized
  )
}

export default ProtectedRoute
