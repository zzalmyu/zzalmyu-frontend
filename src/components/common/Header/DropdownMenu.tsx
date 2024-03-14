import { useRef } from "react";
import { Home, Heart, FolderUp, LogOut, LogIn } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import LoginModal from "@/components/LoginModal";
import { getLocalStorage } from "@/utils/localStorage";
import { REFRESH_TOKEN } from "@/constants/auth";
import useLogout from "@/hooks/api/auth/useLogout";

interface Props {
  user: {
    name: string;
  };
}

interface eventProps {
  eventName: string;
  category: string;
}

const DropdownMenu = ({ user }: Props) => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const loginModalOverlay = useOverlay();
  const refreshToken = getLocalStorage(REFRESH_TOKEN);
  const navigate = useNavigate();
  const { logout } = useLogout();

  const handleClickButton =
    ({ category, eventName }: eventProps) =>
    () => {
      gtag("event", category, { event_category: eventName });
    };

  const handleClickLogin = () => {
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
  };

  const handleClickLogout = () => {
    logout(undefined, {
      onSuccess: () => navigate({ to: "/" }),
    });
  };

  const menuItems = [
    {
      path: "/my-uploaded-zzals/",
      Icon: FolderUp,
      name: "업로드한 짤",
      event: { category: "page_view", eventName: "업로드한_짤_페이지로_이동" },
    },
    {
      path: "/my-liked-zzals/",
      Icon: Heart,
      name: "좋아요한 짤",
      event: { category: "page_view", eventName: "좋아요한_짤_페이지로_이동" },
    },
    {
      path: "/",
      Icon: Home,
      name: "홈",
      event: { category: "page_view", eventName: "홈_페이지로_이동" },
    },
    {
      path: "/",
      Icon: refreshToken ? LogOut : LogIn,
      name: refreshToken ? "로그아웃" : "로그인",
      onClick: refreshToken ? handleClickLogout : handleClickLogin,
      event: refreshToken
        ? { category: "user_action", eventName: "로그아웃" }
        : { category: "modal_open", eventName: "로그인_모달_띄우기" },
    },
  ];

  const toggleDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.open = !detailsRef.current.open;
    }
  };

  return (
    <ul className="menu menu-horizontal z-20 hidden px-0 sm:block">
      <li>
        <details ref={detailsRef}>
          <summary className="h-9 font-bold text-text-primary hover:bg-gray-300 focus:bg-transparent">
            {user.name}
          </summary>
          <ul className="right-1 z-[1] w-44 rounded-box bg-background text-text-primary ">
            {menuItems.map(({ path, Icon, name, onClick, event }, index) => (
              <li key={`${index}-${name}`} className="group" onClick={onClick || toggleDetails}>
                <Link
                  to={path}
                  className="[&.active]:text-white "
                  activeProps={{ className: "bg-transparent" }}
                  onClick={handleClickButton(event)}
                >
                  <div className="h-6 w-6 group-hover:text-blue-500">
                    <Icon size={20} aria-label={name} />
                  </div>
                  <span className="text-right font-bold group-hover:text-blue-500">{name}</span>
                </Link>
              </li>
            ))}
            {refreshToken && (
              <Link
                to="/delete-account"
                className="mt-2pxr block text-center text-[9px] text-gray-700 underline"
                onClick={toggleDetails}
              >
                계정 탈퇴하기
              </Link>
            )}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default DropdownMenu;
