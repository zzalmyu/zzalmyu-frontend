import { cn } from "@/utils/tailwind";
import ZzalCard from "../ZzalCard";

interface Props {
  src: string;
  isMyMessage: boolean;
  nickname: string;
}

const ZzalMessage = ({ src, isMyMessage, nickname = "짤용이" }: Props) => {
  return (
    <div
      className={cn(
        isMyMessage ? "items-end self-end" : "items-start self-start",
        "mx-15pxr my-5pxr flex w-1/3 flex-col gap-1",
      )}
    >
      <div className="text-sm font-semibold text-text-primary">{nickname}</div>
      <div className="rounded-xl bg-surface1 p-5pxr">
        <ZzalCard src={src} alt="짤 메세지" width={"full"} />
      </div>
    </div>
  );
};

export default ZzalMessage;
