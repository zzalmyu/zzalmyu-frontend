import { cn } from "@/utils/tailwind";
import TagBadge from "./TagBadge";

interface Props {
  className?: string;
}

const RecommendTag = ({ className }: Props) => {
  // TODO: [2024.02.14] api 요청 예정
  const recommendTags = ["분노", "스트레스", "박명수", "직장인", "잠좀자자"];

  return (
    <div className={cn("mb-4", className)}>
      <div className="mb-4 text-sm font-bold">내가 가장 많이 사용한 태그</div>
      <ul className="ml-2 flex w-650pxr flex-wrap gap-2 after:block after:w-650pxr after:border-b after:border-black after:content-['']">
        {recommendTags.map((recommendTag, index) => (
          <li key={`${index}-${recommendTag}`} className="mb-2">
            <TagBadge content={recommendTag} isClickable />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendTag;
