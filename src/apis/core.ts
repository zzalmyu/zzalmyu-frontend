import { toast } from "react-toastify";
import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { checkTokenToRefresh } from "@/utils/tokenManagement";
import { patchLogOut } from "./auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const HTTP_METHODS = {
  GET: "get",
  POST: "post",
  PATCH: "patch",
  PUT: "put",
  DELETE: "delete",
} as const;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(async (config) => {
  const requestUrl = config.url;
  const token = getLocalStorage(ACCESS_TOKEN);

  if (requestUrl === "/v1/user/reissue" || requestUrl === "/v1/user/logout") return config;

  if (token && config.headers) {
    const header = await checkTokenToRefresh(token);
    config.headers.Authorization = header;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const accessToken = response.headers.authorization;
    const refreshToken = response.headers["authorization-refresh"];

    if (accessToken && refreshToken) return { accessToken, refreshToken };

    return response.data;
  },
  async (error) => {
    const status = error.response.status;
    const message = error.response.data.message;

    if (status === 401 && message === "refresh token이 유효하지 않습니다.") {
      toast.error("재로그인이 필요합니다", { autoClose: 1000 });

      await patchLogOut();
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);

      window.location.href = "/";
    }

    Promise.reject(error);
  },
);

const createApiMethod =
  (_axiosInstance: AxiosInstance, methodType: Method) =>
  <T>(config: AxiosRequestConfig): Promise<T> => {
    return _axiosInstance({
      ...config,
      method: methodType,
    });
  };

const http = {
  get: createApiMethod(axiosInstance, HTTP_METHODS.GET),
  post: createApiMethod(axiosInstance, HTTP_METHODS.POST),
  patch: createApiMethod(axiosInstance, HTTP_METHODS.PATCH),
  put: createApiMethod(axiosInstance, HTTP_METHODS.PUT),
  delete: createApiMethod(axiosInstance, HTTP_METHODS.DELETE),
};

export default http;
