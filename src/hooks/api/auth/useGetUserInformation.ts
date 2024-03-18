import { useQuery } from "@tanstack/react-query";
import { getUserInformation } from "@/apis/auth";
import { getLocalStorage } from "@/utils/localStorage";
import { REFRESH_TOKEN } from "@/constants/auth";

const useGetUserInformation = () => {
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  const { data: userInformation, ...rest } = useQuery({
    queryKey: ["userInformation"],
    queryFn: getUserInformation,
    enabled: !!refreshToken,
  });

  return { userInformation, ...rest };
};

export default useGetUserInformation;
