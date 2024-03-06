import { Fragment, useRef } from "react";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { cn } from "@/utils/tailwind";
import MessagePeek from "./MessagePeek";
import ZzalMessage from "./ZzalMessage";
import GreetMessage from "./GreetMessage";
import { $isChatOpen } from "@/store/chat";
import useChat from "@/hooks/chat/useChat";

const Chat = () => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);

  const setScrollToBottom = () => {
    if (!chatRoomRef.current) return;
    chatRoomRef.current.scrollTo(0, chatRoomRef.current.scrollHeight);
  };

  const { handleSendMessage, messages } = useChat(setScrollToBottom);

  const handleClickSend = () => handleSendMessage("zzal");

  const handleClickChatCloseButton = () => {
    setIsChatOpen(false);
  };

  const handleClickChatToggleButton = () => {
    setIsChatOpen((prev) => !prev);
  };

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
        <div className="relative h-[calc(100%-3.75rem)] w-full rounded-16pxr">
          <div ref={chatRoomRef} className="flex h-full flex-1 flex-col overflow-y-auto pb-30pxr">
            {messages.map((message, index) => (
              <Fragment key={`${index}-${message.nickname}`}>
                {"image" in message && (
                  <ZzalMessage
                    src={message.image}
                    isMyMessage={false}
                    nickname={message.nickname}
                  />
                )}
                {"message" in message && <GreetMessage nickname={message.nickname} />}
              </Fragment>
            ))}
          </div>
          <MessagePeek onClickSend={handleClickSend} />
        </div>
      </div>
    </Fragment>
  );
};

export default Chat;
