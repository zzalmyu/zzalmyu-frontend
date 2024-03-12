import { Helmet } from "react-helmet-async";
import { createLazyFileRoute } from "@tanstack/react-router";
import TagBadge from "@/components/common/TagBadge";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();

  return (
    <>
      <Helmet>
        <title>짤뮤니티 | 업로드한 짤</title>
        <meta name="description" content="본인이 업로드한 짤들을 확인 및 관리해보세요!" />
        <meta property="og:title" content="짤뮤니티 | 업로드한 짤" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://www.zzalmyu.site/my-uploaded-zzals" />
        <meta property="og:description" content="본인이 업로드한 짤들을 확인 및 관리해보세요!" />
      </Helmet>
      <div className="flex w-full flex-col items-center">
        <div className="mb-10pxr min-w-650pxr pl-10pxr">
          <div className="mb-8pxr font-semibold">내가 가장 많이 사용한 태그</div>
          {topTags.map(({ tagId, tagName }) => (
            <TagBadge key={tagId} content={tagName} isClickable className="mr-5pxr" />
          ))}
        </div>
      </div>
    </>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  component: MyUploadedZzals,
});
