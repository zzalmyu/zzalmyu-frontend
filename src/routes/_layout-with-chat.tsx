import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import Chat from "@/components/common/Chat";
import { $isChatOpen } from "@/store/chat";
import ChatToggleButton from "@/components/common/Chat/ChatToggleButton";
import ChatCloseButton from "@/components/common/Chat/ChatCloseButton";

const LayoutWithChat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={cn(
          "h-full border border-border transition-[width] duration-500 ease-in-out",
          isChatOpen ? "w-[calc(70%)]" : "w-full",
        )}
      >
        <div className="sticky top-0 flex h-60pxr flex-1 items-center justify-between border-b border-border px-4">
          <div className="text-xl font-bold text-text-primary">TITLE</div>
          <ChatToggleButton />
        </div>
        <div className="h-[calc(100%-3.75rem)] flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
      <div
        className={cn(
          "absolute right-0 h-full w-[30%] border border-l-0 border-border transition-[opacity_transform] duration-500 ease-in-out",
          isChatOpen ? "opacity-100" : "translate-x-full opacity-0",
        )}
      >
        <div className="sticky top-0 flex h-60pxr flex-1 items-center justify-between border-b border-border px-4">
          <div className="text-xl font-bold text-text-primary">고독한 채팅방</div>
          <ChatCloseButton />
        </div>
        <div className="h-[calc(100%-3.75rem)] w-full">
          <Chat />
        </div>
      </div>
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
