import { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/tailwind";
import Spinner from "../common/Spinner";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon;
  iconLabel: string;
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const ButtonWithIcon = ({
  Icon,
  iconLabel,
  children,
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}: Props) => {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      className={cn("flex flex-col items-center space-x-1 overflow-hidden text-icon sm:w-100pxr", {
        "cursor-not-allowed opacity-40": isDisabled,
        "cursor-pointer": !isDisabled,
      })}
    >
      {!isLoading && <Icon aria-label={iconLabel} className={className} />}
      {isLoading && <Spinner />}
      <span className="mt-1 hidden text-xs sm:flex">{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
