import { useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import useGetTopTagsFromLiked from "@/hooks/api/tag/useGetTopTagsFromLiked";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import ZzalCard from "@/components/common/ZzalCard";
import MasonryLayout from "@/components/common/MasonryLayout";
import TagBadge from "@/components/common/TagBadge";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";

const MyLikedZzals = () => {
  const fetchMoreRef = useRef(null);
  const { topTags } = useGetTopTagsFromLiked();
  const { zzals, handleFetchNextPage } = useGetMyLikedZzals();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-10pxr min-w-650pxr pl-10pxr">
        <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
        {topTags.map(({ tagName }) => (
          <TagBadge content={tagName} isClickable className="mr-5pxr" />
        ))}
      </div>
      <TagSearchForm />
      <MasonryLayout>
        {zzals.map(({ imageId, path, title }) => (
          <ZzalCard className="mb-10pxr" key={imageId} src={path} alt={title} />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-liked-zzals")({
  component: MyLikedZzals,
});
