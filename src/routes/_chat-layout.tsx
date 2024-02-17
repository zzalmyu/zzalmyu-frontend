import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import { cn } from "@/utils/tailwind";
import { $isChatOpen } from "@/store/chat";
import ChatToggleButton from "@/components/chat/ChatToggleButton";

export const Route = createFileRoute("/_chat-layout")({
  component: ChatLayoutComponent,
});

function ChatLayoutComponent() {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <>
      <div className="flex flex-1 items-stretch">
        <section className="relative flex-1">
          <div className="absolute bottom-15pxr right-15pxr">
            <ChatToggleButton />
          </div>
          <Outlet />
        </section>
        {isChatOpen && (
          <section className={cn("w-450pxr bg-secondary p-20pxr")}>
            <div className="h-full w-full rounded-16pxr bg-background"></div>
          </section>
        )}
      </div>
    </>
  );
}
