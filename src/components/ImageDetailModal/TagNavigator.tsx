import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/tailwind";
interface Props {
  tags: string[];
}

const MAX_TAG_PER_GROUP = 3;

const TagNavigator = ({ tags }: Props) => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const maxGroup = Math.ceil(tags.length / MAX_TAG_PER_GROUP);
  const startIndex = (currentGroup - 1) * MAX_TAG_PER_GROUP;
  const endIndex = startIndex + MAX_TAG_PER_GROUP;
  const currentGroupTags = tags.slice(startIndex, endIndex);

  const handleClickPrevious = () => setCurrentGroup((prevGroup) => prevGroup - 1);
  const handleClickNext = () => setCurrentGroup((prevGroup) => prevGroup + 1);

  return (
    <div className="relative">
      <div className="flex items-center justify-center sm:h-12">
        {currentGroup > 1 && (
          <ChevronLeft
            onClick={handleClickPrevious}
            className="absolute left-2 cursor-pointer"
            aria-label="이전으로 이동"
          />
        )}
        <div className="flex flex-wrap justify-center px-10">
          {currentGroupTags.map((tag, index) => (
            <span
              key={`${index}-${tag}`}
              className=" badge-base badge badge-md mx-2 my-1 cursor-pointer bg-primary font-medium text-white hover:brightness-75"
            >
              {tag}
            </span>
          ))}
        </div>
        {currentGroup < maxGroup && (
          <ChevronRight
            onClick={handleClickNext}
            className="absolute right-2 cursor-pointer"
            aria-label="다음으로 이동"
          />
        )}
      </div>
      {tags.length > MAX_TAG_PER_GROUP && (
        <div className="mt-2 flex justify-center">
          {Array.from({ length: maxGroup }, (_, index) => (
            <div
              key={`${index}-indicator`}
              className={cn("m-2", "h-2", "w-2", "rounded-full", "bg-neutral", "cursor-pointer", {
                "scale-150": currentGroup === index + 1,
              })}
              onClick={() => setCurrentGroup(index + 1)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TagNavigator;
