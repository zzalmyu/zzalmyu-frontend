"use client";

import { ReactNode, createContext } from "react";

export const ModalContext = createContext<(() => void) | undefined>(undefined);

interface Props {
  onClose: () => void;
  children: ReactNode;
}

const ModalProvider = ({ onClose, children }: Props) => {
  return <ModalContext.Provider value={onClose}>{children}</ModalContext.Provider>;
};

export default ModalProvider;
