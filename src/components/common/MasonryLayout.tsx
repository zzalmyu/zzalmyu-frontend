import { ReactNode } from "react";
import Masonry from "react-masonry-css";
import { cn } from "@/utils/tailwind";

interface Props {
  children: ReactNode;
  className?: string;
  columnClassName?: string;
  breakpointColumns?: { [key: string]: number };
}

const defaultBreakpoint = {
  default: 4,
  1220: 3,
  920: 2,
  620: 1,
};

const MasonryLayout = ({
  children,
  className,
  columnClassName,
  breakpointColumns = defaultBreakpoint,
}: Props) => {
  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={cn("mx-auto flex max-w-screen-xl", className)}
      columnClassName={cn("flex justify-center h-fit flex-wrap", columnClassName)}
    >
      {children}
    </Masonry>
  );
};

export default MasonryLayout;
