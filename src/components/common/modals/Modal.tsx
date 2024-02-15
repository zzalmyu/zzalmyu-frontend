import { ReactNode } from "react";
import { cn } from "@/utils/tailwind";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";

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
  const handleClickModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    isOpen && (
      <>
        <div
          // eslint-disable-next-line prettier/prettier
          className="overlay fixed left-0 top-0 z-40 h-[100vh] w-[100vw] bg-text-primary/40"
          onClick={onClose}
        >
          <div
            className={cn(
              MODAL_HEIGHT_VARIANTS[size],
              MODAL_WIDTH_VARIANTS[size],
              MODAL_PADDING_VARIANTS[size],
              "fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden rounded-[2rem] bg-background text-text-primary",
            )}
            onClick={handleClickModal}
          >
            {children}
          </div>
        </div>
      </>
    )
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
