import { useState } from "react";
import { useAtom } from "jotai";
import { Bookmark, Search } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import { useGetTags } from "@/hooks/api/tag/useGetTags";

interface Props {
  keyword: string;
}

const TagAutoComplete = ({ keyword }: Props) => {
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [, setSelectedTags] = useAtom($selectedTags);
  const [recommendedTags] = useAtom($recommendedTags);

  const { autoCompletedTags } = useGetTags(keyword);

  const handleClickTagName = (tagName: string) => () => {
    setSelectedTags((previousSelectedTags) => [...previousSelectedTags, tagName]);
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  return (
    <div className="relative z-10 box-border w-full rounded-b-25pxr border border-t-0 border-gray-300 bg-white px-4 pb-4 pt-[40px] shadow-xl outline-none sm:rounded-b-30pxr">
      <ul onBlur={() => setCursorIndex(-1)} tabIndex={0}>
        <hr className="absolute left-0 top-25pxr w-full sm:top-30pxr" />
        {autoCompletedTags.map(({ tagId, tagName }, index) => (
          <li
            key={tagId}
            className={cn(
              "py-2",
              index === cursorIndex && "box-border rounded-md bg-gray-200 font-bold",
            )}
            onMouseOver={handleMouseOverTag(index)}
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
        {recommendedTags.map(({ tagId, tagName }) => (
          <li key={tagId} className={"px-2 py-2"} onMouseDown={handleClickTagName(tagName)}>
            <div className="flex items-center gap-2">
              <Bookmark size={16} color="#807F7F" />
              {tagName}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagAutoComplete;
