import { ReactNode } from "react";
import { Heart, SendHorizontal } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface ZzalCardProps {
  children?: ReactNode;
  src: string;
  alt: string;
  hasAnimation?: boolean;
  width?: number | string;
  className?: string;
}

const ZzalCard = ({
  children,
  src,
  alt,
  width = 72,
  hasAnimation = true,
  className,
}: ZzalCardProps) => {
  return (
    <div className={cn(`group relative w-${width} rounded-lg bg-base-100 shadow-xl`, className)}>
      <div className="button-container absolute right-2 top-1 z-10 w-fit opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
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
  );
};

interface LikeButtonProps {
  isLiked: boolean;
}

const LikeButton = ({ isLiked }: LikeButtonProps) => {
  const { imageId } = useContext(ZzalCardContext);
  const { addImageLike } = useAddImageLike();

  const handleClickAddImageLike = () => {
    addImageLike(imageId);
  };

  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white"
      onClick={handleClickAddImageLike}
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
  const setPreviewImage = useSetAtom($previewImage);

  const handleClickSendImageSrc = () => {
    setPreviewImage(src);
  };
  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      onClick={handleClickSendImageSrc}
    >
      <SendHorizontal aria-label="보내기" size={20} fill="white" />
    </button>
  );
};

const CopyButton = () => {
  const { src } = useContext(ZzalCardContext);

  const handleClickCopytoClipboard = () => {
    navigator.clipboard.writeText(src);

    toast.success("짤을 클립보드에 복사하였습니다.", { autoClose: 1500 });
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
