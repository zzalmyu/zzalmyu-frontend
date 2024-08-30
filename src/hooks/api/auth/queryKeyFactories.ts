import { queryOptions } from "@tanstack/react-query";
import { getUserInformation } from "@/apis/auth";

export const authQueries = {
  all: () => ["auth"],
  usersInformation: () => [...authQueries.all(), "userInformation"],
  userInformation: (refreshToken: string) =>
    queryOptions({
      queryKey: [...authQueries.usersInformation(), refreshToken],
      queryFn: getUserInformation,
      enabled: !!refreshToken,
    }),
};
