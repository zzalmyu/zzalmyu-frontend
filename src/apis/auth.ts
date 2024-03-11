import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { GetHeaderResponse } from "@/types/auth.dto";
import http from "./core";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

export const patchLogOut = () =>
  http.patch<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user/logout",
  });

export const postReissueToken = async () => {
  const { accessToken, refreshToken } = await http.post<GetHeaderResponse>({
    url: "/v1/user/reissue",
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
  });

  setLocalStorage(ACCESS_TOKEN, accessToken.split(" ")[1]);
  setLocalStorage(REFRESH_TOKEN, refreshToken.split(" ")[1]);

  return accessToken;
};
