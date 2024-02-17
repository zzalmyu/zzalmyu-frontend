import { useAtom } from "jotai";
import { ChevronsRight, MessageSquareMore } from "lucide-react";
import { $isChatOpen } from "@/store/chat";

const ChatToggleButton = () => {
  const [isOpen, setIsOpen] = useAtom($isChatOpen);
  const handleClickToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      onClick={handleClickToggle}
      className="flex h-60pxr w-60pxr items-center justify-center rounded-full bg-primary text-white"
    >
      {isOpen && <ChevronsRight aria-label="채팅 닫기" size={36} />}
      {!isOpen && <MessageSquareMore aria-label="채팅 열기" size={36} />}
    </button>
  );
};

export default ChatToggleButton;
