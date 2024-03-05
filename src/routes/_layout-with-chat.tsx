import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import Chat from "@/components/common/Chat";
import { $isChatOpen } from "@/store/chat";

const LayoutWithChat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <div className="relative flex h-full w-full overflow-hidden">
      <div
        className={cn(
          "mt-60pxr h-[calc(100%-3.75rem)] overflow-auto transition-[width] duration-500 ease-in-out",
          isChatOpen ? "w-[70%]" : "w-full",
        )}
      >
        <Outlet />
      </div>

      <Chat />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
