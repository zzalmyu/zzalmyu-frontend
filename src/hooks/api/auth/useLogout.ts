import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { patchLogOut } from "@/apis/auth";
import { removeLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const useLogout = () => {
  const navigate = useNavigate();

  const { mutate, ...rest } = useMutation({
    mutationFn: patchLogOut,
    onSuccess: () => {
      removeLocalStorage(ACCESS_TOKEN);
      removeLocalStorage(REFRESH_TOKEN);
      navigate({ to: "/" });
    },
    onError: (error) => {
      console.error(error);
      toast.error("로그아웃에 실패하였습니다 다시 시도해주세요.");
    },
  });

  return { logout: mutate, ...rest };
};

export default useLogout;
