import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
const Messages = ({ children }: Props) => {
  return <div className="flex flex-1 flex-col ">{children}</div>;
};

export default Messages;
