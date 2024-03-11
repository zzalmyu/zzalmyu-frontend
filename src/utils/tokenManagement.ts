import { jwtDecode } from "jwt-decode";
import { postReissueToken } from "@/apis/auth";

export const getTokenExpiryTime = (accessToken: string) => {
  if (accessToken) {
    const decodeToken: { exp: number } = jwtDecode(accessToken);

    return decodeToken.exp * 1000;
  }
};

export const checkTokenToRefresh = async (accessToken: string) => {
  const tokenExpiryTime = getTokenExpiryTime(accessToken);

  if (tokenExpiryTime) {
    const currentTime = Date.now();
    const timeUntilExpiry = tokenExpiryTime - currentTime;
    const threshold = 60 * 1000;

    if (timeUntilExpiry < threshold) {
      const data = await postReissueToken();

      return data;
    }
  }

  return `Bearer ${accessToken}`;
};
