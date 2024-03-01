import { useState } from "react";
import { FolderDown, SendHorizontal, Siren, Heart, Trash2 } from "lucide-react";
import useDeleteMyZzal from "@/hooks/api/report/useDeleteMyZzal";

const ImageMenuBar = () => {
  const imageId = 146; // TODO: [2024-03-01] 이미지 상세보기 api 연결 후, 실제 imageId를 가져와야합니다.
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const { deleteMyZzal } = useDeleteMyZzal();

  const handleClickDeleteButton = () => {
    deleteMyZzal(imageId);
  };

  const menuItems = [
    { Icon: FolderDown, name: "다운로드", onClick: () => {} },
    { Icon: Heart, name: "좋아요", onClick: handleClickLike },
    { Icon: SendHorizontal, name: "채팅 전송", onClick: () => {} },
    { Icon: Siren, name: "신고하기", onClick: () => {} },
    { Icon: Trash2, name: "삭제하기", onClick: handleClickDeleteButton },
  ];

  return (
    <div className="absolute end-1 top-1 sm:-right-1">
      <ul className="menu rounded-xl bg-toolbar p-1 opacity-60 sm:absolute sm:opacity-100">
        {menuItems.map(({ Icon, name, onClick }, index) => (
          <li key={`${index}-${name}`}>
            <button
              onClick={onClick}
              className="tooltip tooltip-top sm:tooltip-right focus:bg-transparent"
              data-tip={name}
            >
              <Icon
                size={20}
                color={Icon === Heart && isLiked ? "red" : "white"}
                aria-label={name}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageMenuBar;
