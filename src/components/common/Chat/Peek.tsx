import { useAtom } from "jotai";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/utils/tailwind";
import ChatSendButton from "./ChatSendButton";
import MessagePreview from "./MessagePreview";
import { $peekState } from "@/store/chat";

const Peek = () => {
  const [{ isOpen: isPeekOpen }, setPeekState] = useAtom($peekState);
  const handleClickPeekTip = () => {
    setPeekState((prev) => ({ ...prev, isOpen: !prev.isOpen && !!prev.src }));
  };
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 flex w-full flex-col items-center justify-center gap-10pxr overflow-hidden rounded-t-3xl bg-neutral/80 pb-10pxr transition-transform",
        isPeekOpen ? "" : "translate-y-[calc(100%-1.875rem)]",
      )}
    >
      <div
        onClick={handleClickPeekTip}
        className="z-10 flex w-full cursor-pointer items-center justify-center gap-10pxr px-15pxr py-5pxr text-center text-xs font-bold text-white transition-colors hover:bg-gray-300/20 sm:text-sm"
      >
        {isPeekOpen ? (
          <ChevronsDown aria-label="미리보기 숨기기" />
        ) : (
          <ChevronsUp aria-label="미리보기 보기" />
        )}
        {isPeekOpen ? (
          <span className="flex-1">미리보기가 불편하실 땐 숨겨보세요!</span>
        ) : (
          <span className="flex-1">보고 있는사진을 채팅에 사용해보세요!</span>
        )}
        {isPeekOpen ? (
          <ChevronsDown aria-label="미리보기 숨기기" />
        ) : (
          <ChevronsUp aria-label="미리보기 보기" />
        )}
      </div>
      <MessagePreview />
      <div className="absolute bottom-5 right-5">
        <ChatSendButton onClick={() => {}} />
      </div>
    </div>
  );
};

export default Peek;
