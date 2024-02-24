import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Pending from "./MyLikedZzal.pendingComponent";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import ZzalCard from "@/components/common/ZzalCard";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

const MyLikedZzal = () => {
  const fetchMoreRef = useRef(null);
  const { zzals, handleFetchNextPage } = useGetMyLikedZzals();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">좋아요 한 짤 페이지</h1>
      <div className="mx-auto sm:max-w-620pxr sm:columns-2 md:max-w-920pxr md:columns-3 lg:max-w-1220pxr lg:columns-4">
        {zzals.map(({ imageId, path, title }) => (
          <div key={imageId} className="mb-4 inline-block break-inside-avoid">
            <ZzalCard src={path} alt={title} />
          </div>
        ))}
        <div ref={fetchMoreRef} />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/my-liked-zzal/")({
  component: MyLikedZzal,
  pendingComponent: Pending,
});
