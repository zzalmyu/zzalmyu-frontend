import { useAtom } from "jotai";
import { XCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";

interface Props {
  content: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const TagBadge = ({ content, isClickable = false, className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);

  const handleMouseDownDeleteTag = (tag: string) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  return (
    <span
      className={cn(
        "flex w-fit items-center rounded-3xl bg-badge p-1 text-[14px] font-bold text-text-tertiary",
        className,
      )}
    >
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
