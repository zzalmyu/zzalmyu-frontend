import { ButtonHTMLAttributes } from "react";
import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon: LucideIcon;
  iconLabel: string;
  children: ReactNode;
  onClick: () => void;
  isDisabled?: boolean;
  isLoading?: boolean;
}

const ButtonWithIcon = ({
  Icon,
  iconLabel,
  children,
  onClick,
  isDisabled = false,
  isLoading = false,
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
      {!isLoading && <Icon aria-label={iconLabel} />}
      {isLoading && (
        <div className="h-6 w-6">
          <span className="loading loading-spinner loading-xs" />
        </div>
      )}
      <span className="mt-1 hidden text-xs sm:flex">{children}</span>
    </button>
  );
};

export default ButtonWithIcon;
