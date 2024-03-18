import { Dispatch, SetStateAction } from "react";
import { useAtom } from "jotai";
import { Bookmark, Search } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { Tag } from "@/types/tag";
import UploadTagBadge from "./UploadTagBadge";
import { $recommendedTags, $selectedTagsUpload } from "@/store/tag";
import { MAX_SEARCH_TAG_UPLOAD } from "@/constants/tag";

interface Props {
  autoCompletedTags: Tag[];
  cursorIndex: number;
  setCursorIndex: Dispatch<SetStateAction<number>>;
}

const UploadTagAutoComplete = ({ autoCompletedTags, cursorIndex, setCursorIndex }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTagsUpload);
  const [recommendedTags] = useAtom($recommendedTags);

  const handleMouseDownTagName = (tagId: number, tagName: string) => () => {
    if (
      selectedTags.length < MAX_SEARCH_TAG_UPLOAD &&
      !selectedTags.find((tag) => tag.tagId === tagId && tag.tagName === tagName)
    ) {
      setSelectedTags((previousState) => [...previousState, { tagId, tagName }]);
    }
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  return (
    <div className="absolute top-[-5px] box-border w-full rounded-b-25pxr border border-t-0 border-gray-300 bg-white px-4 pb-4 pt-[40px] shadow-xl outline-none sm:rounded-b-30pxr">
      <hr className="absolute left-0 top-25pxr w-full sm:top-30pxr" />
      {selectedTags.length > 0 && (
        <div className="mb-10pxr border-b-2">
          <div className="text-10pxr mb-20pxr font-semibold text-neutral">
            선택된 태그
            <span className="ml-5pxr">
              {selectedTags.length}/{MAX_SEARCH_TAG_UPLOAD}
            </span>
          </div>
          <ul className="mb-10pxr flex flex-wrap gap-6pxr">
            {selectedTags.map(({ tagId, tagName }) => (
              <li key={`${tagId}`}>
                <UploadTagBadge tagId={tagId} tagName={tagName} isClickable />
              </li>
            ))}
          </ul>
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
              index === cursorIndex && "box-border rounded-md bg-gray-200 font-bold",
            )}
          >
            <div className="flex items-center gap-2">
              <Search size={16} color="#807F7F" />
              {tagName}
            </div>
          </li>
        ))}
      </ul>
      <div className="text-10pxr font-semibold text-neutral">추천 태그</div>
      <ul>
        {recommendedTags.map(({ tagId, tagName }, index) => {
          const recommendedIndex = index + autoCompletedTags.length;

          return (
            <li
              onMouseOver={handleMouseOverTag(recommendedIndex)}
              key={tagId}
              className={cn(
                "px-2 py-2",
                recommendedIndex === cursorIndex && "box-border rounded-md bg-gray-200 font-bold",
              )}
              onMouseDown={handleMouseDownTagName(tagId, tagName)}
            >
              <div className="flex items-center gap-2">
                <Bookmark size={16} color="#807F7F" />
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
