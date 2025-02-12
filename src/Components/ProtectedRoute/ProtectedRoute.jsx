import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';

export default function ProtectedRoute({ children }) {
  const { userToken, isLoading } = useContext(UserContext);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
  }

  return userToken ? children : <Navigate to="/login" replace />;
}
