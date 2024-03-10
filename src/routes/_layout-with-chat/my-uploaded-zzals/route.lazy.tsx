import { createLazyFileRoute } from "@tanstack/react-router";
import TagBadge from "@/components/common/TagBadge";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10pxr min-w-650pxr pl-10pxr">
        <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
        {topTags.map(({ tagId, tagName }) => (
          <TagBadge key={tagId} content={tagName} isClickable className="mr-5pxr" />
        ))}
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  component: MyUploadedZzals,
});
