import { Link } from "@tanstack/react-router";
import ThemeToggle from "./ThemeToggle.tsx";
import DropdownMenu from "./DropdownMenu.tsx";
import Logo from "@/assets/svg/logo.svg";

const Header = () => {
  const user = {
    id: 123,
    name: "Heejin",
    isAdmin: false,
  };

  const handleGtagEvent = (eventName: string) => () => {
    gtag("event", eventName);
  };

  return (
    <div className="navbar bg-background">
      <Link
        to="/"
        className="btn btn-ghost flex items-center hover:bg-transparent"
        onClick={handleGtagEvent("홈_페이지로_이동")}
      >
        <Logo aria-label="짤뮤니티 로고" />
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-1 px-2 sm:space-x-3">
        <ThemeToggle />
        {user && !user.isAdmin && (
          <Link to="/upload-zzal" onClick={handleGtagEvent("짤_업로드_페이지로_이동")}>
            <button className="btn hidden h-9 min-h-9 border-primary bg-primary text-white hover:bg-gray-300 sm:block">
              업로드
            </button>
          </Link>
        )}
        <div className="hidden h-6 w-0.5 bg-text-primary sm:block"></div>
        {!user && <button className="btn btn-ghost h-6 min-h-9">로그인</button>}
        {user && user.isAdmin && (
          <Link
            to="/admin/reports"
            className="btn btn-ghost h-6 min-h-9 text-text-primary"
            onClick={handleGtagEvent("관리자_페이지로_이동")}
          >
            Admin
          </Link>
        )}

        {user && !user.isAdmin && <DropdownMenu user={user} />}
      </div>
    </div>
  );
};

export default Header;
