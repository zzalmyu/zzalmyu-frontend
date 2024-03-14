import { toast } from "react-toastify";
import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { isExpiredToken } from "@/utils/tokenManagement";
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
  const accessToken = getLocalStorage(ACCESS_TOKEN);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  config.headers.Authorization = `Bearer ${accessToken}`;

  if (refreshToken && isExpiredToken(refreshToken)) {
    toast.error("재로그인이 필요합니다", { autoClose: 2000 });
    removeLocalStorage(ACCESS_TOKEN);
    removeLocalStorage(REFRESH_TOKEN);

    await patchLogOut();

    window.location.href = "/";

    return config;
  }

  if (accessToken && isExpiredToken(accessToken)) {
    const { accessTokenResponse, refreshTokenResponse } = await postReissueToken();

    setLocalStorage(ACCESS_TOKEN, accessTokenResponse);
    setLocalStorage(REFRESH_TOKEN, refreshTokenResponse);

    config.headers.Authorization = `Bearer ${accessTokenResponse}`;
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
