"use client";

import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { QueryErrorBoundary } from "@suspensive/react-query";
import useGetHomeZzals from "@/hooks/api/zzal/useGetHomeZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import useGetTopTagsFromHome from "@/hooks/api/tag/useGetTopTagsFromHome";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import ErrorBoundaryFallback from "@/components/common/Fallback/ErrorBoundaryFallback";

const ExplorePage = () => {
  const { zzals, handleFetchNextPage } = useGetHomeZzals();
  const { topTags } = useGetTopTagsFromHome();
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
            queryKey={["homeZzals", selectedTags]}
          />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

const ErrorCaughtExplorePage = () => {
  const [selectedTags] = useAtom($selectedTags);

  return (
    <QueryErrorBoundary resetKeys={[selectedTags]} fallback={ErrorBoundaryFallback}>
      <ExplorePage />
    </QueryErrorBoundary>
  );
};

export default ErrorCaughtExplorePage;
