import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ButtonContainer = ({ children }: Props) => {
  return <div className="absolute right-2 top-2 w-fit">{children}</div>;
};
export default ButtonContainer;
