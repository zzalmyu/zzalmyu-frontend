import axios, { AxiosInstance, AxiosRequestConfig, Method } from "axios";
import { getLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN } from "@/constants/auth";

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

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxMDc2NjQwMywiZW1haWwiOiJrZXJvcm85MDczQGdtYWlsLmNvbSJ9.GzyrggGmv9R6rHvJg1CElvS8Xk0rEb3o_W88XNgP7Cs2fvSSElNVdD73XL8ECY0KsLSCr-LYnfBbY1wMhc4_lg`;

  const token = getLocalStorage(ACCESS_TOKEN);

  if (token && config.headers) {
    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBY2Nlc3NUb2tlbiIsImV4cCI6MTcxMDc2NjQwMywiZW1haWwiOiJrZXJvcm85MDczQGdtYWlsLmNvbSJ9.GzyrggGmv9R6rHvJg1CElvS8Xk0rEb3o_W88XNgP7Cs2fvSSElNVdD73XL8ECY0KsLSCr-LYnfBbY1wMhc4_lg`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error),
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
