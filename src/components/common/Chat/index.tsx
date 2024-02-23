import { useRef } from "react";
import { useAtomValue } from "jotai";
import { getSessionStorage, setSessionStorage } from "@/utils/sessionStorage";
import { cn } from "@/utils/tailwind";
import ChatToggleButton from "./ChatToggleButton";
import ChatSection from "./ChatSection";
import ChatMobilePeek from "./ChatMobilePeek";
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
    <div
      className={cn(
        "absolute bottom-0 left-0 h-3/5 w-full transition-transform sm:static sm:h-full sm:w-auto sm:translate-y-0 sm:rounded-none",
        isChatOpen ? "-translate-y-40pxr" : "translate-y-[calc(100%-40px)]",
      )}
    >
      <ChatMobilePeek />
      <div
        className={`absolute -top-70pxr right-5pxr hidden sm:-left-70pxr sm:bottom-15pxr sm:right-auto sm:top-auto sm:block`}
      >
        <ChatToggleButton handleScroll={handleScroll} />
      </div>
      {isChatOpen && <ChatSection ref={chatRoomRef} setScrollPosition={setScrollPosition} />}
    </div>
  );
};

export default Chat;
