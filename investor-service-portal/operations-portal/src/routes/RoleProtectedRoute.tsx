import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export default function RoleProtectedRoute({
  children,
  allowedRoles,
}: Props) {
  const auth = useContext(AuthContext);

  if (!auth) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(auth.role ?? "")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}