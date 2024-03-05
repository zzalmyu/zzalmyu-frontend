import { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon;
  label: string;
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
}

const ButtonWithIcon = ({ Icon, label, children, onClick, isDisabled = false }: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn("flex flex-col items-center space-x-1 overflow-hidden text-icon sm:w-100pxr", {
        "cursor-not-allowed opacity-40": isDisabled,
        "cursor-pointer": !isDisabled,
      })}
    >
      <Icon aria-label={label} />
      <span className="mt-1 hidden text-xs sm:flex">{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
