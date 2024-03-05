import { useEffect, useRef } from "react";
import { getSessionStorage } from "@/utils/sessionStorage";
import MessagePeek from "./MessagePeek";
import Message from "./Message";

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
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const setScrollPosition = () => {
    if (!chatRoomRef.current) return;
    const top = getSessionStorage("sidebar-scroll");
    if (top !== null) {
      chatRoomRef.current.scrollTop = parseInt(top, 10);
    }
  };

  useEffect(() => {
    setScrollPosition();
  }, [setScrollPosition]);

  return (
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
  );
};

export default Chat;
