import { Outlet, createFileRoute } from "@tanstack/react-router";
import Chat from "@/components/common/Chat";

const LayoutWithChat = () => {
  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Outlet />
      </div>
      <Chat />
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
