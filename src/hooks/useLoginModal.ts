import { useSetAtom } from "jotai";
import { loginModalOpenAtom } from "@/store/loginModalOpenAtom";

export const useLoginModal = () => {
  const setLoginModal = useSetAtom(loginModalOpenAtom);
  const handleClickLogin = () => {
    setLoginModal(true);
  };

  return { handleClickLogin };
};
