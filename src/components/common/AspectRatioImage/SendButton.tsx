import { SendHorizontal } from "lucide-react";

interface Props {
  onClick: () => void;
}

const SendButton = ({ onClick }: Props) => {
  return (
    <div
      className="mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary"
      onClick={onClick}
    >
      <SendHorizontal aria-label="보내기" size={20} fill="white" />
    </div>
  );
};

export default SendButton;
