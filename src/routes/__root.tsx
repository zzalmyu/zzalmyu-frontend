import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react";
import { Link, Outlet, createRootRouteWithContext, useNavigate } from "@tanstack/react-router";
import { CircleUser, FolderUp, Heart, Home, LogOut, Plus } from "lucide-react";
import { useOverlay } from "@toss/use-overlay";
import { useAtom, useAtomValue } from "jotai";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextType } from "@/components/Auth";
import LoginModal from "@/components/LoginModal";
import { cn } from "@/utils/tailwind";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";
import { $userInformation } from "@/store/user";
import { REDIRECT_PATH, REFRESH_TOKEN } from "@/constants/auth";
import useLogout from "@/hooks/api/auth/useLogout";
import { $scrollDirection } from "@/store/scroll";

const handleClickButton = (eventName: string) => () => {
  gtag("event", "page_view", { event_category: eventName });
};

const NavigationFooter = () => {
  const loginModalOverlay = useOverlay();
  const [userInformation, setUserInformation] = useAtom($userInformation);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const role = refreshToken && userInformation ? userInformation.role : "GUEST";
  const scrollDirection = useAtomValue($scrollDirection);

  const handleClickLogin = () => {
    setLocalStorage(REDIRECT_PATH, "/");
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
    gtag("event", "modal_open", { event_category: "로그인_모달_띄우기" });
  };

  const handleClickLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUserInformation({
          userId: 0,
          email: "",
          role: "GUEST",
        });
        navigate({ to: "/" });
      },
    });
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 z-10 flex h-60pxr w-full items-center justify-evenly bg-background text-text-primary shadow-[0_-1px_10px_1px_rgba(0,0,0,0.1)] shadow-adaptive-shadow transition-transform sm:hidden",
        scrollDirection === "up" ? "" : "translate-y-full",
      )}
    >
      <Link
        to="/"
        className="flex w-65pxr flex-col items-center gap-1"
        activeProps={{ className: "text-primary" }}
        onClick={handleClickButton("홈_페이지로_이동")}
      >
        <Fragment>
          <Home size={24} strokeWidth={1.5} aria-label="홈" />
          <span className="text-xs font-bold">홈</span>
        </Fragment>
      </Link>
      <Link
        to="/my-liked-zzals"
        className={cn("flex w-65pxr flex-col items-center gap-1", role === "GUEST" ? "hidden" : "")}
        activeProps={{ className: "text-primary" }}
        onClick={handleClickButton("좋아요한_짤_페이지로_이동")}
      >
        <Fragment>
          <Heart size={24} strokeWidth={1.5} aria-label="좋아요한 짤" />
          <span className="text-xs font-bold">좋아요한 짤</span>
        </Fragment>
      </Link>
      <Link
        to="/upload-zzal"
        className="flex w-65pxr flex-col items-center gap-1"
        activeProps={{ className: "text-primary" }}
        onClick={handleClickButton("짤_업로드_페이지로_이동")}
      >
        <div className="flex h-45pxr w-45pxr items-center justify-center rounded-full bg-primary font-bold text-white">
          <Plus size={24} strokeWidth={2} aria-label="업로드" />
        </div>
      </Link>
      <Link
        to="/my-uploaded-zzals"
        className={cn("flex w-65pxr flex-col items-center gap-1", role === "GUEST" ? "hidden" : "")}
        activeProps={{ className: "text-primary" }}
        onClick={handleClickButton("업로드한_짤_페이지로_이동")}
      >
        <Fragment>
          <FolderUp size={24} strokeWidth={1.5} aria-label="업로드한 짤" />
          <span className="text-xs font-bold">업로드한 짤</span>
        </Fragment>
      </Link>
      {role === "GUEST" && (
        <div onClick={handleClickLogin} className="flex w-65pxr flex-col items-center gap-1">
          <CircleUser size={24} strokeWidth={1.5} aria-label="" />
          <span className="text-xs font-bold">로그인</span>
        </div>
      )}
      {role === "USER" && (
        <div onClick={handleClickLogout} className="flex w-65pxr flex-col items-center gap-1">
          <LogOut size={24} strokeWidth={1.5} aria-label="" />
          <span className="text-xs font-bold">로그아웃</span>
        </div>
      )}
    </div>
  );
};

interface RouterContext {
  authorize: AuthContextType;
}

const RootComponent = () => {
  return (
    <div className="relative h-[100dvh] w-[100dvw] overflow-hidden sm:h-screen">
      <Header />
      <div className="h-[calc(100%-4.25rem)] sm:pb-0">
        <Outlet />
      </div>
      <NavigationFooter />
      <ToastContainer />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});
