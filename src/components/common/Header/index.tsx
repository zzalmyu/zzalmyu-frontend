"use client";

import { useEffect } from "react";
import { useOverlay } from "@toss/use-overlay";
import { useAtom } from "jotai";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import LoginModal from "@/components/LoginModal";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import ThemeToggle from "./ThemeToggle.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import Logo from "@/assets/svg/logo.svg";
import { $userInformation } from "@/store/user";
import useGetUserInformation from "@/hooks/api/auth/useGetUserInformation.ts";
import { REDIRECT_PATH, REFRESH_TOKEN } from "@/constants/auth";

const Header = () => {
  const loginModalOverlay = useOverlay();
  const [, setUserInformation] = useAtom($userInformation);
  const { userInformation } = useGetUserInformation();
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  useEffect(() => {
    if (refreshToken && userInformation) {
      setUserInformation(userInformation);
    }
  }, [refreshToken, userInformation, setUserInformation]);

  const role = refreshToken && userInformation ? userInformation.role : "GUEST";

  const handleClickLogin = () => {
    setLocalStorage(REDIRECT_PATH, "/");
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
    sendGAEvent("event", "modal_open", { event_category: "로그인_모달_띄우기" });
  };

  const handleClickLogo = () => {
    setLocalStorage(REDIRECT_PATH, "/");
    sendGAEvent("event", "page_view", { event_category: "홈_페이지로_이동" });
  };

  const handleClickUploadButton = () => {
    sendGAEvent("event", "page_view", { event_category: "짤_업로드_페이지로_이동" });
  };

  return (
    <div className="navbar bg-background">
      <Link
        href="/"
        className="btn btn-ghost flex items-center hover:bg-transparent"
        onClick={handleClickLogo}
      >
        <Logo aria-label="짤뮤니티 로고" />
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-1 px-2 sm:space-x-3">
        <ThemeToggle />
        {role === "USER" && (
          <Link href="/upload-zzal" onClick={handleClickUploadButton}>
            <button className="btn hidden h-9 min-h-9 border-primary bg-primary text-white hover:bg-gray-300 sm:block">
              업로드
            </button>
          </Link>
        )}
        <div className="hidden h-6 w-0.5 bg-text-primary sm:block"></div>
        {role !== "GUEST" && <DropdownMenu />}
        {role === "GUEST" && (
          <button className="btn btn-ghost hidden h-6 min-h-9 sm:block" onClick={handleClickLogin}>
            로그인
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
