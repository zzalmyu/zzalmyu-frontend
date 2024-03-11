import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const getaccessTokenExpiryTime = (token: string) => {
  if (token) {
    const decodeToken: { exp: number } = jwtDecode(token);

    return decodeToken.exp * 1000;
  }
};

export const checkTokenToAccess = (accessToken: string) => {
  const accessTokenExpiryTime = getaccessTokenExpiryTime(accessToken);
  const currentTime = Date.now();

  if (accessTokenExpiryTime) {
    const accessTimeUntilExpiry = accessTokenExpiryTime - currentTime;
    const threshold = 30 * 1000;

    return accessTimeUntilExpiry < threshold;
  }

  return false;
};

export const checkTokenToRefresh = (refreshToken: string) => {
  const refreshTokenExpiryTime = getaccessTokenExpiryTime(refreshToken);
  const currentTime = Date.now();

  if (refreshTokenExpiryTime) {
    const refreshTimeUntilExpiry = refreshTokenExpiryTime - currentTime;
    const threshold = 60 * 1000;

    if (refreshTimeUntilExpiry < threshold) {
      toast.error("재로그인이 필요합니다", { autoClose: 2000 });

      return true;
    }
  }

  return false;
};
