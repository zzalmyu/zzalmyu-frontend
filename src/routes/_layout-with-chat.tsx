import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import Chat from "@/components/common/Chat";
import ChatMobilePeek from "@/components/common/Chat/ChatMobilePeek";
import { $isChatOpen } from "@/store/chat";

const LayoutWithChat = () => {
  // const [moveUp, setMoveUp] = useState(false);
  const isChatOpen = useAtomValue($isChatOpen);
  return (
    <div className="relative flex h-full flex-col overflow-hidden sm:flex-row">
      <div className="flex-1 overflow-auto border-2 border-green-500">
        <Outlet />
      </div>
      <div
        className={cn(
          "absolute bottom-0 left-0 h-500pxr w-full bg-surface2 transition-transform sm:static sm:h-full sm:w-auto sm:translate-y-0 sm:rounded-none",
          isChatOpen ? "-translate-y-40pxr" : "translate-y-[calc(100%-40px)]",
        )}
      >
        <ChatMobilePeek />
        <Chat />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
