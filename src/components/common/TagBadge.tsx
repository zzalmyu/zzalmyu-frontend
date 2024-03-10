import { useAtom } from "jotai";
import { XCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";
import { MAX_SEARCH_TAG } from "@/constants/tag";

interface Props {
  content: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const TagBadge = ({ content, isClickable = false, className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const isSelectedTag = selectedTags.includes(content);

  const handleClickTag = () => {
    if (!isClickable) return;

    if (selectedTags.includes(content)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== content));
      return;
    }

    if (selectedTags.length < MAX_SEARCH_TAG) {
      setSelectedTags((previousState) => [...previousState, content]);
    }
  };

  const handleMouseDownDeleteTag = (tag: string) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const badgeClasses = cn(
    "flex flex-column w-fit rounded-3xl p-2 text-white font-bold bg-black text-[14pxr]",
    {
      "cursor-pointer": isClickable,
      "bg-gray-400": isClickable && !isSelectedTag,
      "bg-black": isSelectedTag,
    },
  );

  return (
    <span onClick={handleClickTag} className={cn(badgeClasses, className)}>
      {content}
      {isClickable && (
        <XCircle
          onMouseDown={handleMouseDownDeleteTag(content)}
          aria-label="태그 삭제"
          className="ml-1 w-5 cursor-pointer"
        />
      )}
    </span>
  );
};

export default TagBadge;
