"use client";

import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { QueryErrorBoundary } from "@suspensive/react-query";
import * as Sentry from "@sentry/nextjs";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import useGetTopTagsFromLiked from "@/hooks/api/tag/useGetTopTagsFromLiked";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import ZzalCard from "@/components/common/ZzalCard";
import MasonryLayout from "@/components/common/MasonryLayout";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import NoSearchResults from "@/components/common/NoSearchResults";
import ErrorBoundaryFallback from "@/components/common/Fallback/ErrorBoundaryFallback";

const MyLikedZzalsPage = () => {
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
    <div className="flex w-full flex-col items-center">
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

const ErrorCaughtMyLikedZzalsPage = () => {
  const [selectedTags] = useAtom($selectedTags);

  return (
    <QueryErrorBoundary
      resetKeys={selectedTags}
      fallback={ErrorBoundaryFallback}
      onError={(error) => {
        Sentry.captureException(error);
      }}
    >
      <MyLikedZzalsPage />
    </QueryErrorBoundary>
  );
};

export default ErrorCaughtMyLikedZzalsPage;
