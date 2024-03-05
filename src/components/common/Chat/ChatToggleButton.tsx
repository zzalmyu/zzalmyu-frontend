import { useAtom } from "jotai";
import { $isChatOpen } from "@/store/chat";

const ChatToggleButton = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  const handleClickButton = () => {
    setIsChatOpen((prev) => !prev);
  };
  return (
    <button
      className="btn btn-ghost btn-sm rounded-full outline outline-1 outline-border"
      onClick={handleClickButton}
    >
      {isChatOpen && "채팅방 숨기기"}
      {!isChatOpen && "채팅방 보기"}
    </button>
  );
};

export default ChatToggleButton;
