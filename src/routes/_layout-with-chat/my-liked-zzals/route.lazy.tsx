import { useRef } from "react";
import { Helmet } from "react-helmet-async";
import { createLazyFileRoute } from "@tanstack/react-router";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import useGetTopTagsFromLiked from "@/hooks/api/tag/useGetTopTagsFromLiked";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import ZzalCard from "@/components/common/ZzalCard";
import MasonryLayout from "@/components/common/MasonryLayout";
import TagBadge from "@/components/common/TagBadge";

const MyLikedZzals = () => {
  const fetchMoreRef = useRef(null);
  const { topTags } = useGetTopTagsFromLiked();
  const { zzals, handleFetchNextPage } = useGetMyLikedZzals();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <>
      <Helmet>
        <title>짤뮤니티 | 좋아요한 짤</title>
        <meta name="description" content="본인이 좋아요한 짤들을 확인 및 관리해보세요!" />
        <meta property="og:title" content="짤뮤니티 | 좋아요한 짤" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://www.zzalmyu.site/my-liked-zzals" />
        <meta property="og:description" content="본인이 좋아요한 짤들을 확인 및 관리해보세요!" />
      </Helmet>
      <div className="flex w-full flex-col items-center">
        <div className="mb-10pxr min-w-650pxr pl-10pxr">
          <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
          {topTags.map(({ tagName }, index) => (
            <TagBadge
              key={`${index}-${tagName}`}
              content={tagName}
              isClickable
              className="mr-5pxr"
            />
          ))}
        </div>
        <MasonryLayout className="mt-15pxr w-full">
          {zzals.map(({ imageId, path, title }) => (
            <ZzalCard className="mb-10pxr" key={imageId} src={path} alt={title} />
          ))}
        </MasonryLayout>
        <div ref={fetchMoreRef} />
      </div>
    </>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-liked-zzals")({
  component: MyLikedZzals,
});
