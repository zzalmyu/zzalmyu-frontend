import { Outlet, createFileRoute } from "@tanstack/react-router";
import Chat from "@/components/common/Chat";

const LayoutWithChat = () => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden sm:flex-row">
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
      <Chat />
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
