import { useAtomValue } from "jotai";
import { SendHorizontal } from "lucide-react";
import { $previewImage } from "@/store/chat";

interface Props {
  onClick: () => void;
}
const ChatSendButton = ({ onClick }: Props) => {
  const previewImage = useAtomValue($previewImage);

  return (
    <button
      onClick={onClick}
      disabled={!previewImage}
      className="btn flex h-50pxr w-50pxr items-center justify-center rounded-full border-none bg-primary hover:bg-gray-300"
    >
      <SendHorizontal fill="white" aria-label="전송하기" stroke="white" />
    </button>
  );
};

export default ChatSendButton;
