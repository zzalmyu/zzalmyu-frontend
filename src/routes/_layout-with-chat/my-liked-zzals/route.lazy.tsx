import { useEffect, useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import useGetTopTagsFromLiked from "@/hooks/api/tag/useGetTopTagsFromLiked";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import ZzalCard from "@/components/common/ZzalCard";
import MasonryLayout from "@/components/common/MasonryLayout";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import NoSearchResults from "@/components/common/NoSearchResults";


const MyLikedZzals = () => {
  const { zzals, handleFetchNextPage } = useGetMyLikedZzals();
  const { topTags } = useGetTopTagsFromLiked();
  const [selectedTags] = useAtom($selectedTags);
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
    <div className="flex h-full w-full flex-col items-center">
      {zzals.length === 0 && <NoSearchResults />}
      <MasonryLayout className="mt-15pxr w-full">
        {zzals.map(({ imageId, path, title, imageLikeYn }, index) => (
          <ZzalCard
            className="mb-10pxr"
            key={imageId}
            src={path}
            alt={title}
            imageId={imageId}
            isLiked={imageLikeYn}
            imageIndex={index}
            queryKey={["likedZzals", selectedTags]}
          />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-liked-zzals")({
  component: MyLikedZzals,
});
