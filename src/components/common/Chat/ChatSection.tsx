import { forwardRef, useEffect } from "react";
import Message from "./Message";
import Peek from "./Peek";

const DUMMY_MESSAGES = [
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isUser: false,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isUser: false,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isUser: true,
  },
  {
    src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
    isUser: false,
  },
];

interface Props {
  setScrollPosition: () => void;
}
const ChatSection = forwardRef<HTMLDivElement, Props>(({ setScrollPosition }, ref) => {
  // const chatRoomRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // if (!chatRoomRef.current) return;
    // const top = sessionStorage.getItem("sidebar-scroll");
    // if (top !== null) {
    //   chatRoomRef.current.scrollTop = parseInt(top, 10);
    // }
    setScrollPosition();
  }, [setScrollPosition]);
  return (
    <section className="relative h-full w-full bg-secondary p-20pxr ">
      <div
        ref={ref}
        className="relative h-full w-full overflow-y-auto rounded-16pxr bg-background pb-15pxr"
      >
        <div className="flex flex-1 flex-col ">
          {DUMMY_MESSAGES.map(({ src, isUser }, index) => (
            <Message key={`${index}-${src}`} src={src} isUser={isUser} />
          ))}
        </div>
      </div>
      <Peek />
    </section>
  );
});

export default ChatSection;
