import { ReactNode } from "react";
import SendButton from "./SendButton";
import LikeButton from "./LikeButton";

interface Props {
  children: ReactNode;
  src: string;
}

const AspectRatioImage = ({ children, src }: Props) => {
  return (
    <div className="relative mt-6 w-72 rounded-lg bg-base-100 shadow-xl">
      <div className="button-container absolute right-0 w-fit">{children}</div>
      <figure className="transition duration-300 ease-in-out hover:brightness-75">
        <img src={src} alt="zzal" className="h-full w-full rounded-lg object-cover" />
      </figure>
    </div>
  );
};

AspectRatioImage.SendButton = SendButton;
AspectRatioImage.LikeButton = LikeButton;

export default AspectRatioImage;
