import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface Props {
  Icon: LucideIcon;
  text: string;
  onClick: () => void;
  isDisabled?: boolean;
}

const ButtonWithIcon = ({ Icon, text, onClick, isDisabled }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn("text-icon flex flex-col items-center space-x-1 overflow-hidden sm:w-100pxr", {
        "cursor-not-default opacity-40": isDisabled,
        "cursor-not-pointer": !isDisabled,
      })}
    >
      <Icon aria-label={text} />
      <span className="mt-1 hidden text-xs sm:flex">{text}</span>
    </button>
  );
};

export default ButtonWithIcon;
