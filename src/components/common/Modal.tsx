import { ReactNode } from "react";

const MODAL_PADDING_VARIANTS = {
  sm: "py-[1.5rem] px-[0.5rem]",
  base: "p-[3rem]",
};
const MODAL_WIDTH_VARIANTS = {
  sm: "w-[22rem] sm:w-[33rem]",
  base: "w-[22rem] sm:w-[37rem]",
};
const MODAL_HEIGHT_VARIANTS = {
  sm: "min-h-[15rem] sm:min-h-[15rem]",
  base: "min-h-[23rem] sm:min-h-[23rem]",
};
interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "base";
}

const Modal = ({ children, isOpen, onClose, size = "base" }: Props) => {
  return (
    isOpen && (
      <>
        <div
          className="fixed left-0 top-0 z-40 h-[100vh] w-[100vw] bg-text-primary opacity-40"
          onClick={onClose}
        ></div>

        <div
          className={`${MODAL_HEIGHT_VARIANTS[size]} ${MODAL_WIDTH_VARIANTS[size]} ${MODAL_PADDING_VARIANTS[size]} fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden rounded-[32px] bg-background text-text-primary`}
        >
          {children}
        </div>
      </>
    )
  );
};

interface HeaderProps {
  hasCloseButton?: boolean;
  children: ReactNode;
}
const ModalHeader = ({ hasCloseButton = false, children }: HeaderProps) => {
  return (
    <div className="relative mb-8 text-xl font-extrabold">
      <div className="flex justify-center">{children}</div>
      {hasCloseButton && (
        <button className="absolute rounded-[50%] bg-transparent hover:bg-neutral-300">✕</button>
      )}
    </div>
  );
};

interface BodyProps {
  children: ReactNode;
}
const ModalBody = ({ children }: BodyProps) => {
  return <div>{children}</div>;
};

interface FooterProps {
  children: ReactNode;
}
const ModalFooter = ({ children }: FooterProps) => {
  return <div className="mt-8">{children}</div>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;