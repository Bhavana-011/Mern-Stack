import api from "./axios";

import type { LoginRequest, LoginResponse } from "../types/auth";

export const loginApi = async (
  data: LoginRequest
): Promise<LoginResponse> => {

  const response = await api.post<LoginResponse>(
    "/admin/login",
    data
  );

  return response.data;
};