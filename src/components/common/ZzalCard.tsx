import { toast } from "react-toastify";
import { Heart, SendHorizontal, Copy } from "lucide-react";
import { useSetAtom } from "jotai";
import { useOverlay } from "@toss/use-overlay";
import axios from "axios";
import { cn } from "@/utils/tailwind";
import { copyZzal } from "@/utils/zzalUtils";
import { ZzalType } from "@/types/queryKey";
import ImageDetailModal from "../ImageDetailModal";
import { useAddImageLike } from "@/hooks/api/zzal/useAddImageLike";
import { $setMessagePreview } from "@/store/chat";
import { useRemoveImageLike } from "@/hooks/api/zzal/useRemoveImageLike";

interface Props {
  src: string;
  alt: string;
  imageId: number;
  isLiked: boolean;
  imageIndex: number;
  queryKey: [ZzalType, string[]];
  width?: number | string;
  className?: string;
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
}: Props) => {
  const zzalModalOverlay = useOverlay();

  const handleClickZzal = () => {
    zzalModalOverlay.open(({ isOpen, close }) => (
      <ImageDetailModal isOpen={isOpen} onClose={close} imageId={imageId} />
    ));
  };

  return (
    <div
      className={cn(`group relative w-${width} m-1.5 rounded-lg bg-base-100 shadow-xl`, className)}
    >
      <div className="button-container absolute bottom-2 right-2 z-10 flex w-fit gap-1.5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
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
  const { addImageLike } = useAddImageLike(imageIndex, queryKey);
  const { removeImageLike } = useRemoveImageLike(imageIndex, queryKey);

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

export default ZzalCard;
