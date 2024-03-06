import { useState } from "react";
import { toast } from "react-toastify";
import { useOverlay } from "@toss/use-overlay";
import { FolderDown, SendHorizontal, Siren, Heart, Trash2 } from "lucide-react";
import ReportConfirmModal from "../ReportConfirmModal";
import usePostReportZzal from "@/hooks/api/zzal/usePostReportZzal";
import useDeleteMyZzal from "@/hooks/api/zzal/useDeleteMyZzal";

interface ApiError extends Error {
  response: {
    status: number;
  };
}

const ImageMenuBar = () => {
  const { reportZzal } = usePostReportZzal();
  const { deleteMyZzal } = useDeleteMyZzal();
  const imageId = 152; // TODO: [2024-02-28] 이미지 상세보기 api 연결 후, 실제 imageId를 가져와야합니다.
  const [isLiked, setIsLiked] = useState(false);
  const reportConfirmOverlay = useOverlay();

  const handleClickLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleClickReportCompeleteButton = (imageId: number) => () => {
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
  const handleClickReportButton = () => {
    reportConfirmOverlay.open(({ isOpen, close }) => (
      <ReportConfirmModal
        isOpen={isOpen}
        onClose={close}
        onReport={handleClickReportCompeleteButton(imageId)}
      />
    ));
  };

  const handleClickDeleteButton = () => {
    deleteMyZzal(imageId, {
      onSuccess: () => {
        toast.success("사진이 삭제되었습니다.");
      },
      onError: () => {
        toast.error("사진 삭제에 실패했습니다.");
      },
    }); // TODO: [2024-03-05] 모달 클릭 시 URL이 변경되도록 구현 후, 이미지 삭제 성공 시 이전 페이지로 이동하는 navigate 추가 필요
  };

  const menuItems = [
    { Icon: FolderDown, name: "다운로드", onClick: () => {} },
    { Icon: Heart, name: "좋아요", onClick: handleClickLike },
    { Icon: SendHorizontal, name: "채팅 전송", onClick: () => {} },
    { Icon: Siren, name: "신고하기", onClick: handleClickReportButton },
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
