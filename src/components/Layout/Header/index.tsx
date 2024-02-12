import Logo from "@/assets/svg/logo.svg";
import ThemeToggle from "@/components/Layout/Header/ThemeToggle";
const Header = () => {
  return (
    <div className="navbar bg-background">
      <a href="/" className="btn btn-ghost flex items-center text-xl hover:bg-transparent">
        <img src={Logo} alt="잘뮤니티 로고" className="h-10" />
      </a>
      <div className="flex flex-1 items-center justify-end space-x-2 px-2">
        <ThemeToggle />
        <button className="btn h-9 min-h-9 border-primary bg-primary text-copy-cta">업로드</button>
        <div className="h-6 w-0.5 bg-gray-400"></div>
        <button className="btn btn-ghost h-6 min-h-9">로그인</button>
        <button className="btn btn-ghost pointer-events-none h-6 min-h-9">Admin</button>
      </div>
    </div>
  );
};

export default Header;
