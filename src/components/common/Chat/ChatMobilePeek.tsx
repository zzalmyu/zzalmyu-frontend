import { useAtom } from "jotai";
import { ChevronsDown, MessageSquareMore } from "lucide-react";
import { $isChatOpen } from "@/store/chat";

const ChatMobilePeek = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  return (
    <div
      onClick={() => {
        setIsChatOpen((prev) => !prev);
      }}
      className="flex h-40pxr cursor-pointer items-center justify-center rounded-t-3xl bg-gray-400 text-white sm:hidden"
    >
      {!isChatOpen && <MessageSquareMore strokeWidth={2.5} />}
      {isChatOpen && <ChevronsDown strokeWidth={2.5} />}
    </div>
  );
};

export default ChatMobilePeek;
