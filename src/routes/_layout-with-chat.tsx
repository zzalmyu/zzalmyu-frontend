import { Link, Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import { cn } from "@/utils/tailwind";
import Chat from "@/components/common/Chat";
import { $isChatOpen } from "@/store/chat";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";

const zzalPaths = [
  {
    title: "취향 저격 짤",
    path: "/",
  },
  {
    title: "좋아요한 짤",
    path: "/my-liked-zzals",
  },
  {
    title: "업로드한 짤",
    path: "/my-uploaded-zzals",
  },
];
const LayoutWithChat = () => {
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  window.location;
  const handleClickChatToggleButton = () => {
    setIsChatOpen((prev) => !prev);
    gtag("event", "user_action", { event_category: isChatOpen ? "채팅창_닫힘" : "채팅창_열림" });
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative flex h-150pxr w-full flex-col items-center gap-4 px-10pxr pt-10pxr shadow-md sm:h-150pxr sm:px-6">
        <div className="flex items-center justify-center gap-4 text-sm font-bold text-border">
          {zzalPaths.map(({ title, path }) => (
            <Link key={title} to={path} activeProps={{ className: "text-primary" }}>
              <span>{title}</span>
            </Link>
          ))}
        </div>
        <div className="relative flex w-full flex-1">
          <TagSearchForm className="z-10 mx-auto w-400pxr md:w-550pxr lg:w-full" />
          <button
            className={cn(
              "btn btn-ghost btn-sm absolute bottom-[calc(100%+8px)] right-0 flex h-35pxr w-35pxr items-center justify-center rounded-full border border-border p-2 sm:bottom-5pxr sm:flex md:w-120pxr md:bg-background md:text-text-primary",
              isChatOpen ? "bg-primary text-white" : "",
            )}
            onClick={handleClickChatToggleButton}
          >
            <div className="hidden md:block">
              {isChatOpen && "채팅방 숨기기"}
              {!isChatOpen && "채팅방 보기"}
            </div>
            <MessageCircle className="block md:hidden" size={20} fill="white" strokeWidth={1.5} />
          </button>
        </div>
      </div>
      <div
        className={cn(
          "relative flex h-[calc(100%-9.375rem)] w-full overflow-hidden sm:h-[calc(100%-9.375rem)]",
        )}
      >
        <div
          className={cn(
            "h-full overflow-auto px-6 py-4 shadow-md transition-[width_transform] duration-500 ease-in-out",
            isChatOpen ? "w-full -translate-x-full sm:w-[67%] sm:translate-x-0" : "sm:w-full",
          )}
        >
          <Outlet />
        </div>
        <Chat />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat")({
  component: LayoutWithChat,
  beforeLoad: async ({ context, location }) => {
    if (location.pathname === "/") return;

    try {
      await context.authorize.isAuthenticated();
    } catch (error) {
      if (!axios.isAxiosError(error)) return;
      if (error.response?.status === 401) {
        throw redirect({
          to: "/",
          search: {
            redirect: location.pathname,
          },
        });
      }
    }
  },
});
