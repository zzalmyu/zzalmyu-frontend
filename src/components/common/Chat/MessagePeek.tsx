import { Fragment } from "react";
import { useAtom } from "jotai";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import { cn } from "@/utils/tailwind";
import ChatSendButton from "./ChatSendButton";
import MessagePreview from "./MessagePreview";
import { $isMessagePeekOpen } from "@/store/chat";

interface Props {
  onClickSend: () => void;
}

const MessagePeek = ({ onClickSend }: Props) => {
  const [isPeekOpen, setIsPeekOpen] = useAtom($isMessagePeekOpen);

  const handleClickPeekTip = () => {
    setIsPeekOpen((prev) => !prev);
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
        {isPeekOpen && (
          <Fragment>
            <ChevronsDown aria-label="미리보기 숨기기" />
            <span className="flex-1">미리보기를 숨겨보세요!</span>
            <ChevronsDown aria-label="미리보기 숨기기" />
          </Fragment>
        )}
        {!isPeekOpen && (
          <Fragment>
            <ChevronsUp aria-label="미리보기 보기" />
            <span className="flex-1">사진으로 채팅해보세요!</span>
            <ChevronsUp aria-label="미리보기 보기" />
          </Fragment>
        )}
      </div>
      <div className="flex min-h-200pxr w-full items-center justify-center">
        <MessagePreview />
        <div className="absolute bottom-5 right-5">
          <ChatSendButton onClick={onClickSend} />
        </div>
      </div>
    </div>
  );
};

export default MessagePeek;
