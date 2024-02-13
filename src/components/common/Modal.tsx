import React from "react";
import { createPortal } from "react-dom";
type Props = {
  children: React.ReactNode;
  id: string;
  open: boolean;
  onClose: () => void;
  hasCloseButton?: boolean;
};

const Modal = ({ id, children, open, onClose, hasCloseButton }: Props) => {
  return createPortal(
    <dialog className={`modal ${open ? "modal-open" : ""}`} id={id}>
      <div className="modal-box h-[23rem] w-[20rem] bg-background pt-[70px] sm:h-[23rem] sm:w-[37rem]">
        <>
          {hasCloseButton && (
            <form method="dialog">
              <button
                className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
          )}
          {children}
        </>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>,
    document.body,
  );
};

export default Modal;
