import { Home, Heart, FolderUp, LogOut } from "lucide-react";
import { Link } from "@tanstack/react-router";
interface Props {
  user: {
    name: string;
  };
}

const DropdownMenu = ({ user }: Props) => {
  const menuItems = [
    {
      url: "/my-uploaded-zzal/",
      icon: FolderUp,
      name: "업로드한 짤",
    },
    {
      url: "/my-liked-zzal/",
      icon: Heart,
      name: "좋아요한 짤",
    },
    {
      url: "/",
      icon: Home,
      name: "홈",
    },
    {
      url: "/",
      icon: LogOut,
      name: "로그아웃",
    },
  ];

  return (
    <ul className="menu menu-horizontal px-0 ">
      <li>
        <details>
          <summary className="h-9 font-bold text-text-primary hover:bg-gray-300 focus:bg-transparent ">
            {user.name}
          </summary>
          <ul className="right-1 z-[1] w-44 rounded-box bg-background text-text-primary ">
            {menuItems.map(({ url, icon: Icon, name }, index) => (
              <li key={`${index}-${name}`} className="group">
                <Link to={url}>
                  <div className="h-6 w-6 group-hover:text-blue-500">
                    <Icon size={20} aria-label={name} />
                  </div>
                  <span className="text-right font-bold group-hover:text-blue-500">{name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default DropdownMenu;
