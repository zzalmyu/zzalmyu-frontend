import { useState } from "react";
import { FolderDown, SendHorizontal, Siren, Heart } from "lucide-react";

const ImageMenuBar = () => {
  const [liked, setLiked] = useState(false);

  const handleClickLike = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const menuItems = [
    { Icon: FolderDown, name: "다운로드", onClick: () => {} },
    { Icon: Heart, name: "좋아요", onClick: handleClickLike },
    { Icon: SendHorizontal, name: "채팅 전송", onClick: () => {} },
    { Icon: Siren, name: "신고하기", onClick: () => {} },
  ];

  return (
    <div className="absolute end-1 top-1 sm:-right-1">
      <ul className="menu rounded-xl bg-toolbar p-1 opacity-60 sm:absolute sm:opacity-100">
        {menuItems.map(({ Icon, name, onClick }, index) => (
          <li key={`${index}-${name}`}>
            <button
              onClick={onClick}
              className="tooltip tooltip-top sm:tooltip-right"
              data-tip={name}
            >
              <Icon size={20} color={Icon === Heart && liked ? "red" : "white"} aria-label={name} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageMenuBar;
