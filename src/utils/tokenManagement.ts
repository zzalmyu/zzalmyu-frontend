import { jwtDecode } from "jwt-decode";

export const isExpiredToken = (token: string) => {
  if (!token) return false;

  const { exp: tokenExpirationTime } = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  const threshold = 30;

  if (!tokenExpirationTime) return false;

  const tokenTimeUntilExpiry = tokenExpirationTime - currentTime;

  return tokenTimeUntilExpiry < threshold;
};
