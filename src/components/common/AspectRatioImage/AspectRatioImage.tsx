import { ReactNode } from "react";
import ButtonContainer from "./ButtonContainer";
import SendButton from "./SendButton";
import LikeButton from "./LikeButton";

interface Props {
  children: ReactNode;
  src: string;
}

const AspectRatioImage = ({ children, src }: Props) => {
  return (
    <div className="card card-compact relative mt-6 w-72 rounded-lg bg-base-100 shadow-xl">
      {children}
      <figure>
        <img src={src} alt="zzal" className="h-full w-full rounded-lg object-cover" />
      </figure>
    </div>
  );
};

AspectRatioImage.ButtonContainer = ButtonContainer;
AspectRatioImage.SendButton = SendButton;
AspectRatioImage.LikeButton = LikeButton;

export default AspectRatioImage;
