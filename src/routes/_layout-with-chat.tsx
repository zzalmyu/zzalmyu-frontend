import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
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
          취향 저격 짤
        </div>
        <TagSearchForm className="z-10 h-16 sm:h-70pxr sm:w-470pxr md:w-full " />
        <button
          className="btn btn-ghost btn-sm hidden w-115pxr rounded-full outline outline-1 outline-border sm:block"
          onClick={handleClickChatToggleButton}
        >
          {isChatOpen && "채팅방 숨기기"}
          {!isChatOpen && "채팅방 보기"}
        </button>
      </div>
      <div className="relative flex h-[calc(100%-80px)] w-full overflow-hidden">
        <div
          className={cn(
            "mt-60pxr h-[calc(100%-3.75rem)] overflow-auto border-r border-border px-6 py-4 transition-[width] duration-500 ease-in-out",
            isChatOpen ? "w-[67%]" : "w-full",
          )}
        >
          <button
            className="btn btn-ghost btn-sm  w-115pxr rounded-full outline outline-1 outline-border sm:block"
            onClick={handleClickChatToggleButton}
          >
            {isChatOpen && "채팅방 숨기기"}
            {!isChatOpen && "채팅방 보기"}
          </button>
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
