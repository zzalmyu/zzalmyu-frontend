"use client";

import { Fragment } from "react";
import { CircleUser, FolderUp, Heart, Home, LogOut, Plus } from "lucide-react";
import { useOverlay } from "@toss/use-overlay";
import { useAtom, useAtomValue } from "jotai";
import { sendGAEvent } from "@next/third-parties/google";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import { cn } from "@/utils/tailwind";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { $userInformation } from "@/store/user";
import { REDIRECT_PATH, REFRESH_TOKEN } from "@/constants/auth";
import useLogout from "@/hooks/api/auth/useLogout";
import { $scrollDirection } from "@/store/scroll";

const NavigationFooter = () => {
  const loginModalOverlay = useOverlay();
  const [userInformation, setUserInformation] = useAtom($userInformation);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const role = refreshToken && userInformation ? userInformation.role : "GUEST";
  const scrollDirection = useAtomValue($scrollDirection);

  const handleClickButton = (eventName: string) => () => {
    sendGAEvent("event", "page_view", { event_category: eventName });
  };

  const handleClickLogin = () => {
    setLocalStorage(REDIRECT_PATH, "/");
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
    sendGAEvent("event", "modal_open", { event_category: "로그인_모달_띄우기" });
  };

  const handleClickLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        setUserInformation({
          userId: 0,
          email: "",
          role: "GUEST",
        });
        router.push("/");
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
        href="/"
        className={cn(
          "flex w-65pxr flex-col items-center gap-1",
          pathname === "/" ? "text-primary" : "",
        )}
        onClick={handleClickButton("홈_페이지로_이동")}
      >
        <Fragment>
          <Home size={24} strokeWidth={1.5} aria-label="홈" />
          <span className="text-xs font-bold">홈</span>
        </Fragment>
      </Link>
      <Link
        href="/my-liked-zzals"
        className={cn(
          "flex w-65pxr flex-col items-center gap-1",
          pathname === "/" ? "text-primary" : "",
          role === "GUEST" ? "hidden" : "",
        )}
        onClick={handleClickButton("좋아요한_짤_페이지로_이동")}
      >
        <Fragment>
          <Heart size={24} strokeWidth={1.5} aria-label="좋아요한 짤" />
          <span className="text-xs font-bold">좋아요한 짤</span>
        </Fragment>
      </Link>
      <Link
        href="/upload-zzal"
        className={cn(
          "flex w-65pxr flex-col items-center gap-1",
          pathname === "/" ? "text-primary" : "",
        )}
        onClick={handleClickButton("짤_업로드_페이지로_이동")}
      >
        <div className="flex h-45pxr w-45pxr items-center justify-center rounded-full bg-primary font-bold text-white">
          <Plus size={24} strokeWidth={2} aria-label="업로드" />
        </div>
      </Link>
      <Link
        href="/my-uploaded-zzals"
        className={cn(
          "flex w-65pxr flex-col items-center gap-1",
          pathname === "/" ? "text-primary" : "",
          role === "GUEST" ? "hidden" : "",
        )}
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

export default NavigationFooter;
