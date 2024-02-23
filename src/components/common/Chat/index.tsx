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
    //  overflow-x-clip sm:overflow-x-auto sm:overflow-y-clip
    <div className="relative h-full border-2 border-blue-300 bg-neutral sm:h-full ">
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
