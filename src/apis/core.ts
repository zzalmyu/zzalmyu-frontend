import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { getLocalStorage, removeLocalStorage } from "@/utils/localStorage";
import { checkTokenToAccess, checkTokenToRefresh } from "@/utils/tokenManagement";
import { patchLogOut, postReissueToken } from "./auth";
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
  const accessToken = getLocalStorage(ACCESS_TOKEN);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  if (requestUrl === "/v1/user/reissue") return config;

  config.headers.Authorization = `Bearer ${accessToken}`;

  if (refreshToken && checkTokenToRefresh(refreshToken)) {
    removeLocalStorage(ACCESS_TOKEN);
    removeLocalStorage(REFRESH_TOKEN);
    await patchLogOut();
    window.location.href = "/";

    return config;
  }

  if (accessToken && checkTokenToAccess(accessToken)) {
    config.headers.Authorization = await postReissueToken();
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
  async (error) => Promise.reject(error),
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
