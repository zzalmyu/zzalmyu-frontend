import { getLocalStorage } from "@/utils/localStorage";
import { GetUserInfomationResponse } from "@/types/auth.dto";
import http from "./core";
import { REFRESH_TOKEN } from "@/constants/auth";

export const patchLogOut = () =>
  http.patch<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user/logout",
  });

export const deleteUserWithdraw = () =>
  http.delete<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user",
  });

export const getUserInfomation = () =>
  http.get<GetUserInfomationResponse>({ url: "/v1/user/info" });
