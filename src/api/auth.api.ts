import { SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (data: SignupProps) => {
  const response = await httpClient.post("/join", data);

  return response.data;
};
