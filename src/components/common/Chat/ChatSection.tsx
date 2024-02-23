import { forwardRef, useEffect } from "react";
import Message from "./Message";
import MessagePeek from "./MessagePeek";

// TODO: [2024.02.23] 더미 데이터 제거 및 WS 연결
const DUMMY_MESSAGES = [
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isMyMessage: false,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isMyMessage: false,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isMyMessage: true,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isMyMessage: false,
  },
];

interface Props {
  setScrollPosition: () => void;
}

const ChatSection = forwardRef<HTMLDivElement, Props>(({ setScrollPosition }, ref) => {
  useEffect(() => {
    setScrollPosition();
  }, [setScrollPosition]);

  return (
    <section className="relative h-full w-full bg-secondary p-20pxr">
      <div
        ref={ref}
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
});

export default ChatSection;
