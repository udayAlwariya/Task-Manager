import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user || Object.keys(user).length === 0) {
  return <Navigate to="/register" />;
}
  return children;
}
