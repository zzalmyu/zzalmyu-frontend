import { useRef } from "react";
import { useAtomValue } from "jotai";
import { getSessionStorage, setSessionStorage } from "@/utils/sessionStorage";
import ChatToggleButton from "./ChatToggleButton";
import ChatSection from "./ChatSection";
import { $isChatOpen } from "@/store/chat";

const Chat = () => {
  const isChatOpen = useAtomValue($isChatOpen);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chatRoomRef.current) return;
    setSessionStorage("sidebar-scroll", chatRoomRef.current?.scrollTop);
  };
  const setScrollPosition = () => {
    if (!chatRoomRef.current) return;
    const top = getSessionStorage("sidebar-scroll");
    if (top !== null) {
      chatRoomRef.current.scrollTop = parseInt(top, 10);
    }
  };
  return (
    <div className="relative overflow-y-clip">
      <div className="absolute -left-70pxr bottom-15pxr ">
        <ChatToggleButton handleScroll={handleScroll} />
      </div>
      {isChatOpen && <ChatSection ref={chatRoomRef} setScrollPosition={setScrollPosition} />}
    </div>
  );
};

export default Chat;
