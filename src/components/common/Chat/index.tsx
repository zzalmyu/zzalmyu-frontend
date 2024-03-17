import { Fragment, Suspense, useRef } from "react";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import MessagePeek from "./MessagePeek";
import ZzalMessage from "./ZzalMessage";
import GreetMessage from "./GreetMessage";
import { $isChatOpen } from "@/store/chat";
import useChat from "@/hooks/chat/useChat";
import useGetChat from "@/hooks/api/chat/useGetChat";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

const ChatRoom = () => {
  const { messageHistory, handleFetchNextPage } = useGetChat();
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);

  // TODO: [2023.03.17]: chat intersection 시 scroll action 구현

  useIntersectionObserver({
    target: scrollTargetRef,
    handleIntersect: () => handleFetchNextPage(),
  });

  const { handleSendMessage } = useChat(chatRoomRef);

  const handleClickSend = () => handleSendMessage("zzal");

  return (
    <Fragment>
      <div ref={chatRoomRef} className="flex h-full flex-1 flex-col overflow-y-auto pb-30pxr">
        <div ref={scrollTargetRef}></div>
        {messageHistory.map((message, index) => (
          <div key={`${index}-${message.nickname}`} className={`number${index}`}>
            {message.type === "IMAGE" && (
              <ZzalMessage src={message.message} isMyMessage={false} nickname={message.nickname} />
            )}
            {message.type === "HELLO" && <GreetMessage nickname={message.nickname} />}
          </div>
        ))}
      </div>
      <MessagePeek onClickSend={handleClickSend} />
    </Fragment>
  );
};

const Chat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <Fragment>
      <div
        className={cn(
          "absolute right-0 h-full w-[33%] px-6 py-4 transition-[opacity_transform] duration-500 ease-in-out",
          isChatOpen ? "opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <Suspense fallback={"chatroom pending..."}>
          <ChatRoom />
        </Suspense>
      </div>
    </Fragment>
  );
};

export default Chat;
