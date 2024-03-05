import { ReactNode } from "react";
import { cn } from "@/utils/tailwind";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import ModalProvider from "./ModalProvider";

const MODAL_WIDTH_VARIANTS = {
  sm: "w-352pxr sm:w-528pxr",
  md: "w-352pxr sm:w-592pxr",
  lg: "w-352pxr sm:w-960pxr ",
};
const MODAL_HEIGHT_VARIANTS = {
  sm: "min-h-240pxr sm:min-h-240pxr",
  md: "min-h-368pxr sm:min-h-368pxr",
  lg: "min-h-560pxr sm:min-h-560pxr",
};

interface Props {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const Modal = ({ children, isOpen, onClose, size = "md", className }: Props) => {
  const handleClickModal = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    isOpen && (
      <ModalProvider onClose={onClose}>
        <div
          className="overlay fixed left-0 top-0 z-40 h-[100vh] w-[100vw] bg-text-primary/40 "
          onClick={onClose}
        >
          <div
            className={cn(
              MODAL_HEIGHT_VARIANTS[size],
              MODAL_WIDTH_VARIANTS[size],
              "fixed left-[50%] top-[50%] z-50 -translate-x-1/2 -translate-y-1/2 overflow-x-hidden rounded-32pxr bg-background text-text-primary ",
              className,
            )}
            onClick={handleClickModal}
          >
            {children}
          </div>
        </div>
      </ModalProvider>
    )
  );
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
