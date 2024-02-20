import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_chat-layout")({
  component: ChatLayoutComponent,
});

function ChatLayoutComponent() {
  return (
    <>
      {/* <div className="flex overflow-x-hidden">
        <section className="w-full flex-1 border-2 border-green-400">
          <Outlet />
        </section>
        <section
          className={cn(
            "relative w-400pxr bg-secondary p-20pxr transition-[transform] duration-500",
            !isChatOpen && "translate-x-full",
          )}
        >
          <div className="absolute -left-70pxr bottom-15pxr">
            <ChatToggleButton />
          </div>
          <div className="h-full w-full rounded-16pxr bg-background"></div>
        </section>
      </div> */}
    </>
  );
}
