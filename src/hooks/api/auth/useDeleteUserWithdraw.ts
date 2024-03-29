import { useMutation } from "@tanstack/react-query";
import { deleteUserWithdraw } from "@/apis/auth";
import { removeLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const useDeleteUserWithdraw = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: deleteUserWithdraw,
    onSuccess: () => {
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
    },
  });

  return { userWithdraw: mutate, ...rest };
};

export default useDeleteUserWithdraw;
