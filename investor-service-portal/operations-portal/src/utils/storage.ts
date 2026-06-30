import type { UserRole } from "../types/auth";

const TOKEN_KEY = "access_token";
const ROLE_KEY = "user_role";
const USER_ID_KEY = "user_id";

export const storage = {
  saveAuth(
    token: string,
    role: UserRole,
    userId: string
  ) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(ROLE_KEY, role);
    localStorage.setItem(USER_ID_KEY, userId);
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  getRole(): UserRole | null {
    return localStorage.getItem(ROLE_KEY) as UserRole | null;
  },

  getUserId() {
    return localStorage.getItem(USER_ID_KEY);
  },

  clearAuth() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(ROLE_KEY);
    localStorage.removeItem(USER_ID_KEY);
  },

  isAuthenticated() {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};