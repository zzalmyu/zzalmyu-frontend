const DropdownMenu = () => {
  const menuItems = [
    {
      url: "/",
      icon: null,
      name: "업로드한 짤",
    },
    {
      url: "/",
      icon: null,
      name: "좋아요한 짤",
    },
    {
      url: "/",
      icon: null,
      name: "홈",
    },
    {
      url: "/",
      icon: null,
      name: "로그아웃",
    },
  ];

  return (
    <ul className="menu menu-horizontal px-0 ">
      <li>
        <details>
          <summary className="h-9 font-bold hover:bg-transparent focus:bg-transparent">
            userName
          </summary>
          <ul className=" right-1 z-[1]  w-48 rounded-box bg-background">
            {menuItems.map(({ url, name }) => (
              <li key={name} className="group ">
                <a href={url}>
                  <div className="h-6 w-6 group-hover:text-blue-500"></div>
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
