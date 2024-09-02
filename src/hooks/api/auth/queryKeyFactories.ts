import { queryOptions } from "@tanstack/react-query";
import { getUserInformation } from "@/apis/auth";

const authQueryKeys = {
  all: () => ["auth"],
  usersInformation: () => [...authQueryKeys.all(), "userInformation"],
  userInformation: (refreshToken: string) => [...authQueryKeys.usersInformation(), refreshToken],
};

const authQueries = {
  all: () => authQueryKeys.all(),
  usersInformation: () => authQueryKeys.usersInformation(),
  userInformation: (refreshToken: string) =>
    queryOptions({
      queryKey: authQueryKeys.userInformation(refreshToken),
      queryFn: getUserInformation,
      enabled: !!refreshToken,
    }),
};

export default authQueries;
