import {
  AuthenticateResponse,
  LoginRequest,
  ResetPasswordAuthenticateRequest,
  ResetPasswordRequest,
  SignupRequest,
} from "../models/auth.model";
import apiClient from "./apiClient";

export const authenticate = async () => {
  const response = await apiClient.post<AuthenticateResponse>("/authenticate");

  return response.data;
};

export const signup = async (req: SignupRequest) => {
  const response = await apiClient.post("/join", req);

  return response.data;
};

export const login = async (req: LoginRequest) => {
  const response = await apiClient.post("/login", req);

  return response.data;
};

export const logout = async () => {
  const response = await apiClient.post("/logout");

  return response.data;
};

export const resetPasswordAuthenticate = async (
  req: ResetPasswordAuthenticateRequest
) => {
  const response = await apiClient.post(
    "/users/reset-password/authenticate",
    req
  );

  return response.data;
};

export const resetPassword = async (req: ResetPasswordRequest) => {
  const response = await apiClient.put("/users/reset-password", req);

  return response.data;
};
