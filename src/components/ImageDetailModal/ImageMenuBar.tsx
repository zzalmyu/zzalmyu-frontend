import { useState } from "react";
import { useOverlay } from "@toss/use-overlay";
import { FolderDown, SendHorizontal, Siren, Heart } from "lucide-react";
import ReportConfirmModal from "../ReportConfirmModal";

const ImageMenuBar = () => {
  const [isLiked, setIsLiked] = useState(false);
  const reportConfirmOverlay = useOverlay();

  const handleClickLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleOpenReportConfirmModal = () => {
    reportConfirmOverlay.open(({ isOpen, close }) => (
      <ReportConfirmModal
        isOpen={isOpen}
        onClose={close}
        onReport={() => {}} // TODO: [2024-03-03] 짤 이미지 신고 api 연결 - onReport={handleClickReportConfirm(imageId)}
      />
    ));
  };

  const menuItems = [
    { Icon: FolderDown, name: "다운로드", onClick: () => {} },
    { Icon: Heart, name: "좋아요", onClick: handleClickLike },
    { Icon: SendHorizontal, name: "채팅 전송", onClick: () => {} },
    { Icon: Siren, name: "신고하기", onClick: handleOpenReportConfirmModal },
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
