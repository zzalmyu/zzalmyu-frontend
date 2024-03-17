import { Fragment, useRef } from "react";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import MessagePeek from "./MessagePeek";
import ZzalMessage from "./ZzalMessage";
import GreetMessage from "./GreetMessage";
import { $isChatOpen } from "@/store/chat";
import useChat from "@/hooks/chat/useChat";

const Chat = () => {
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const isChatOpen = useAtomValue($isChatOpen);

  const setScrollToBottom = () => {
    if (!chatRoomRef.current) return;
    chatRoomRef.current.scrollTo(0, chatRoomRef.current.scrollHeight);
  };

  const { handleSendMessage, messages } = useChat(setScrollToBottom);

  const handleClickSend = () => handleSendMessage("zzal");

  return (
    <Fragment>
      <div
        className={cn(
          "absolute right-0 h-full w-[33%] px-6 py-4 transition-[opacity_transform] duration-500 ease-in-out",
          isChatOpen ? "opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <div ref={chatRoomRef} className="flex h-full flex-1 flex-col overflow-y-auto pb-30pxr">
          {messages.map((message, index) => (
            <Fragment key={`${index}-${message.nickname}`}>
              {"image" in message && (
                <ZzalMessage src={message.image} isMyMessage={false} nickname={message.nickname} />
              )}
              {"message" in message && <GreetMessage nickname={message.nickname} />}
            </Fragment>
          ))}
        </div>
        <MessagePeek onClickSend={handleClickSend} />
      </div>
    </Fragment>
  );
};

export default Chat;
