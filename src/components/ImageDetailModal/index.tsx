import { useState } from "react";
import { Heart, Copy, FolderDown, SendHorizontal, Siren, Trash2, Hash } from "lucide-react";
import { cn } from "@/utils/tailwind";
import ButtonWithIcon from "./ButtonWithIcon";
import TagSlider from "./TagSlider";
import Modal from "@/components/common/modals/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const imageDetails = {
  imageId: 1,
  uploadUserId: 123,
  imgUrl:
    "https://zzalmyu-bucket.s3.ap-northeast-2.amazonaws.com/upload/keroro9073%40gmail.comtemp_image1626418983561547350.jpg",
  imageLikeYn: true,
  tags: [
    {
      id: 0,
      name: "일이삼사오육칠팔구십",
      splitName: "o",
      createdAt: "2024-03-01T05:59:48.528Z",
    },
    {
      id: 1,
      name: "일이삼사오육칠팔구십",
      splitName: "o",
      createdAt: "2024-03-01T05:59:48.528Z",
    },
    {
      id: 2,
      name: "일이삼사오육칠팔구십",
      splitName: "o",
      createdAt: "2024-03-01T05:59:48.528Z",
    },
    { id: 3, name: "음식", splitName: "o", createdAt: "2024-03-01T05:59:48.528Z" },
    { id: 4, name: "여행", splitName: "o", createdAt: "2024-03-01T05:59:48.528Z" },
    { id: 5, name: "무한도전", splitName: "o", createdAt: "2024-03-01T05:59:48.528Z" },
    { id: 6, name: "운동", splitName: "o", createdAt: "2024-03-01T05:59:48.528Z" },
  ],
  imageTitle: "안유진",
};

const ImageDetailModal = ({ isOpen, onClose }: Props) => {
  const [isTagNavigatorOpen, setIsTagNavigatorOpen] = useState(false);
  const { imageLikeYn, imgUrl, tags, imageTitle, uploadUserId } = imageDetails;
  const [isLiked, setIsLiked] = useState(imageLikeYn);
  const isUploader = uploadUserId === 123;
  {
    /*TODO: [2024.03.01] 추후 실제 사용자 아이디와 비교하기 */
  }

  const toggleTagNavigator = () => {
    setIsTagNavigatorOpen(!isTagNavigatorOpen);
  };

  const handleClickLike = () => {
    setIsLiked((prevLiked) => !prevLiked);
  };

  const handleDownloadZzal = () => {};

  const handleSendToChat = () => {};

  const handleReportZzal = () => {};

  const handleDeleteZzal = () => {};

  const handleCopyZzal = async () => {};

  {
    /*TODO: [2024.03.05] 해당 handler함수 로직 추가하기*/
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="relative flex w-full justify-center">
        <div className="z-30 flex h-90pxr w-full justify-center bg-background">
          <div className=" flex flex-grow items-center justify-between space-x-4 bg-background px-50pxr py-10pxr">
            <ButtonWithIcon
              Icon={FolderDown}
              label="다운로드"
              children="다운로드"
              onClick={handleDownloadZzal}
            />
            <ButtonWithIcon
              Icon={SendHorizontal}
              label="채팅에 전송하기"
              children="채팅에 전송하기"
              onClick={handleSendToChat}
            />
            <button
              onClick={toggleTagNavigator}
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full drop-shadow-[0_0_5px_rgba(0,0,0,0.25)]",
                {
                  "bg-primary text-white": isTagNavigatorOpen,
                  "bg-gray-50 text-gray-500": !isTagNavigatorOpen,
                },
              )}
            >
              <Hash
                size={20}
                strokeWidth={2.5}
                aria-label={isTagNavigatorOpen ? "태그 숨기기" : "태그 보기"}
              />
            </button>
            <ButtonWithIcon
              Icon={Siren}
              label="신고하기"
              children="신고하기"
              onClick={handleReportZzal}
            />
            <ButtonWithIcon
              Icon={Trash2}
              label="삭제하기"
              children="삭제하기"
              isDisabled={!isUploader}
              onClick={handleDeleteZzal}
            />
          </div>
        </div>
        <div
          className={cn("duration-250 absolute z-0 w-full transition-all", {
            "top-full": isTagNavigatorOpen,
            "top-0": !isTagNavigatorOpen,
          })}
        >
          <TagSlider tags={tags} />
        </div>
      </div>
      <div className=" max-h-500pxr overflow-auto">
        <img src={imgUrl} alt={imageTitle} className="w-full" />
      </div>
      <div className="fixed bottom-0 right-0 flex flex-col space-y-4 p-25pxr hover:text-gray-300">
        <button onClick={handleCopyZzal}>
          <Copy color="white" size={30} aria-label="복사하기" />
        </button>
        <button onClick={handleClickLike}>
          <Heart
            color="white"
            size={30}
            aria-label="좋아요"
            className={cn({ "fill-primary": isLiked })}
          />
        </button>
      </div>
    </Modal>
  );
};

export default ImageDetailModal;
