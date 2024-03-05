import { useState } from "react";
import { toast } from "react-toastify";
import { FolderDown, SendHorizontal, Siren, Heart } from "lucide-react";
import usePostReportZzal from "@/hooks/api/zzal/usePostReportZzal";

interface ApiError extends Error {
  response: {
    status: number;
  };
}

const ImageMenuBar = () => {
  const { reportZzal } = usePostReportZzal();
  const imageId = 152; // TODO: [2024-02-28] 이미지 상세보기 api 연결 후, 실제 imageId를 가져와야합니다.
  const [isLiked, setIsLiked] = useState(false);

  const handleClickLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleClickReportButton = () => {
    reportZzal(imageId, {
      onSuccess: () => {
        toast.success("신고가 완료되었습니다.");
      },
      onError: (error: Error) => {
        const apiError = error as ApiError;
        if (apiError.response.status === 400) {
          toast.error("이미 신고가 완료되었습니다.");
        } else if (apiError.response.status === 500) {
          toast.error("신고가 올바르게 되지 않았습니다.");
        }
      },
    });
  };

  const menuItems = [
    { Icon: FolderDown, name: "다운로드", onClick: () => {} },
    { Icon: Heart, name: "좋아요", onClick: handleClickLike },
    { Icon: SendHorizontal, name: "채팅 전송", onClick: () => {} },
    { Icon: Siren, name: "신고하기", onClick: handleClickReportButton },
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
