import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/auth-context';

export function AuthGuard() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
