import { useSetAtom } from "jotai";
import Message from "./Message";
import Messages from "./Messages";
import Peek from "./Peek";
import { $messagePreview } from "@/store/chat";

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

const ChatSection = () => {
  const setMessagePreview = useSetAtom($messagePreview);

  return (
    <section className="relative h-full w-500pxr bg-secondary p-20pxr ">
      <button
        className="absolute left-0 top-50pxr rounded-xl bg-primary p-5pxr text-white"
        onClick={() =>
          setMessagePreview((prev) =>
            prev.src
              ? { src: "" }
              : { src: "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg" },
          )
        }
      >
        src 토글
      </button>
      <div className="relative h-full w-full overflow-y-auto rounded-16pxr bg-background">
        <Messages>
          {DUMMY_MESSAGES.map(({ src, isUser }, index) => (
            <Message key={`${index}-${src}`} src={src} isUser={isUser} />
          ))}
        </Messages>
      </div>
      <Peek />
    </section>
  );
};

export default ChatSection;
