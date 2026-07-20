import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {

  const role = localStorage.getItem("role");

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedAdminRoute;