import { useRef } from "react";
import { Home, Heart, FolderUp, LogOut } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useAtom } from "jotai";
import { Siren } from "lucide-react";
import { getLocalStorage } from "@/utils/localStorage";
import { REFRESH_TOKEN } from "@/constants/auth";
import useLogout from "@/hooks/api/auth/useLogout";
import { $userInformation } from "@/store/user";

interface eventProps {
  eventName: string;
  category: string;
}

const DropdownMenu = () => {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const refreshToken = getLocalStorage(REFRESH_TOKEN);
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [userInformation, setUserInformation] = useAtom($userInformation);
  const { role, email } = userInformation;
  const userName = email.split("@")[0];

  const handleClickButton =
    ({ category, eventName }: eventProps) =>
    () => {
      gtag("event", category, { event_category: eventName });
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

  const toggleDetails = () => {
    if (detailsRef.current) {
      detailsRef.current.open = !detailsRef.current.open;
    }
  };

  const userMenuItems = [
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
      Icon: LogOut,
      name: "로그아웃",
      onClick: handleClickLogout,
      event: { category: "user_action", eventName: "로그아웃" },
    },
  ];

  const adminMenuItems = [
    {
      path: "/",
      Icon: Home,
      name: "홈",
      event: { category: "page_view", eventName: "홈_페이지로_이동" },
    },
    {
      path: "/admin/reports/",
      Icon: Siren,
      name: "신고된 짤",
      event: { category: "page_view", eventName: "신고된_짤_페이지로_이동" },
    },
    {
      path: "/",
      Icon: LogOut,
      name: "로그아웃",
      onClick: handleClickLogout,
      event: { category: "user_action", eventName: "로그아웃" },
    },
  ];

  return (
    <ul className="menu menu-horizontal z-20 hidden px-0 sm:block">
      <li>
        <details ref={detailsRef}>
          <summary className="h-9 font-bold text-text-primary hover:bg-gray-300 focus:bg-transparent">
            {role === "USER" ? userName : "Admin"}
          </summary>
          <ul className="right-1 z-[1] w-44 rounded-box bg-background text-text-primary">
            {(role === "USER" ? userMenuItems : adminMenuItems).map(
              ({ path, Icon, name, onClick, event }, index) => (
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
              ),
            )}
            {refreshToken && (
              <Link
                to="/delete-account"
                className="mt-3pxr block text-center text-[9px] text-text-primary text-opacity-70 underline"
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
