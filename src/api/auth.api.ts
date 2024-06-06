import {
  AuthenticateResponse,
  LoginRequest,
  ResetPasswordAuthenticateRequest,
  ResetPasswordRequest,
  SignupRequest,
} from "../models/auth.model";
import axiosInstance from "./axios/axiosInstance";

export const authenticate = async () => {
  const response = await axiosInstance.post<AuthenticateResponse>(
    "/authenticate"
  );

  return response.data;
};

export const signup = async (req: SignupRequest) => {
  const response = await axiosInstance.post("/join", req);

  return response.data;
};

export const login = async (req: LoginRequest) => {
  const response = await axiosInstance.post("/login", req);

  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/logout");

  return response.data;
};

export const resetPasswordAuthenticate = async (
  req: ResetPasswordAuthenticateRequest
) => {
  const response = await axiosInstance.post(
    "/users/reset-password/authenticate",
    req
  );

  return response.data;
};

export const resetPassword = async (req: ResetPasswordRequest) => {
  const response = await axiosInstance.put("/users/reset-password", req);

  return response.data;
};
