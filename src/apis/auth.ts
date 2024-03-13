import { getLocalStorage } from "@/utils/localStorage";
import http from "./core";
import { REFRESH_TOKEN } from "@/constants/auth";

export const patchLogOut = () =>
  http.patch<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user/logout",
  });
