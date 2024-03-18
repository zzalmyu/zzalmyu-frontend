import axios from "axios";
import { getLocalStorage } from "@/utils/localStorage";
import { GetUserInformationResponse } from "@/types/user.dto";
import { ReissueTokenResponse } from "@/types/auth.dto";
import http from "./core";
import { REFRESH_TOKEN } from "@/constants/auth";

export const patchLogOut = () =>
  http.patch<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user/logout",
  });

export const postReissueToken = async (): Promise<{
  accessTokenResponse: string;
  refreshTokenResponse: string;
}> => {
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  const { headers } = await axios.post<ReissueTokenResponse>(
    `${import.meta.env.VITE_BASE_URL}/v1/user/reissue`,
    {},
    {
      headers: {
        "Authorization-refresh": `Bearer ${refreshToken}`,
        "Content-Type": "application/json",
      },
      timeout: 10000,
    },
  );

  return {
    accessTokenResponse: headers.authorization.split(" ")[1],
    refreshTokenResponse: headers["authorization-refresh"].split(" ")[1],
  };
};

export const deleteUserWithdraw = () =>
  http.delete<void>({
    headers: {
      "Authorization-refresh": `Bearer ${getLocalStorage(REFRESH_TOKEN)}`,
    },
    url: "/v1/user",
  });

export const getUserInformation = () =>
  http.get<GetUserInformationResponse>({ url: "/v1/user/info" });
