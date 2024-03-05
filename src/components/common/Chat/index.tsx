import { Fragment, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { X } from "lucide-react";
import { getSessionStorage } from "@/utils/sessionStorage";
import { cn } from "@/utils/tailwind";
import MessagePeek from "./MessagePeek";
import Message from "./Message";
import { $isChatOpen } from "@/store/chat";

// TODO: [2024.02.23] 더미 데이터 제거 및 WS 연결
const DUMMY_MESSAGES = [
  {
    src: "https://i.pinimg.com/564x/93/66/aa/9366aa85149388c2e1f09bbf9d79b60e.jpg",
    isMyMessage: false,
  },
  {
    src: "https://i.pinimg.com/564x/dc/77/a8/dc77a8b6e9dd0a4a17470a0e2f85cd9f.jpg",
    isMyMessage: false,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isMyMessage: true,
  },
  {
    src: "https://jjalbang.today/files/jjalbox/2019/01/20190120_5c435f3d5c0d4.jpg",
    isMyMessage: false,
  },
  {
    src: "https://jjalbang.today/files/jjalbox/2021/06/20210608_60bf89513e1ea.jpg",
    isMyMessage: false,
  },
];

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  const chatRoomRef = useRef<HTMLDivElement>(null);

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
            <div className="flex flex-1 flex-col ">
              {DUMMY_MESSAGES.map(({ src, isMyMessage }, index) => (
                <Message key={`${index}-${src}`} src={src} isMyMessage={isMyMessage} />
              ))}
            </div>
          </div>
          <MessagePeek />
        </section>
      </div>
    </Fragment>
  );
};

export default Chat;
