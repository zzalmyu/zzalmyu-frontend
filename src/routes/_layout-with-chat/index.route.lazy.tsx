import { useEffect, useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { ErrorBoundary } from "@suspensive/react";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import useGetHomeZzals from "@/hooks/api/zzal/useGetHomeZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import useGetTopTagsFromHome from "@/hooks/api/tag/useGetTopTagsFromHome";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import ErrorBoundaryFallback from "@/components/common/Fallback/ErrorBoundaryFallback";

const HomeZzals = () => {
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

const ErrorCaughtHomeZzals = () => {
  const [selectedTags] = useAtom($selectedTags);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary resetKeys={[selectedTags]} onReset={reset} fallback={ErrorBoundaryFallback}>
          <HomeZzals />
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/")({
  component: ErrorCaughtHomeZzals,
});
