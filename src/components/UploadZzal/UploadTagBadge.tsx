import { useAtom } from "jotai";
import { XCircle } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { $selectedTagsUpload } from "@/store/tag";

interface Props {
  tagId: number;
  tagName: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const UploadTagBadge = ({ tagId, tagName, isClickable = false, className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTagsUpload);

  const handleMouseDownDeleteTag = (tagId: number, tagName: string) => () => {
    setSelectedTags(
      selectedTags.filter(
        (selectedTag) => selectedTag.tagId !== tagId || selectedTag.tagName !== tagName,
      ),
    );
  };

  return (
    <span
      className={cn(
        "flex w-fit items-center rounded-3xl bg-black p-1 text-[14px] font-bold text-white",
        className,
      )}
    >
      {tagName}
      {isClickable && (
        <XCircle
          onMouseDown={handleMouseDownDeleteTag(tagId, tagName)}
          aria-label="태그 삭제"
          className="ml-1 w-5 cursor-pointer"
        />
      )}
    </span>
  );
};

export default UploadTagBadge;
