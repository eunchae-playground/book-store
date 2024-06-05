import { AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

export default config;
