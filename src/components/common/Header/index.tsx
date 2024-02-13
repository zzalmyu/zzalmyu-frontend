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

  return (
    <div className="navbar bg-background">
      <Link href="/" className="btn btn-ghost flex items-center hover:bg-transparent">
        <Logo />
      </Link>

      <div className="flex flex-1 items-center justify-end space-x-3 px-2">
        <ThemeToggle />
        {user && !user.isAdmin && (
          <button className="btn h-9 min-h-9 border-primary bg-primary text-white hover:bg-gray-300">
            업로드
          </button>
        )}
        <div className="h-6 w-0.5 bg-gray-400"></div>
        {!user && <button className="btn btn-ghost h-6 min-h-9">로그인</button>}
        {user && user.isAdmin && (
          <button className="btn btn-ghost pointer-events-none h-6 min-h-9">Admin</button>
        )}

        {user && !user.isAdmin && <DropdownMenu user={user} />}
      </div>
    </div>
  );
};

export default Header;
