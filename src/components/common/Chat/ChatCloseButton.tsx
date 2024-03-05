import { useSetAtom } from "jotai";
import { X } from "lucide-react";
import { $isChatOpen } from "@/store/chat";

const ChatCloseButton = () => {
  const setIsChatOpen = useSetAtom($isChatOpen);
  const handleClickButton = () => {
    setIsChatOpen(false);
  };
  return (
    <button className="btn btn-circle btn-ghost btn-sm" onClick={handleClickButton}>
      <X aria-label="채팅방 숨기기" />
    </button>
  );
};

export default ChatCloseButton;
