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
      <div className="relative flex h-120pxr w-full flex-col items-center gap-4 border-b border-border px-10pxr pt-10pxr sm:h-150pxr sm:px-6">
        <TagSearchForm className="z-10 mx-auto sm:w-400pxr md:w-550pxr lg:w-full" />
        <div className="relative flex w-full flex-1 items-center">
          <button
            className={cn(
              "btn btn-ghost btn-sm absolute right-0 hidden h-45pxr w-45pxr items-center justify-center rounded-full border border-border sm:flex md:w-120pxr md:bg-background md:text-text-primary",
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
      </div>
      <div className="relative flex h-[calc(100%-135px)] w-full overflow-hidden">
        <div
          className={cn(
            "h-full overflow-auto border-r border-border px-6 py-4 transition-[width] duration-500 ease-in-out",
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
