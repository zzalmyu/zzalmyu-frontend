import { SendHorizontal } from "lucide-react";

interface Props {
  onClick: () => void;
}
const ChatSendButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="btn flex h-50pxr w-50pxr items-center justify-center rounded-full border-none bg-primary hover:bg-gray-300"
    >
      <SendHorizontal fill="white" aria-label="전송하기" stroke="white" />
    </button>
  );
};

export default ChatSendButton;
