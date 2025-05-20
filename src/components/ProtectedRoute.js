import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const username = localStorage.getItem("username");
  const tenant = localStorage.getItem("tenant");
  const role = localStorage.getItem("role");

  if (!username || !tenant || !role) {
    return <Navigate to="/" replace />; // redirect to login
  }

  return children;
};

export default ProtectedRoute;
