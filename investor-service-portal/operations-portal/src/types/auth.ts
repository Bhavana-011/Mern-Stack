export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  role: "ADMIN" | "MANAGER" | "EXECUTIVE" | "INVESTOR";
  id: string;
}

export type UserRole =
  | "ADMIN"
  | "MANAGER"
  | "EXECUTIVE"
  | "INVESTOR";

export interface AuthContextType {
  token: string | null;
  role: UserRole | null;
  userId: string | null;

  isAuthenticated: boolean;

  login: (
    email: string,
    password: string
  ) => Promise<void>;

  logout: () => void;
}