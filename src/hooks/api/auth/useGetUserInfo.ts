import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "@/apis/auth";
import { getLocalStorage } from "@/utils/localStorage";
import { REFRESH_TOKEN } from "@/constants/auth";

const useGetUserInfo = () => {
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  const { data: userInfo, ...rest } = useQuery({
    queryKey: ["userInfo"],
    queryFn: getUserInfo,
    enabled: !!refreshToken,
  });

  return { userInfo, ...rest };
};

export default useGetUserInfo;
