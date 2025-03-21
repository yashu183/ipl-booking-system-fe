import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ element, allowedRoles }) => {
  const token  = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const userDetails = jwtDecode(token);
  const expirationTime = userDetails.exp;

  if(!userDetails) {
    return <Navigate to="/login" replace />;
  }

  // check for expiration
  const currentTime = Math.floor(Date.now() / 1000);
  if(currentTime > expirationTime) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles != "ADMIN") {
    return <Navigate to="/home" replace />;
  }

  return element;
};

export default ProtectedRoute;
