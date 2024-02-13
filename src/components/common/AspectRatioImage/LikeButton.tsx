import { Heart } from "lucide-react";

interface Props {
  onClick: () => void;
  isLiked: boolean;
}

const LikeButton = ({ onClick, isLiked }: Props) => {
  return (
    <div
      className="mt-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white"
      onClick={onClick}
    >
      <Heart aria-label="좋아요" size={18} fill={isLiked ? "#246FFF" : "none"} />
    </div>
  );
};

export default LikeButton;
