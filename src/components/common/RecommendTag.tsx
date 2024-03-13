import { cn } from "@/utils/tailwind";
import { Tag } from "@/types/tag";
import TagBadge from "./TagBadge";

interface Props {
  title?: string;
  recommendTags: Tag[];
  className?: string;
}

const RecommendTag = ({ title, recommendTags, className }: Props) => {
  // TODO: [2024.02.14] api 요청 예정

  return (
    <div className={cn("mb-4", className)}>
      <div className="mb-4 min-w-full text-sm font-bold">{title}</div>
      <ul className="ml-2 flex w-650pxr flex-wrap gap-2 after:block after:w-650pxr after:border-b after:border-black after:content-['']">
        {recommendTags.map(({ tagId, tagName }) => (
          <li key={`${tagId}`} className="mb-2">
            <TagBadge content={tagName} isClickable />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendTag;
