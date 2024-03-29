import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { Bookmark, Search } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Tag } from "@/types/tag";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import { MAX_SEARCH_TAG } from "@/constants/tag";
import TagSlider from "@/components/common/TagSlider";
import usePostUsedTag from "@/hooks/api/tag/usePostUsedTag";

interface Props {
  autoCompletedTags: Tag[];
  cursorIndex: number;
  setCursorIndex: Dispatch<SetStateAction<number>>;
  handleResetTagInput: () => void;
}

const TagAutoComplete = ({
  autoCompletedTags,
  cursorIndex,
  setCursorIndex,
  handleResetTagInput,
}: Props) => {
  const { increaseTagUsage } = usePostUsedTag();
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [recommendedTags] = useAtom($recommendedTags);

  const handleMouseDownTagName = (tagName: string) => () => {
    if (selectedTags.length < MAX_SEARCH_TAG && !selectedTags.includes(tagName)) {
      increaseTagUsage(tagName);
      setSelectedTags((previousState) => [...previousState, tagName]);
      handleResetTagInput();
    }
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  return (
    <div className="absolute z-10 box-border w-full overflow-hidden rounded-b-25pxr border border-t-0 border-gray-300 bg-background pt-40pxr shadow-md shadow-adaptive-shadow outline-none sm:rounded-b-30pxr">
      <hr className="absolute left-0 top-25pxr w-full sm:top-30pxr" />
      <div className="h-full max-h-400pxr overflow-auto px-4 pb-4">
        {selectedTags.length > 0 && (
          <div className="sticky top-0 mb-10pxr border-b-2 bg-background">
            <div className="mb-10pxr text-sm font-semibold text-text-primary">
              선택된 태그
              <span className="ml-5pxr">
                {selectedTags.length}/{MAX_SEARCH_TAG}
              </span>
            </div>
            <ul className="flex-column mb-10pxr flex flex-wrap gap-6pxr">
              <div className="w-full">
                <TagSlider tags={selectedTags} />
              </div>
            </ul>
          </div>
        )}
        <ul
          className={cn("pb-10pxr", autoCompletedTags.length > 0 && "mb-10pxr border-b-2")}
          tabIndex={0}
        >
          {autoCompletedTags.map(({ tagId, tagName }, index) => (
            <li
              onMouseDown={handleMouseDownTagName(tagName)}
              onMouseOver={handleMouseOverTag(index)}
              key={tagId}
              className={cn(
                "py-2",
                index === cursorIndex && "box-border rounded-md bg-gray-200 font-bold text-black",
              )}
            >
              <div className="flex items-center gap-2">
                <Search size={16} color="#807F7F" />
                {tagName}
              </div>
            </li>
          ))}
        </ul>

        {recommendedTags.length && (
          <div className="text-sm font-semibold text-neutral">추천 태그</div>
        )}

        <ul>
          {recommendedTags.map(({ tagId, tagName }, index) => {
            const recommendedIndex = index + autoCompletedTags.length;

            return (
              <li
                onMouseOver={handleMouseOverTag(recommendedIndex)}
                key={tagId}
                className={cn(
                  "px-2 py-2",
                  recommendedIndex === cursorIndex &&
                    "box-border rounded-md bg-gray-200 font-bold text-black",
                )}
                onMouseDown={handleMouseDownTagName(tagName)}
              >
                <div className="flex items-center gap-2">
                  <Bookmark size={16} />
                  {tagName}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default TagAutoComplete;
