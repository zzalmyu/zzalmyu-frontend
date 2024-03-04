import { useRef } from "react";
import { createLazyFileRoute } from "@tanstack/react-router";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import ZzalCard from "@/components/common/ZzalCard";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";

const MyLikedZzals = () => {
  const fetchMoreRef = useRef(null);
  const { zzals, handleFetchNextPage } = useGetMyLikedZzals();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">좋아요 한 짤 페이지</h1>
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
