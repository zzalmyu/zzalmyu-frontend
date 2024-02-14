import { useAtom } from "jotai";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";

interface Props {
  content: string;
  isClickable?: boolean;
  onClick?: () => void;
  className?: string;
}

const MAX_TAG = 5;

const TagBadge = ({ content, isClickable = false, className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const isSelectedTag = selectedTags.includes(content);

  const handleClickTag = () => {
    if (!isClickable) return;

    if (selectedTags.includes(content)) {
      setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== content));
      return;
    }

    if (selectedTags.length < MAX_TAG) {
      setSelectedTags((previousState) => [...previousState, content]);
    }
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
