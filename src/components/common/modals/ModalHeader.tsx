import { ReactNode } from "react";

interface Props {
  hasCloseButton?: boolean;
  children: ReactNode;
}

const ModalHeader = ({ hasCloseButton = false, children }: Props) => {
  return (
    <div className="relative mb-8 text-xl font-extrabold">
      <div className="flex justify-center">{children}</div>
      {hasCloseButton && (
        <button
          className="absolute rounded-[50%] bg-transparent hover:bg-neutral-300"
          aria-label="모달 닫기"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default ModalHeader;
