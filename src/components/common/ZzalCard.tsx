import { ReactNode, createContext, useContext } from "react";
import { toast } from "react-toastify";
import { Heart, SendHorizontal, Copy } from "lucide-react";
import { useSetAtom } from "jotai";
import { cn } from "@/utils/tailwind";
import { copyZzal } from "@/utils/copyZzal";
import { useAddImageLike } from "@/hooks/api/zzal/useAddImageLike";
import { $setMessagePreview } from "@/store/chat";
import { useRemoveImageLike } from "@/hooks/api/zzal/useRemoveImageLike";

interface ZzalCardProps {
  children?: ReactNode;
  src: string;
  alt: string;
  hasAnimation?: boolean;
  width?: number | string;
  className?: string;
  imageId: number;
  isLiked: boolean;
  imageIndex: number;
  queryKey: string;
}

interface ZzalCardContextType {
  src: string;
  imageId: number;
  isLiked: boolean;
  imageIndex: number;
  queryKey: string;
}

const ZzalCardContext = createContext<ZzalCardContextType>({
  src: "",
  imageId: 0,
  isLiked: false,
  imageIndex: 0,
  queryKey: "",
});

const ZzalCard = ({
  children,
  src,
  alt,
  width = 72,
  hasAnimation = true,
  imageId,
  isLiked,
  imageIndex,
  className,
  queryKey,
}: ZzalCardProps) => {
  return (
    <ZzalCardContext.Provider value={{ src, imageId, isLiked, imageIndex, queryKey }}>
      <div className={cn(`group relative w-${width} rounded-lg bg-base-100 shadow-xl`, className)}>
        <div className="button-container absolute bottom-2 right-2 z-10 flex w-fit gap-1.5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
          {children}
        </div>
        <figure
          className={cn(
            "h-fit",
            `${hasAnimation ? "transition duration-300 ease-in-out hover:brightness-75" : "none"}`,
          )}
        >
          <img src={src} alt={alt} className="h-full w-full rounded-lg object-cover" />
        </figure>
      </div>
    </ZzalCardContext.Provider>
  );
};

const LikeButton = () => {
  const { imageId, isLiked, imageIndex, queryKey } = useContext(ZzalCardContext);
  const { addImageLike } = useAddImageLike(imageIndex, queryKey);
  const { removeImageLike } = useRemoveImageLike(imageIndex, queryKey);

  const handleClickImageLike = () => {
    if (!isLiked) {
      addImageLike(imageId, {
        onError: () =>
          toast.error("좋아요 요청이 실패하였습니다 다시 시도해주세요.", { autoClose: 1500 }),
      });

      return;
    }

    removeImageLike(imageId, {
      onError: () =>
        toast.error("좋아요 취소에 실패하였습니다 다시 시도해주세요.", { autoClose: 1500 }),
    });
  };

  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white"
      onClick={handleClickImageLike}
    >
      <Heart
        aria-label="좋아요"
        size={18}
        strokeWidth={isLiked ? 0 : 2}
        fill={isLiked ? "#ED0000" : "none"}
      />
    </button>
  );
};

const SendButton = () => {
  const { src } = useContext(ZzalCardContext);
  const setPreviewImage = useSetAtom($setMessagePreview);

  const handleClickSendImageSrc = () => {
    setPreviewImage(src);
  };

  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      onClick={handleClickSendImageSrc}
    >
      <SendHorizontal aria-label="채팅창 보내기" size={20} fill="white" />
    </button>
  );
};

const CopyButton = () => {
  const { src } = useContext(ZzalCardContext);

  const handleClickCopytoClipboard = () => {
    copyZzal(src);
  };

  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      onClick={handleClickCopytoClipboard}
    >
      <Copy aria-label="이미지 복사" size={20} stroke="white" />
    </button>
  );
};

ZzalCard.SendButton = SendButton;
ZzalCard.LikeButton = LikeButton;
ZzalCard.CopyButton = CopyButton;

export default ZzalCard;
