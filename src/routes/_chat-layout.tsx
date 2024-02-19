import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import useAnimation from "@/hooks/useAnimation";
import { cn } from "@/utils/tailwind";
import { $isChatOpen } from "@/store/chat";
import ChatToggleButton from "@/components/chat/ChatToggleButton";

export const Route = createFileRoute("/_chat-layout")({
  component: ChatLayoutComponent,
});

function ChatLayoutComponent() {
  const isChatOpen = useAtomValue($isChatOpen);
  const [shouldRenderCategory, handleTransitionEnd, triggerAnimation] = useAnimation(isChatOpen);
  return (
    <>
      <div className="flex flex-1 items-stretch transition duration-500">
        <section className="relative w-full flex-1">
          <div className="absolute bottom-15pxr right-15pxr">
            <ChatToggleButton />
          </div>
          <Outlet />
        </section>
        {shouldRenderCategory && (
          <section
            onTransitionEnd={handleTransitionEnd}
            className={cn(
              "flex-[0.6] bg-secondary p-20pxr transition-[all] duration-500",
              !triggerAnimation && " flex-[0.000001]",
            )}
          >
            <div className="h-full w-full rounded-16pxr bg-background"></div>
          </section>
        )}
      </div>
    </>
  );
}
