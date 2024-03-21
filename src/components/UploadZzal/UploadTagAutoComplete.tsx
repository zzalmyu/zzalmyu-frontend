import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { Bookmark, Search } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Tag } from "@/types/tag";
import TagSlider from "../common/TagSlider";
import { $recommendedTags, $selectedUploadTags } from "@/store/tag";
import { MAX_SEARCH_TAG_UPLOAD } from "@/constants/tag";

interface Props {
  autoCompletedTags: Tag[];
  cursorIndex: number;
  setCursorIndex: Dispatch<SetStateAction<number>>;
  handleResetTagInput: () => void;
}

const UploadTagAutoComplete = ({
  autoCompletedTags,
  cursorIndex,
  setCursorIndex,
  handleResetTagInput,
}: Props) => {
  const [selectedUploadTags, setSelectedUploadTags] = useAtom($selectedUploadTags);
  const [recommendedTags] = useAtom($recommendedTags);

  const handleMouseDownTagName = (tagId: number, tagName: string) => () => {
    if (
      selectedUploadTags.length < MAX_SEARCH_TAG_UPLOAD &&
      !selectedUploadTags.find((tag) => tag.tagId === tagId && tag.tagName === tagName)
    ) {
      setSelectedUploadTags((previousState) => [...previousState, { tagId, tagName }]);
      handleResetTagInput();
    }
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  return (
    <div className="absolute z-10 box-border w-full rounded-b-25pxr border border-t-0 border-gray-300 bg-background px-4 pb-4 pt-40pxr shadow-md outline-none sm:rounded-b-30pxr">
      <hr className="absolute left-0 top-25pxr w-full sm:top-30pxr" />
      {selectedUploadTags.length > 0 && (
        <div className="mb-10pxr border-b-2">
          <div className="mb-10pxr text-sm font-semibold text-text-primary">
            선택된 태그
            <span className="ml-5pxr">
              {selectedUploadTags.length}/{MAX_SEARCH_TAG_UPLOAD}
            </span>
          </div>
          <div className="mb-10pxr flex flex-wrap gap-6pxr">
            <TagSlider tags={selectedUploadTags.map(({ tagName }) => tagName)} />
          </div>
        </div>
      )}
      <ul
        className={cn("pb-10pxr", autoCompletedTags.length > 0 && "mb-10pxr border-b-2")}
        tabIndex={0}
      >
        {autoCompletedTags.map(({ tagId, tagName }, index) => (
          <li
            onMouseDown={handleMouseDownTagName(tagId, tagName)}
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
              onMouseDown={handleMouseDownTagName(tagId, tagName)}
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
  );
};

export default UploadTagAutoComplete;
