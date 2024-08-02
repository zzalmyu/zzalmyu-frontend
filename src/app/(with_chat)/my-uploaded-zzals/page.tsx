"use client";

import { useEffect, useRef } from "react";
import { useAtom, useSetAtom } from "jotai";
import { QueryErrorBoundary } from "@suspensive/react-query";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";
import useGetMyUploadedZzals from "@/hooks/api/zzal/useGetMyUploadedZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import NoSearchResults from "@/components/common/NoSearchResults";
import ErrorBoundaryFallback from "@/components/common/Fallback/ErrorBoundaryFallback";

const MyUploadedZzalsPage = () => {
  const { topTags } = useGetTopTagsFromUploaded();
  const { zzals, handleFetchNextPage } = useGetMyUploadedZzals();
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
            key={`${imageId}-${index}`}
            src={path}
            alt={title}
            imageId={imageId}
            imageIndex={index}
            isLiked={imageLikeYn}
            queryKey={["uploadedZzals", selectedTags]}
            hasDeleteButton={true}
          />
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

const ErrorCaughtMyUploadedZzalsPage = () => {
  const [selectedTags] = useAtom($selectedTags);

  return (
    <QueryErrorBoundary resetKeys={selectedTags} fallback={ErrorBoundaryFallback}>
      <MyUploadedZzalsPage />
    </QueryErrorBoundary>
  );
};

export default ErrorCaughtMyUploadedZzalsPage;
