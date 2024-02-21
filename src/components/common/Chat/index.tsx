import { useAtomValue } from "jotai";
import ChatToggleButton from "./ChatToggleButton";
import ChatSection from "./ChatSection";
import { $isChatOpen } from "@/store/chat";

const Chat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <div className="relative">
      <div className="absolute -left-70pxr bottom-15pxr">
        <ChatToggleButton />
      </div>
      {isChatOpen && <ChatSection />}
    </div>
  );
};

export default Chat;
