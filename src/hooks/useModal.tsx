import { ReactNode } from "react";
import { useOverlay } from "@toss/use-overlay";
import Modal from "@/components/common/Modal";

interface Props {
  children?: ReactNode;
}
export function useModal({ children }: Props) {
  const overlay = useOverlay();

  const openModal = () =>
    new Promise((resolve) => {
      overlay.open(({ isOpen, close }) => {
        const handleClose = () => {
          close();
          resolve(false);
        };
        return (
          <>
            <Modal id="id" onClose={handleClose} open={isOpen}>
              {children}
            </Modal>
          </>
        );
      });
    });

  return { open: openModal, close: overlay.close };
}
