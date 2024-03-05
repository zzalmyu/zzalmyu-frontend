import { useRef } from "react";
import { useAtomValue } from "jotai";
import { setSessionStorage } from "@/utils/sessionStorage";
import { cn } from "@/utils/tailwind";
import ChatSection from "./ChatSection";
import ChatPeek from "./ChatPeek";
import { $isChatOpen } from "@/store/chat";

const Chat = () => {
  const isChatOpen = useAtomValue($isChatOpen);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (!chatRoomRef.current) return;
    setSessionStorage("sidebar-scroll", chatRoomRef.current?.scrollTop);
  };

  const setScrollToBottom = () => {
    if (!chatRoomRef.current) return;
    chatRoomRef.current.scrollTo(0, chatRoomRef.current.scrollHeight);
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 flex h-3/5 w-full flex-col transition-transform sm:static sm:h-full sm:w-auto sm:translate-y-0 sm:flex-row",
        isChatOpen ? "" : "translate-y-[calc(100%-2.5rem)]",
      )}
    >
      <ChatPeek handleScroll={handleScroll} />
      {isChatOpen && <ChatSection ref={chatRoomRef} handleScrollPosition={setScrollToBottom} />}
    </div>
  );
};

export default Chat;
