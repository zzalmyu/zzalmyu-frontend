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
        "flex-column text-14px flex w-fit rounded-3xl bg-black p-2 font-bold text-white",
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
