import { useState, Fragment, Suspense } from "react";
import { Heart, Copy, FolderDown, SendHorizontal, Siren, Trash2, Hash } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { copyZzal, downloadZzal } from "@/utils/zzalUtils";
import { debounce } from "@/utils/debounce";
import ButtonWithIcon from "./ButtonWithIcon";
import TagSlider from "./TagSlider";
import Modal from "@/components/common/modals/Modal";
import useGetZzalDetails from "@/hooks/api/zzal/useGetZzalDetails";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const IMAGEID = 70;
{
  /*TODO: [2024.03.06] 실제 IMAGEID 받기 */
}

const ImageDetailModalContent = () => {
  const [isTagNavigatorOpen, setIsTagNavigatorOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { zzalDetails } = useGetZzalDetails(IMAGEID);
  const { imageLikeYn: isLiked, imgUrl: imageUrl, tags, imageTitle, uploadUserId } = zzalDetails;
  const isUploader = uploadUserId === 123;
  {
    /*TODO: [2024.03.01] 추후 실제 사용자 아이디와 비교하기 */
  }

  {
    /*TODO: [2024.03.05] 해당 handler함수 로직 추가하기*/
  }
  const handleClickLikeButton = () => {};

  const handleClickSendButton = () => {};

  const handleClickReportButton = () => {};

  const handleClickDeleteButton = () => {};

  const handleClickDownloadButton = debounce(async () => {
    setIsDownloading(true);

    await downloadZzal({
      imageUrl,
      imageTitle,
    });

    setIsDownloading(false);
  }, 500);

  const handleClickCopyButton = debounce(() => {
    copyZzal(imageUrl);
  }, 500);

  const toggleTagNavigator = () => {
    setIsTagNavigatorOpen(!isTagNavigatorOpen);
  };

  return (
    <Fragment>
      <div className="relative flex w-full justify-center">
        <div className="z-30 flex h-90pxr w-full justify-center bg-background">
          <div className=" flex flex-grow items-center justify-between space-x-4 bg-background px-50pxr py-10pxr">
            <ButtonWithIcon
              Icon={FolderDown}
              iconLabel="다운로드"
              children="다운로드"
              onClick={handleClickDownloadButton}
              isLoading={isDownloading}
            />
            <ButtonWithIcon
              Icon={SendHorizontal}
              iconLabel="채팅에 전송하기"
              children="채팅에 전송하기"
              onClick={handleClickSendButton}
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
              iconLabel="신고하기"
              children="신고하기"
              onClick={handleClickReportButton}
            />
            <ButtonWithIcon
              Icon={Trash2}
              iconLabel="삭제하기"
              children="삭제하기"
              isDisabled={!isUploader}
              onClick={handleClickDeleteButton}
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
        <img src={imageUrl} alt={imageTitle} className="w-full" />
      </div>
      <div className="fixed bottom-0 right-0 flex flex-col space-y-4 p-25pxr hover:text-gray-300">
        <button onClick={handleClickCopyButton}>
          <Copy color="white" size={30} aria-label="복사하기" />
        </button>
        <button onClick={handleClickLikeButton}>
          <Heart
            color="white"
            size={30}
            aria-label="좋아요"
            className={cn({ "fill-primary": isLiked })}
          />
        </button>
      </div>
    </Fragment>
  );
};

const ImageDetailModal = ({ isOpen, onClose }: Props) => {
  return (
    <Suspense fallback={"...pending"}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ImageDetailModalContent />
      </Modal>
    </Suspense>
  );
};

export default ImageDetailModal;
