import { queryOptions } from "@tanstack/react-query";
import { getUserInformation } from "@/apis/auth";

export const authQueries = {
  all: ["auth"] as const,
  userInformationKey: () => [...authQueries.all, "userInfomation"] as const,
  getUserInformation: (refreshToken: string) =>
    queryOptions({
      queryKey: [...authQueries.userInformationKey()] as const,
      queryFn: getUserInformation,
      enabled: !!refreshToken,
    }),
};
