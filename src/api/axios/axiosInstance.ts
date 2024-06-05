import axios from "axios";
import config from "./config";

const axiosInstance = axios.create(config);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 토큰이 존재하지 않을경우(403), 토큰 에러(401) 처리
    if (
      [401, 403].includes(error.response.status) &&
      !["/login", "logout", "signup"].includes(error.config.url)
    ) {
      window.location.href = "/login";
      return;
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
