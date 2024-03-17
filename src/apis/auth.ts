import { getLocalStorage } from "@/utils/localStorage";
import { GetUserInformationResponse } from "@/types/user.dto";
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

export const getUserInformation = () =>
  http.get<GetUserInformationResponse>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user/info",
  });
