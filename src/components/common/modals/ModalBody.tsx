import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ModalBody = ({ children }: Props) => {
  return <div>{children}</div>;
};

export default ModalBody;
