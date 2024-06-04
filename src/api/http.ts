import axios, { AxiosRequestConfig } from "axios";

const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

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

  return axiosInstance;
};

export const httpClient = createClient();

/*
authenticate 전용 axios instance
*/
const _authenticationHttpClient = createClient();
_authenticationHttpClient.interceptors.response.clear();
export const authenticationHttpClient = _authenticationHttpClient;
