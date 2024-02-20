import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import ChatToggleButton from "@/components/chat/ChatToggleButton";
import { $isChatOpen } from "@/store/chat";
import ChatSection from "@/components/chat/ChatSection";

const LayoutWithChat = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <Outlet />
      </div>
      <div className="relative">
        <div className="absolute -left-70pxr bottom-15pxr">
          <ChatToggleButton />
        </div>
        {isChatOpen && <ChatSection />}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
});
