import { Outlet, createFileRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Chat from "@/components/common/Chat";

const LayoutWithChat = () => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden sm:flex-row">
      <div className="flex-1 overflow-auto">
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
