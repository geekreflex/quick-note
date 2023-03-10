import { Navigate } from 'react-router-dom';

interface RouteProps {
  isLoggedIn: boolean;
  children: React.ReactNode;
}

export const PublicRoute = ({ isLoggedIn, children }: RouteProps) => {
  return isLoggedIn ? <Navigate to="/note" replace /> : <>{children}</>;
};

export const ProtectedRoute = ({ isLoggedIn, children }: RouteProps) => {
  return isLoggedIn ? <>{children}</> : <Navigate to="/enter" replace />;
};
