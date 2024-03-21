import { useState, Fragment, Suspense } from "react";
import { toast } from "react-toastify";
import { Heart, Copy, FolderDown, SendHorizontal, Siren, Hash } from "lucide-react";
import { useOverlay } from "@toss/use-overlay";
import axios, { AxiosError } from "axios";
import { useSetAtom } from "jotai";
import ReportConfirmModal from "@/components/ReportConfirmModal";
import { cn } from "@/utils/tailwind";
import { copyZzal, downloadZzal } from "@/utils/zzalUtils";
import { debounce } from "@/utils/debounce";
import { ZzalType } from "@/types/queryKey";
import ButtonWithIcon from "./ButtonWithIcon";
import TagSlider from "@/components/common/TagSlider";
import Modal from "@/components/common/modals/Modal";
import useGetZzalDetails from "@/hooks/api/zzal/useGetZzalDetails";
import usePostReportZzal from "@/hooks/api/zzal/usePostReportZzal";
import { useAddImageLike } from "@/hooks/api/zzal/useAddImageLike";
import { useRemoveImageLike } from "@/hooks/api/zzal/useRemoveImageLike";
import { $setMessagePreview } from "@/store/chat";
import useModalContext from "@/hooks/modals/useModalContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageId: number;
  imageIndex: number;
  queryKey: [ZzalType, string[]];
}

interface CustomErrorResponse {
  statusCode: number;
  code: string;
}

interface ImageDetailModalContentProps {
  imageId: number;
  imageIndex: number;
  queryKey: [ZzalType, string[]];
}

const ImageDetailModalContent = ({
  imageId,
  imageIndex,
  queryKey,
}: ImageDetailModalContentProps) => {
  const [isTagNavigatorOpen, setIsTagNavigatorOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const { zzalDetails } = useGetZzalDetails(imageId);
  const { reportZzal } = usePostReportZzal();
  const reportConfirmOverlay = useOverlay();
  const { isLiked, imageUrl, tagNames, imageTitle } = zzalDetails;
  const { addImageLike } = useAddImageLike(imageIndex, queryKey, imageId);
  const { removeImageLike } = useRemoveImageLike(imageIndex, queryKey, imageId);
  const setPreviewImage = useSetAtom($setMessagePreview);
  const onClose = useModalContext();

  const errorMessage = {
    REPORT_ALREADY_EXIST_ERROR: "이미 신고가 완료되었습니다.",
    DEFAULT: "신고가 올바르게 되지 않았습니다.",
  };

  const handleClickReportCompeleteButton = (imageId: number) => () => {
    reportZzal(imageId, {
      onSuccess: () => {
        toast.success("신고가 완료되었습니다.");
        gtag("event", "user_action", { event_category: "짤_신고" });
      },
      onError: (error: Error | AxiosError) => {
        if (!axios.isAxiosError(error)) {
          return;
        }

        const { statusCode, code } = error.response?.data as CustomErrorResponse;

        if (statusCode === 400 && code === "REPORT_ALREADY_EXIST_ERROR") {
          toast.error(errorMessage[code]);
        } else {
          toast.error(errorMessage["DEFAULT"]);
        }
      },
    });
  };

  const handleClickReportButton = () => {
    gtag("event", "modal_open", { event_category: "신고_확인_모달_띄우기" });
    reportConfirmOverlay.open(({ isOpen, close }) => (
      <ReportConfirmModal
        isOpen={isOpen}
        onClose={close}
        onReport={handleClickReportCompeleteButton(imageId)}
      />
    ));
  };

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

  const handleClickLikeButton = () => {
    if (!isLiked) {
      addImageLike(imageId, {
        onSuccess: () => {
          gtag("event", "user_action", { event_category: "짤_좋아요_등록" });
        },
        onError: (error) => {
          if (!axios.isAxiosError(error)) return;
          if (error.response?.status === 400) {
            toast.error("이미 좋아요가 요청 되었습니다.", { autoClose: 1500 });
          }
          if (error.response?.status === 401) {
            toast.error("로그인이 필요한 기능입니다.", { autoClose: 1500 });
          }
        },
      });

      return;
    }

    removeImageLike(imageId, {
      onSuccess: () => {
        gtag("event", "user_action", { event_category: "짤_좋아요_삭제" });
      },
      onError: (error) => {
        if (!axios.isAxiosError(error)) return;
        if (error.response?.status === 400) {
          toast.error("이미 좋아요가 취소 되었습니다.", { autoClose: 1500 });
        }
        if (error.response?.status === 401) {
          toast.error("로그인이 필요한 기능입니다.", { autoClose: 1500 });
        }
      },
    });
  };

  const handleClickSendButton = () => {
    setPreviewImage(imageUrl);
    onClose();
  };

  const toggleTagNavigator = () => setIsTagNavigatorOpen(!isTagNavigatorOpen);

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
              isDisabled={isDownloading}
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
              Icon={Heart}
              iconLabel="좋아요"
              children="좋아요"
              onClick={handleClickLikeButton}
              className={cn({ "fill-primary": isLiked })}
            />
          </div>
        </div>
        <div
          className={cn(
            "duration-250 absolute z-0 w-full bg-background px-20pxr py-10pxr transition-all",
            {
              "top-full": isTagNavigatorOpen,
              "top-0": !isTagNavigatorOpen,
            },
          )}
        >
          <TagSlider tags={tagNames} tagClassName="bg-primary text-white" isClickable={false} />
        </div>
      </div>
      <div className=" max-h-500pxr overflow-auto">
        <img src={imageUrl} alt={imageTitle} className="w-full" />
      </div>
      <div className="fixed bottom-0 right-0 flex flex-col space-y-4 p-25pxr text-gray-300 hover:text-gray-200">
        <button onClick={handleClickCopyButton}>
          <Copy size={33} aria-label="복사하기" />
        </button>
      </div>
    </Fragment>
  );
};

const ImageDetailModal = ({ isOpen, onClose, imageId, imageIndex, queryKey }: Props) => {
  return (
    <Suspense fallback={"...pending"}>
      <Modal isOpen={isOpen} onClose={onClose} size="sm">
        <ImageDetailModalContent imageId={imageId} imageIndex={imageIndex} queryKey={queryKey} />
      </Modal>
    </Suspense>
  );
};

export default ImageDetailModal;
