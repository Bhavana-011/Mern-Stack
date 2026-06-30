import {
  createContext,
  useState,
} from "react";
import type { ReactNode } from "react";

import { authService } from "../services/authService";
import { storage } from "../utils/storage";

import type {
  AuthContextType,
  UserRole,
} from "../types/auth";

interface Props {
  children: ReactNode;
}

export const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: Props) {
  const [token, setToken] = useState<string | null>(
  storage.getToken()
);

const [role, setRole] = useState<UserRole | null>(
  storage.getRole()
);

const [userId, setUserId] = useState<string | null>(
  storage.getUserId()
);
  async function login(
    email: string,
    password: string
  ) {
    const response =
      await authService.login({
        email,
        password,
      });

    setToken(response.token);
    setRole(response.role);
    setUserId(response.id);
  }

  function logout() {
    authService.logout();

    setToken(null);
    setRole(null);
    setUserId(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        userId,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}