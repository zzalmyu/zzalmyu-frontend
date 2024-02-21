import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import ChatSendButton from "./ChatSendButton";
import MessagePreview from "./MessagePreview";
import { $messagePreview } from "@/store/chat";

const Peek = () => {
  const { src } = useAtomValue($messagePreview);
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 flex w-full items-center justify-center overflow-hidden rounded-t-xl bg-neutral/80 p-10pxr pt-30pxr transition-transform",
        src ? "" : "translate-y-[calc(100%-1.875rem)]",
      )}
    >
      <div className="absolute top-0 z-10 w-full p-5pxr text-center text-sm font-bold text-white">
        전송하기를 눌러 채팅에 바로 사진을 사용해보세요!
      </div>
      <MessagePreview />

      <div className="absolute bottom-5 right-5">
        <ChatSendButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default Peek;
