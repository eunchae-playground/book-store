import axios, { AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};

const apiClient = axios.create(axiosConfig);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 토큰이 존재하지 않을경우(403), 토큰 에러(401) 처리
    if (
      [401, 403].includes(error.response.status) &&
      !["/login", "/logout", "/signup"].includes(error.config.url)
    ) {
      window.location.href = "/login";
      return;
    }

    return Promise.reject(error);
  }
);

export default apiClient;
