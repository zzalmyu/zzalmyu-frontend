import { useEffect, useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useSetAtom } from "jotai";
import useGetHomeZzlas from "@/hooks/api/zzal/useGetHomeZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import useGetTopTagsFromHome from "@/hooks/api/tag/useGetTopTagsFromHome";
import { $recommendedTags } from "@/store/tag";

const HomeZzals = () => {
  const { zzals, handleFetchNextPage } = useGetHomeZzlas();
  const { topTags } = useGetTopTagsFromHome();
  const setRecommendedTags = useSetAtom($recommendedTags);
  const fetchMoreRef = useRef(null);

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  useEffect(() => {
    setRecommendedTags(topTags);
  }, [topTags, setRecommendedTags]);

  return (
    <div className="flex w-full flex-col items-center">
      <MasonryLayout className="mt-15pxr w-full">
        {zzals.map(({ imageId, path, title, imageLikeYn }, index) => (
          <ZzalCard
            className="mb-10pxr"
            key={`${imageId}-${index}`}
            src={path}
            alt={title}
            imageId={imageId}
            isLiked={imageLikeYn}
            imageIndex={index}
            queryKey="likedZzals"
          />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/")({
  component: HomeZzals,
});