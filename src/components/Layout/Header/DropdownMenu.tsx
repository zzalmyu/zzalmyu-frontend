import Upload from "@/assets/svg/upload.svg?react";
import Home from "@/assets/svg/home.svg?react";
import Heart from "@/assets/svg/heart.svg?react";
import Logout from "@/assets/svg/logout.svg?react";

interface Props {
  user: {
    name: string;
  };
}

const DropdownMenu = ({ user }: Props) => {
  const menuItems = [
    {
      url: "/",
      icon: Upload,
      name: "업로드한 짤",
    },
    {
      url: "/",
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
      icon: Logout,
      name: "로그아웃",
    },
  ];

  return (
    <ul className="menu menu-horizontal px-0 ">
      <li>
        <details>
          <summary className="h-9 font-bold hover:bg-gray-300 focus:bg-transparent ">
            {user.name}
          </summary>
          <ul className=" right-1 z-[1]  w-48 rounded-box bg-background">
            {menuItems.map(({ url, icon: Icon, name }) => (
              <li key={name} className="group ">
                <a href={url}>
                  <div className="h-6 w-6 group-hover:text-blue-500">
                    <Icon />
                  </div>
                  <span className="text-right font-bold group-hover:text-blue-500">{name}</span>
                </a>
              </li>
            ))}
          </ul>
        </details>
      </li>
    </ul>
  );
};

export default DropdownMenu;
