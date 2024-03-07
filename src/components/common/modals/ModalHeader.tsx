import { ReactNode } from "react";
import useModalContext from "@/hooks/modals/useModalContext";

interface Props {
  hasCloseButton?: boolean;
  children?: ReactNode;
}

const ModalHeader = ({ hasCloseButton = false, children }: Props) => {
  const onClose = useModalContext();

  return (
    <div className="relative mb-8 text-xl font-extrabold">
      <div className="flex justify-center">{children}</div>
      {hasCloseButton && (
        <button
          className="absolute -right-30pxr -top-30pxr h-40pxr w-40pxr rounded-full bg-transparent transition-colors hover:bg-neutral-300"
          aria-label="모달 닫기"
          onClick={onClose}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ModalHeader;
