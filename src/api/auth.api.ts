import {
  LoginRequest,
  ResetPasswordAuthenticateRequest,
  ResetPasswordRequest,
  SignupRequest,
} from "../models/auth.model";
import { authenticationHttpClient, httpClient } from "./http";

export const authenticate = async () => {
  const response = await authenticationHttpClient.post("/authenticate");

  return response.data;
};

export const signup = async (req: SignupRequest) => {
  const response = await httpClient.post("/join", req);

  return response.data;
};

export const login = async (req: LoginRequest) => {
  const response = await httpClient.post("/login", req);

  return response.data;
};

export const logout = async () => {
  const response = await httpClient.post("/logout");

  return response.data;
};

export const resetPasswordAuthenticate = async (
  req: ResetPasswordAuthenticateRequest
) => {
  const response = await httpClient.post(
    "/users/reset-password/authenticate",
    req
  );

  return response.data;
};

export const resetPassword = async (req: ResetPasswordRequest) => {
  const response = await httpClient.put("/users/reset-password", req);

  return response.data;
};
