import { toast } from "react-toastify";
import { Heart, SendHorizontal, Copy } from "lucide-react";
import { useSetAtom } from "jotai";
import { useOverlay } from "@toss/use-overlay";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { copyZzal } from "@/utils/zzalUtils";
import { ZzalType } from "@/types/queryKey";
import ImageDetailModal from "../ImageDetailModal";
import { useAddImageLike } from "@/hooks/api/zzal/useAddImageLike";
import { $setMessagePreview } from "@/store/chat";
import { useRemoveImageLike } from "@/hooks/api/zzal/useRemoveImageLike";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import useDeleteMyZzal from "@/hooks/api/zzal/useDeleteMyZzal";

interface Props {
  src: string;
  alt: string;
  imageId: number;
  isLiked: boolean;
  imageIndex: number;
  queryKey: [ZzalType, string[]];
  width?: number | string;
  className?: string;
  hasDeleteButton?: boolean;
}

const ZzalCard = ({
  src,
  alt,
  imageId,
  isLiked,
  imageIndex,
  queryKey,
  width = 72,
  className,
  hasDeleteButton = false,
}: Props) => {
  const zzalModalOverlay = useOverlay();

  const handleClickZzal = () => {
    zzalModalOverlay.open(({ isOpen, close }) => (
      <ImageDetailModal
        isOpen={isOpen}
        onClose={close}
        imageId={imageId}
        queryKey={queryKey}
        imageIndex={imageIndex}
      />
    ));
  };

  return (
    <div
      className={cn(`group relative w-${width} m-1.5 rounded-lg bg-base-100 shadow-xl`, className)}
    >
      <div className="button-container absolute bottom-2 right-2 z-10 flex w-fit gap-1.5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        {hasDeleteButton && <DeleteButton imageId={imageId} />}
        <CopyButton src={src} />
        <SendButton src={src} />
        <LikeButton
          imageId={imageId}
          isLiked={isLiked}
          imageIndex={imageIndex}
          queryKey={queryKey}
        />
      </div>
      <figure className="h-fit transition duration-300 ease-in-out hover:brightness-75">
        {src && (
          <img
            src={src}
            alt={alt}
            className="h-full w-full cursor-zoom-in rounded-lg object-cover"
            onClick={handleClickZzal}
          />
        )}
      </figure>
    </div>
  );
};

interface LikeButtonProps {
  imageId: number;
  isLiked: boolean;
  imageIndex: number;
  queryKey: [ZzalType, string[]];
}
const LikeButton = ({ imageId, isLiked, imageIndex, queryKey }: LikeButtonProps) => {
  const { addImageLike } = useAddImageLike(imageIndex, queryKey, imageId);
  const { removeImageLike } = useRemoveImageLike(imageIndex, queryKey, imageId);

  const handleClickImageLike = () => {
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
            toast.info("로그인이 필요한 기능입니다.", { autoClose: 1500 });
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
          toast.info("로그인이 필요한 기능입니다.", { autoClose: 1500 });
        }
      },
    });
  };

  return (
    <button
      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-white"
      onClick={handleClickImageLike}
    >
      <Heart
        aria-label="좋아요"
        size={18}
        className={cn({ "fill-primary text-primary": isLiked, "text-black": !isLiked })}
      />
    </button>
  );
};

interface SendButtonProps {
  src: string;
}
const SendButton = ({ src }: SendButtonProps) => {
  const setPreviewImage = useSetAtom($setMessagePreview);

  const handleClickSendImageSrc = () => {
    setPreviewImage(src);
  };

  return (
    <button
      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary"
      onClick={handleClickSendImageSrc}
    >
      <SendHorizontal aria-label="채팅창 보내기" size={18} color="white" />
    </button>
  );
};

interface CopyButtonProps {
  src: string;
}
const CopyButton = ({ src }: CopyButtonProps) => {
  const handleClickCopytoClipboard = () => {
    copyZzal(src);
  };

  return (
    <button
      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary"
      onClick={handleClickCopytoClipboard}
    >
      <Copy aria-label="이미지 복사" size={18} color="white" />
    </button>
  );
};

interface DeleteButtonProps {
  imageId: number;
}
const DeleteButton = ({ imageId }: DeleteButtonProps) => {
  const { deleteMyZzal } = useDeleteMyZzal();
  const deleteConfirmOverlay = useOverlay();

  const handleClickDeleteConfirm = (imageId: number) => () => {
    deleteMyZzal(imageId, {
      onSuccess: () => {
        toast.success("사진이 삭제되었습니다.");
        gtag("event", "user_action", { event_category: "짤_삭제" });
      },
      onError: () => {
        toast.error("사진 삭제에 실패했습니다.");
      },
    });
    gtag("event", "user_action", { event_category: "짤_삭제" });
  };

  const handleClickDeleteButton = (imageId: number) => () => {
    deleteConfirmOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={close}
        onDelete={handleClickDeleteConfirm(imageId)}
      />
    ));
  };

  return (
    <button
      className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-black  bg-opacity-50 hover:bg-opacity-80"
      onClick={handleClickDeleteButton(imageId)}
    >
      <Trash2 aria-label="짤 삭제" size={18} className="text-white" />
    </button>
  );
};

export default ZzalCard;
