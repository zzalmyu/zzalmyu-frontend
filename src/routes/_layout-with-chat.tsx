import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
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
      <div className="relative flex h-80pxr w-full items-center justify-between px-6">
        <div className="self-start text-lg font-bold text-text-primary">Heejin 님 취향 저격 짤</div>
        <TagSearchForm className="absolute left-[50%] top-0 z-10 h-70pxr w-600pxr -translate-x-[50%]" />
        <button
          className="btn btn-ghost btn-sm w-115pxr rounded-full outline outline-1 outline-border"
          onClick={handleClickChatToggleButton}
        >
          {isChatOpen && "채팅방 숨기기"}
          {!isChatOpen && "채팅방 보기"}
        </button>
      </div>
      <div className="relative flex h-[calc(100%-3.75rem)] w-full overflow-hidden">
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
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
