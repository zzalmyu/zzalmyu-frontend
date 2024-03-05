import { Fragment, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { getSessionStorage } from "@/utils/sessionStorage";
import { cn } from "@/utils/tailwind";
import MessagePeek from "./MessagePeek";
import ChatSection from "./ChatSection";
import { $isChatOpen } from "@/store/chat";

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const setScrollToBottom = () => {
    if (!chatRoomRef.current) return;
    chatRoomRef.current.scrollTo(0, chatRoomRef.current.scrollHeight);
  };

  const handleClickChatCloseButton = () => {
    setIsChatOpen(false);
  };

  const handleClickChatToggleButton = () => {
    setIsChatOpen((prev) => !prev);
  };

  useEffect(() => {
    const setScrollPosition = () => {
      if (!chatRoomRef.current) return;
      const top = getSessionStorage("chat-room-scroll");
      if (top !== null) {
        chatRoomRef.current.scrollTop = Number(top);
      }
    };

    setScrollPosition();
  }, []);

  return (
    <Fragment>
      <div
        className={cn(
          "absolute top-0 z-10 flex h-60pxr items-center justify-between border border-border bg-background px-4 transition-[width] duration-500 ease-in-out",
          isChatOpen ? "w-[67%]" : "w-full",
        )}
      >
        <div className="text-xl font-bold text-text-primary">TITLE</div>
        <button
          className="btn btn-ghost btn-sm rounded-full outline outline-1 outline-border"
          onClick={handleClickChatToggleButton}
        >
          {isChatOpen && "채팅방 숨기기"}
          {!isChatOpen && "채팅방 보기"}
        </button>
      </div>
      <div
        className={cn(
          "absolute right-0 h-full w-[33%] transition-[opacity_transform] duration-500 ease-in-out",
          isChatOpen ? "opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <div className="sticky left-0 right-0 top-0 flex h-60pxr flex-1 items-center justify-between border-y border-border px-4">
          <div className="text-xl font-bold text-text-primary">고독한 채팅방</div>
          <button className="btn btn-circle btn-ghost btn-sm" onClick={handleClickChatCloseButton}>
            <X aria-label="채팅방 숨기기" />
          </button>
        </div>
        <section className="relative h-full w-full">
          <div
            ref={chatRoomRef}
            className="relative h-full w-full overflow-y-auto rounded-16pxr bg-background pb-15pxr"
          >
            <ChatSection ref={chatRoomRef} handleScrollPosition={setScrollToBottom} />
            {/* <div className="flex flex-1 flex-col ">
              {DUMMY_MESSAGES.map(({ src, isMyMessage }, index) => (
                <Message key={`${index}-${src}`} src={src} isMyMessage={isMyMessage} />
              ))}
            </div> */}
          </div>
          <MessagePeek onClickSend={() => {}} />
        </section>
      </div>
    </Fragment>
  );
};

export default Chat;
