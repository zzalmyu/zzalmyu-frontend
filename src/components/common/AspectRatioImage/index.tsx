import { ReactNode } from "react";
import { Heart } from "lucide-react";
import { SendHorizontal } from "lucide-react";

interface AspectRatioImageProps {
  children?: ReactNode;
  src: string;
  locationUsed: "HOME" | "MYLIKED" | "MYUPLOADED" | "CHAT";
}

const AspectRatioImage = ({ children, src, locationUsed }: AspectRatioImageProps) => {
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
        <img src={src} alt="zzal" className="h-full w-full rounded-lg object-cover" />
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
      <Heart aria-label="좋아요" size={18} fill={isLiked ? "#246FFF" : "none"} />
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

AspectRatioImage.SendButton = SendButton;
AspectRatioImage.LikeButton = LikeButton;

export default AspectRatioImage;
