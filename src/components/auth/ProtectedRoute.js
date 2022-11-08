import { useLocation, Navigate } from 'react-router-dom';
import { useAuth } from './useAuth.js';

export default function ProtectedRoute({children}) {
  const { loggedinUser } = useAuth();
  const location = useLocation();
  return loggedinUser
    ? children
    : <Navigate to="/login" replace state={{ path: location.pathname }} />;
}
