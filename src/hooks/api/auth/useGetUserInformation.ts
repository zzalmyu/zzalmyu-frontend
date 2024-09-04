import { useQuery } from "@tanstack/react-query";
import { getLocalStorage } from "@/utils/localStorage";
import authQueries from "./queryKeyFactories";
import { REFRESH_TOKEN } from "@/constants/auth";

const useGetUserInformation = () => {
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  const { data: userInformation, ...rest } = useQuery(authQueries.userInformation(refreshToken));

  return { userInformation, ...rest };
};

export default useGetUserInformation;
