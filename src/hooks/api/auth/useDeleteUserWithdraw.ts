import { useMutation } from "@tanstack/react-query";
import { deleteUserWithdraw } from "@/apis/auth";

const useDeleteUserWithdraw = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: deleteUserWithdraw,

    onError: (error) => console.error("유저 탈퇴 실패", error),
  });

  return { userWithdraw: mutate, ...rest };
};

export default useDeleteUserWithdraw;
