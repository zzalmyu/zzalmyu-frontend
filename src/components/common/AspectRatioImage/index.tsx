import { ReactNode } from "react";
import SendButton from "./SendButton";
import LikeButton from "./LikeButton";

interface Props {
  children?: ReactNode;
  src: string;
  locationUsed: "HOME" | "MYLIKED" | "MYUPLOADED" | "CHAT";
}

const AspectRatioImage = ({ children, src, locationUsed }: Props) => {
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

AspectRatioImage.SendButton = SendButton;
AspectRatioImage.LikeButton = LikeButton;

export default AspectRatioImage;
