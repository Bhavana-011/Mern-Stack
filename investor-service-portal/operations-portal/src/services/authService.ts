import { loginApi } from "../api/authApi";
import type { LoginRequest } from "../types/auth";
import { storage } from "../utils/storage";

export const authService = {
  async login(data: LoginRequest) {
    const response = await loginApi(data);

    if (response.success) {
      storage.saveAuth(
        response.token,
        response.role,
        response.id
      );
    }

    return response;
  },

  logout() {
    storage.clearAuth();
  },
};