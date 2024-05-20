import { cn } from "@/utils/tailwind";
import MasonryLayout from "@/components/common/MasonryLayout";

const MasonrySkeleton = () => {
  return (
    <MasonryLayout className="mt-15pxr w-full">
      {Array.from(Array(15)).map((_, index) => (
        <div
          key={`home-${index}`}
          className={cn(`skeleton mb-10pxr w-72`, index % 2 ? "h-56" : "h-72")}
        ></div>
      ))}
    </MasonryLayout>
  );
};

export default MasonrySkeleton;
