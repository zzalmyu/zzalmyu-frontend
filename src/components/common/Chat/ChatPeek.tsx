import { useAtom } from "jotai";
import { ChevronsDown, ChevronsRight, MessageSquareMore } from "lucide-react";
import { $isChatOpen } from "@/store/chat";

interface Props {
  handleScroll: () => void;
}

const ChatPeek = ({ handleScroll }: Props) => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);

  const handleClickToggle = () => {
    handleScroll();
    setIsChatOpen((prev) => !prev);
  };

  return (
    <div
      onClick={handleClickToggle}
      className="flex h-40pxr w-full cursor-pointer items-center justify-center rounded-t-3xl bg-gray-400 text-white sm:h-full sm:w-40pxr sm:rounded-bl-3xl sm:rounded-tl-3xl sm:rounded-tr-none"
    >
      {!isChatOpen && <MessageSquareMore strokeWidth={2.5} />}
      {isChatOpen && (
        <ChevronsDown aria-label="채팅 닫기" strokeWidth={2.5} className="block sm:hidden" />
      )}
      {isChatOpen && (
        <ChevronsRight aria-label="채팅 닫기" strokeWidth={2.5} className="hidden sm:block" />
      )}
    </div>
  );
};

export default ChatPeek;
