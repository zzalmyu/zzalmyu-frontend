import { createLazyFileRoute } from "@tanstack/react-router";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";
import TagBadge from "@/components/common/TagBadge";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10pxr min-w-650pxr pl-10pxr">
        <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
        {topTags.map(({ tagName }) => (
          <TagBadge content={tagName} isClickable className="mr-5pxr" />
        ))}
      </div>
      <TagSearchForm />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  component: MyUploadedZzals,
});
