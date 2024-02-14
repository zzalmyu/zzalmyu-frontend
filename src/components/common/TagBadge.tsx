import { useAtom } from "jotai";
import { cn } from "@/utils/tailwind";
import { $toggleTag } from "@/store/tag";

interface Props {
  content: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const TagBadge = ({ content, isClickable = false, className }: Props) => {
  const [selectedTag, toggleTag] = useAtom($toggleTag);
  const isSelectedTag = selectedTag.includes(content);

  const handleClickTag = () => {
    if (!isClickable) return;

    toggleTag(content);
  };

  const badgeClasses = cn("rounded-2xl px-4 py-2 text-white font-bold bg-tag", {
    "cursor-pointer": isClickable,
    "bg-gray-400": isClickable && !isSelectedTag,
    "bg-tag": isSelectedTag,
  });

  return (
    <span onClick={handleClickTag} className={cn(badgeClasses, className)}>
      {content}
    </span>
  );
};

export default TagBadge;
