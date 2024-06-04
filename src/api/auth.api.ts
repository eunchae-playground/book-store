import { LoginProps } from "../pages/Login";
import { ResetPasswordProps } from "../pages/ResetPassword";
import { SignupProps } from "../pages/Signup";
import { authenticationHttpClient, httpClient } from "./http";

export const authenticate = async () => {
  const response = await authenticationHttpClient.post("/authenticate");

  return response.data;
};

export const signup = async (data: SignupProps) => {
  const response = await httpClient.post("/join", data);

  return response.data;
};

export const login = async (data: LoginProps) => {
  const response = await httpClient.post("/login", data);

  return response.data;
};

export const logout = async () => {
  const response = await httpClient.post("/logout");

  return response.data;
};

export const resetPasswordRequest = async (
  data: Pick<ResetPasswordProps, "email">
) => {
  const response = await httpClient.post("/users/reset-password/request", data);

  return response.data;
};

export const resetPassword = async (
  data: Omit<ResetPasswordProps, "email">
) => {
  const response = await httpClient.put("/users/reset-password/complete", data);

  return response.data;
};
