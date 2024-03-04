import { Fragment, forwardRef, useEffect } from "react";
import MessagePeek from "./MessagePeek";
import GreetMessage from "./GreetMessage";
import ZzalMessage from "./ZzalMessage";
import useChat from "@/hooks/chat/useChat";

interface Props {
  setScrollPosition: () => void;
}

const ChatSection = forwardRef<HTMLDivElement, Props>(({ setScrollPosition }, ref) => {
  const { handleSendMessage, messages } = useChat();

  useEffect(() => {
    setScrollPosition();
  }, [setScrollPosition]);

  return (
    <section className="relative h-full w-full bg-secondary p-20pxr sm:w-[40vw] md:w-450pxr">
      <div
        ref={ref}
        className="relative h-full w-full overflow-y-auto rounded-16pxr bg-background pb-15pxr"
      >
        <div className="flex flex-1 flex-col ">
          {messages.map((message, index) => (
            <Fragment key={`${index}-${"message"}`}>
              {"image" in message && (
                <ZzalMessage src={message.image} isMyMessage={false} nickname={message.nickname} />
              )}
              {"message" in message && <GreetMessage message={message.message} />}
            </Fragment>
          ))}
        </div>
      </div>
      <MessagePeek onClickSend={() => handleSendMessage("zzal")} />
    </section>
  );
});

export default ChatSection;
