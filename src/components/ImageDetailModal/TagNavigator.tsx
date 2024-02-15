import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  tags: string[];
}

const TagNavigator = ({ tags }: Props) => {
  const MAX_TAG = 3;
  const [currentGroup, setCurrentGroup] = useState(1);
  const maxGroup = Math.ceil(tags.length / MAX_TAG);
  const startIndex = (currentGroup - 1) * MAX_TAG;
  const endIndex = startIndex + MAX_TAG;
  const currentGroupTags = tags.slice(startIndex, endIndex);

  const handleClickPrevious = () => setCurrentGroup((prevGroup) => prevGroup - 1);
  const handleClickNext = () => setCurrentGroup((prevGroup) => prevGroup + 1);

  const renderTagItems = () => (
    <div className="flex flex-wrap justify-center">
      {currentGroupTags.map((tag, index) => (
        <span
          key={index}
          className=" badge-base badge badge-md m-1  cursor-pointer bg-primary font-medium text-white hover:brightness-75"
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
          <ChevronLeft onClick={handleClickPrevious} className="absolute left-2 cursor-pointer" />
        )}
        {renderTagItems()}
        {currentGroup < maxGroup && (
          <ChevronRight onClick={handleClickNext} className="absolute right-2 cursor-pointer" />
        )}
      </div>
      {tags.length > MAX_TAG && renderIndicator}
    </div>
  );
};

export default TagNavigator;
