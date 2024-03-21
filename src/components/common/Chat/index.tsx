import { Fragment, Suspense, useEffect, useRef } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import { ErrorBoundary } from "@sentry/react";
import { cn } from "@/utils/tailwind";
import { debounce } from "@/utils/debounce";
import MessagePeek from "./MessagePeek";
import ZzalMessage from "./ZzalMessage";
import { $isChatOpen } from "@/store/chat";
import useChat from "@/hooks/chat/useChat";
import useGetChat from "@/hooks/api/chat/useGetChat";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import { $userInformation } from "@/store/user";
import { $scrollDirection } from "@/store/scroll";

const ChatRoom = () => {
  const { messageHistory, handleFetchNextPage } = useGetChat();
  const chatRoomRef = useRef<HTMLDivElement>(null);
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const { email } = useAtomValue($userInformation);
  const setScrollDirection = useSetAtom($scrollDirection);
  const previousScrollTopRef = useRef(0);

  useIntersectionObserver({
    target: scrollTargetRef,
    handleIntersect: () => handleFetchNextPage(),
  });

  const { handleSendMessage } = useChat(chatRoomRef);

  useEffect(() => {
    const scrollTracker = chatRoomRef.current;
    if (!scrollTracker) return;

    const handleScroll = debounce(() => {
      if (scrollTracker.scrollTop > previousScrollTopRef.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      previousScrollTopRef.current = scrollTracker.scrollTop;
    }, 200);

    scrollTracker?.addEventListener("scroll", handleScroll);

    return () => scrollTracker?.removeEventListener("scroll", handleScroll);
  }, [setScrollDirection]);

  return (
    <Fragment>
      <div
        ref={chatRoomRef}
        className="flex h-full flex-1 flex-col overflow-y-auto overflow-x-hidden pb-30pxr"
      >
        <div ref={scrollTargetRef}></div>
        {messageHistory.map((message, index) => {
          return (
            <ZzalMessage
              key={`${index}-${message.nickname}`}
              src={message.message}
              isMyMessage={message.email === email}
              nickname={message.nickname}
            />
          );
        })}
      </div>
      <MessagePeek onClickSend={handleSendMessage} />
    </Fragment>
  );
};

const Chat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <Fragment>
      <div
        className={cn(
          "absolute right-0 h-full w-full overflow-hidden px-6 py-4 transition-[opacity_transform] duration-500 ease-in-out md:w-[33%]",
          isChatOpen ? "opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <ErrorBoundary fallback={() => <div>채팅 연결 중 에러 발생</div>}>
          <Suspense fallback={"chatroom pending..."}>
            <ChatRoom />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Fragment>
  );
};

export default Chat;
