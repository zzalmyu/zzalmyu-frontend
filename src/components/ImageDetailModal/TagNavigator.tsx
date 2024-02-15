import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  tags: string[];
}

const TagNavigator = ({ tags }: Props) => {
  const MAX_TAGS = 3;
  const [currentGroup, setCurrentGroup] = useState(1);
  const maxGroup = Math.ceil(tags.length / MAX_TAGS);
  const startIndex = (currentGroup - 1) * MAX_TAGS;
  const endIndex = startIndex + MAX_TAGS;
  const currentGroupTags = tags.slice(startIndex, endIndex);

  const handleClickPrevious = () => setCurrentGroup((prevGroup) => prevGroup - 1);
  const handleClickNext = () => setCurrentGroup((prevGroup) => prevGroup + 1);

  const renderTagItems = () => (
    <div className="flex flex-wrap justify-center">
      {currentGroupTags.map((tag, index) => (
        <span
          key={`${index}-${tag}`}
          className=" badge-base badge badge-md mx-2 my-1 cursor-pointer bg-primary font-medium text-white hover:brightness-75"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  const renderIndicator = (
    <div className="mt-2 flex justify-center">
      {Array.from({ length: maxGroup }, (_, index) => (
        <div
          key={index}
          className={`m-2 h-2 w-2 rounded-full bg-neutral ${currentGroup === index + 1 && "scale-150"}`}
        />
      ))}
    </div>
  );

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
        {renderTagItems()}
        {currentGroup < maxGroup && (
          <ChevronRight
            onClick={handleClickNext}
            className="absolute right-2 cursor-pointer"
            aria-label="다음으로 이동"
          />
        )}
      </div>
      {tags.length > MAX_TAGS && renderIndicator}
    </div>
  );
};

export default TagNavigator;
