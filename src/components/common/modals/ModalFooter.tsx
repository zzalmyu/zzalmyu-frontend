import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ModalFooter = ({ children }: Props) => {
  return <div className="mt-8">{children}</div>;
};

export default ModalFooter;
