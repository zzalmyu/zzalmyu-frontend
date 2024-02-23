import { cn } from "@/utils/tailwind";
import ZzalCard from "../ZzalCard";

interface Props {
  src: string;
  isMyMessage: boolean;
}
const Message = ({ src, isMyMessage }: Props) => {
  return (
    <div
      className={cn(
        isMyMessage ? "self-end" : "self-start",
        "mx-15pxr my-5pxr w-1/3 rounded-xl bg-surface1 p-5pxr",
      )}
    >
      <ZzalCard src={src} alt="짤 메세지" width={"full"} />
    </div>
  );
};

export default Message;
