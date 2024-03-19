import { useMutation } from "@tanstack/react-query";
import { patchLogOut } from "@/apis/auth";
import { removeLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const useLogout = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: patchLogOut,
    onSuccess: () => {
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
      location.reload();
    },
  });

  return { logout: mutate, ...rest };
};

export default useLogout;
