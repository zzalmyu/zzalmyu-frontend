import { useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";
import useGetMyUploadedZzals from "@/hooks/api/zzal/useGetMyUploadedZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";
import TagBadge from "@/components/common/TagBadge";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();
  const { zzals, handleFetchNextPage } = useGetMyUploadedZzals();
  const fetchMoreRef = useRef(null);

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10pxr min-w-650pxr pl-10pxr">
        <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
        {topTags.map(({ tagId, tagName }) => (
          <TagBadge key={tagId} content={tagName} isClickable className="mr-5pxr" />
        ))}
      </div>
      <TagSearchForm />
      <MasonryLayout className="mt-15pxr">
        {zzals.map(({ imageId, path, title }) => (
          <ZzalCard className="mb-10pxr" key={imageId} src={path} alt={title} />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  component: MyUploadedZzals,
});
