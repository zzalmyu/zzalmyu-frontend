import { ReactNode } from "react";
import { Heart, SendHorizontal } from "lucide-react";

interface ZzalCardProps {
  children?: ReactNode;
  src: string;
  alt: string;
  locationUsed: "HOME" | "MYLIKED" | "MYUPLOADED" | "CHAT";
}

const ZzalCard = ({ children, src, alt, locationUsed }: ZzalCardProps) => {
  return (
    <div
      className={`group relative ${locationUsed !== "CHAT" ? "w-72" : "w-48"}  rounded-lg bg-base-100 shadow-xl`}
    >
      <div className="button-container absolute right-2 top-1 z-10 w-fit opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        {children}
      </div>
      <figure
        className={`${locationUsed !== "CHAT" ? "transition duration-300 ease-in-out hover:brightness-75" : "none"}`}
      >
        <img src={src} alt={alt} className="h-full w-full rounded-lg object-cover" />
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
    <div
      className="mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
      onClick={onClick}
    >
      <Heart
        aria-label="좋아요"
        size={18}
        strokeWidth={isLiked ? 0 : 2}
        fill={isLiked ? "#ED0000" : "none"}
      />
    </div>
  );
};

interface SendButtonProps {
  onClick: () => void;
}

const SendButton = ({ onClick }: SendButtonProps) => {
  return (
    <div
      className="mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary"
      onClick={onClick}
    >
      <SendHorizontal aria-label="보내기" size={20} fill="white" />
    </div>
  );
};

ZzalCard.SendButton = SendButton;
ZzalCard.LikeButton = LikeButton;

export default ZzalCard;
