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
        {src && <img src={src} alt={alt} className="h-full w-full rounded-lg object-cover" />}
      </figure>
    </div>
  );
};

interface LikeButtonProps {
  onClick: () => void;
  isLiked: boolean;
}

const LikeButton = ({ onClick, isLiked }: LikeButtonProps) => {
  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-white"
      onClick={onClick}
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

interface SendButtonProps {
  onClick: () => void;
}

const SendButton = ({ onClick }: SendButtonProps) => {
  return (
    <button
      className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary"
      onClick={onClick}
    >
      <SendHorizontal aria-label="보내기" size={20} fill="white" />
    </button>
  );
};

ZzalCard.SendButton = SendButton;
ZzalCard.LikeButton = LikeButton;

export default ZzalCard;
