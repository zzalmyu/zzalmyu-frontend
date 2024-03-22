import { useEffect, useRef } from "react";
import { Link, Outlet, createFileRoute, redirect, useRouterState } from "@tanstack/react-router";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { MessageCircle } from "lucide-react";
import axios from "axios";
import { cn } from "@/utils/tailwind";
import { getLocalStorage } from "@/utils/localStorage";
import { debounce } from "@/utils/debounce";
import Chat from "@/components/common/Chat";
import { $isChatOpen } from "@/store/chat";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";
import { REFRESH_TOKEN } from "@/constants/auth";
import { $userInformation } from "@/store/user";
import { $scrollDirection } from "@/store/scroll";
import { $selectedTags } from "@/store/tag";

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
  const { location } = useRouterState();
  const [isChatOpen, setIsChatOpen] = useAtom($isChatOpen);
  const setSelectedTags = useSetAtom($selectedTags);
  const userInformation = useAtomValue($userInformation);
  const setScrollDirection = useSetAtom($scrollDirection);
  const scrollTrackerRef = useRef<HTMLDivElement>(null);
  const previousScrollTopRef = useRef(0);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  const role = refreshToken && userInformation ? userInformation.role : "GUEST";

  useEffect(() => {
    setSelectedTags([]);
  }, [location.pathname, setSelectedTags]);

  const handleClickChatToggleButton = () => {
    setIsChatOpen((prev) => !prev);
    gtag("event", "user_action", { event_category: isChatOpen ? "채팅창_닫힘" : "채팅창_열림" });
  };

  useEffect(() => {
    const scrollTracker = scrollTrackerRef.current;
    if (!scrollTracker) return;

    const handleScroll = debounce(() => {
      if (scrollTracker.scrollTop > previousScrollTopRef.current) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      previousScrollTopRef.current = scrollTracker.scrollTop;
    }, 200);

    scrollTracker?.addEventListener("scroll", handleScroll);

    return () => scrollTracker?.removeEventListener("scroll", handleScroll);
  }, [setScrollDirection]);

  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative flex h-150pxr w-full flex-col items-center gap-4 px-10pxr pt-50pxr shadow-md shadow-adaptive-shadow sm:h-150pxr sm:px-6 sm:pt-10pxr">
        <div className="hidden items-center justify-center gap-4 text-sm font-bold text-border sm:flex">
          {role === "USER" &&
            zzalPaths.map(({ title, path }) => (
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
          ref={scrollTrackerRef}
          className={cn(
            "shadow-shadow h-full overflow-auto px-6 py-4 shadow-md transition-[width_transform] duration-500 ease-in-out",
            isChatOpen
              ? "w-full -translate-x-full md:w-[67%] md:translate-x-0"
              : "w-full md:w-full",
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
    console.log(location.pathname);
    if (location.pathname === "/") return;
    await context.authorize.isAuthenticated();
  },
  onError: (error) => {
    if (!axios.isAxiosError(error)) return;
    if (error.response?.status === 401) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  wrapInSuspense: true,
});
