import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { MessageCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";
import Chat from "@/components/common/Chat";
import { $isChatOpen } from "@/store/chat";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";

const LayoutWithChat = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  const handleClickChatToggleButton = () => {
    setIsChatOpen((prev) => !prev);
  };
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative flex h-80pxr w-full items-center justify-center px-10pxr sm:justify-between sm:px-6 ">
        <div className="hidden w-115pxr self-start text-xl font-bold text-text-primary sm:block">
          {/* TODO: [2024.03.08]: route별 title로 교체하기 */}
          취향 저격 짤
        </div>
        <TagSearchForm className="z-10 sm:w-400pxr md:w-550pxr lg:w-full" />
        <button
          className={cn(
            "btn btn-ghost btn-sm hidden h-45pxr w-45pxr items-center justify-center rounded-full outline outline-1 outline-border sm:flex md:w-115pxr md:bg-background md:text-text-primary",
            isChatOpen ? "bg-primary text-white" : "",
          )}
          onClick={handleClickChatToggleButton}
        >
          <div className="hidden md:block">
            {isChatOpen && "채팅방 숨기기"}
            {!isChatOpen && "채팅방 보기"}
          </div>
          <MessageCircle className="block md:hidden" fill="white" strokeWidth={1.5} />
        </button>
      </div>
      <div className="relative flex h-[calc(100%-80px)] w-full overflow-hidden">
        <div
          className={cn(
            "mt-60pxr h-[calc(100%-3.75rem)] overflow-auto border-r border-border px-6 py-4 transition-[width] duration-500 ease-in-out",
            isChatOpen ? "w-[67%]" : "w-full",
          )}
        >
          <Outlet />
        </div>
        <Chat />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
