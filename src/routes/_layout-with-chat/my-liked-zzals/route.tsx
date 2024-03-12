import { Helmet } from "react-helmet-async";
import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return (
    <>
      <Helmet>
        <title>좋아요한 짤 - 짤뮤니티</title>
        <meta name="description" content="본인이 좋아요한 짤들을 확인 및 관리해보세요!" />
        <meta property="og:title" content="좋아요한 짤 - 짤뮤니티" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://www.zzalmyu.site/my-liked-zzals" />
        <meta property="og:description" content="본인이 좋아요한 짤들을 확인 및 관리해보세요!" />
      </Helmet>
      <div>pending my liked zzal</div>
    </>
  );
};

export const Route = createFileRoute("/_layout-with-chat/my-liked-zzals")({
  pendingComponent: PendingComponent,
});
