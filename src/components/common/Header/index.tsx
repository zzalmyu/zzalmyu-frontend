import { useEffect, Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import { useAtom } from "jotai";
import LoginModal from "@/components/LoginModal";
import { getLocalStorage } from "@/utils/localStorage";
import ThemeToggle from "./ThemeToggle.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import Logo from "@/assets/svg/logo.svg";
import { $userInformation } from "@/store/user";
import useGetUserInformation from "@/hooks/api/auth/useGetUserInformation.ts";
import { REFRESH_TOKEN } from "@/constants/auth";

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
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
    gtag("event", "modal_open", { event_category: "로그인_모달_띄우기" });
  };

  const handleClickLogo = () => {
    gtag("event", "page_view", { event_category: "홈_페이지로_이동" });
  };

  const handleClickUploadButton = () => {
    gtag("event", "page_view", { event_category: "짤_업로드_페이지로_이동" });
  };

  const handleClickAdminButton = () => {
    gtag("event", "page_view", { event_category: "관리자_페이지로_이동" });
  };

  return (
    <div className="navbar bg-background">
      <Link
        to="/"
        className="btn btn-ghost flex items-center hover:bg-transparent"
        onClick={handleClickLogo}
      >
        <Logo aria-label="짤뮤니티 로고" />
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-1 px-2 sm:space-x-3">
        <ThemeToggle />
        {role === "USER" && (
          <Fragment>
            <Link to="/upload-zzal" onClick={handleClickUploadButton}>
              <button className="btn hidden h-9 min-h-9 border-primary bg-primary text-white hover:bg-gray-300 sm:block">
                업로드
              </button>
            </Link>
            <div className="hidden h-6 w-0.5 bg-text-primary sm:block"></div>
            <DropdownMenu />
          </Fragment>
        )}
        {role === "GUEST" && (
          <Fragment>
            <div className="hidden h-6 w-0.5 bg-text-primary sm:block"></div>
            <button className="btn btn-ghost h-6 min-h-9" onClick={handleClickLogin}>
              로그인
            </button>
          </Fragment>
        )}
        {role === "ADMIN" && (
          <Fragment>
            <div className="hidden h-6 w-0.5 bg-text-primary sm:block"></div>
            <Link
              to="/admin/reports"
              className="btn btn-ghost h-6 min-h-9 text-text-primary"
              onClick={handleClickAdminButton}
            >
              Admin
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
