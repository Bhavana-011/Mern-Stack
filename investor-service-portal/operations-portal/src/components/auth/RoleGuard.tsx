import { useContext } from "react";
import type { ReactNode } from "react";
import { AuthContext } from "../../context/AuthContext";

interface RoleGuardProps {
  roles: string[];
  children: ReactNode;
}

function RoleGuard({
  roles,
  children,
}: RoleGuardProps) {
  const auth = useContext(AuthContext);

  if (!auth) {
    return null;
  }

  if (!auth.role) {
    return null;
  }

  if (!roles.includes(auth.role)) {
    return null;
  }

  return <>{children}</>;
}

export default RoleGuard;