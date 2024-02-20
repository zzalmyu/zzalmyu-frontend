import { Outlet, createRootRoute } from "@tanstack/react-router";
import { useAtomValue } from "jotai";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";
import { $isChatOpen } from "@/store/chat";
import ChatToggleButton from "@/components/chat/ChatToggleButton";
import ChatSection from "@/components/chat/ChatSection";

const RootComponent = () => {
  const isChatOpen = useAtomValue($isChatOpen);

  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="flex h-[calc(100vh-4.25rem)]">
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
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
