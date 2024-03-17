import { useEffect, Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import { useAtom } from "jotai";
import LoginModal from "@/components/LoginModal";
import { getLocalStorage } from "@/utils/localStorage";
import ThemeToggle from "./ThemeToggle.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import Logo from "@/assets/svg/logo.svg";
import { $userInfo } from "@/store/user";
import useGetUserInfo from "@/hooks/api/auth/useGetUserInfo.ts";
import { REFRESH_TOKEN } from "@/constants/auth";

const Header = () => {
  const loginModalOverlay = useOverlay();
  const [, setUserInfo] = useAtom($userInfo);
  const { userInfo } = useGetUserInfo();
  const refreshToken = getLocalStorage(REFRESH_TOKEN);

  useEffect(() => {
    if (refreshToken && userInfo) {
      setUserInfo(userInfo);
    }
  }, [refreshToken, userInfo, setUserInfo]);

  const role = refreshToken && userInfo ? userInfo.role : "GUEST";

  const handleClickLogin = () => {
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
  };

  return (
    <div className="navbar bg-background">
      <Link to="/" className="btn btn-ghost flex items-center hover:bg-transparent">
        <Logo aria-label="짤뮤니티 로고" />
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-1 px-2 sm:space-x-3">
        <ThemeToggle />
        {role === "USER" && (
          <Fragment>
            <Link to="/upload-zzal">
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
            <Link to="/admin/reports" className="btn btn-ghost h-6 min-h-9 text-text-primary">
              Admin
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Header;
