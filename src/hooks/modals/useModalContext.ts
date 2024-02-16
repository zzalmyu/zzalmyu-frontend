import { useContext } from "react";
import { ModalContext } from "@/components/common/modals/ModalProvider";

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext는 ModalContext.Provider 안에서 호출되어야 합니다");
  }
  return context;
};

export default useModalContext;
