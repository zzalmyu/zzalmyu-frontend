import { Helmet } from "react-helmet-async";
import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return (
    <>
      <Helmet>
        <title>업로드한 짤 - 짤뮤니티</title>
        <meta name="description" content="본인이 업로드한 짤들을 확인 및 관리해보세요!" />
        <meta property="og:title" content="업로드한 짤 - 짤뮤니티" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://www.zzalmyu.site/my-uploaded-zzals" />
        <meta property="og:description" content="본인이 업로드한 짤들을 확인 및 관리해보세요!" />
      </Helmet>
      <div>pending</div>
    </>
  );
};

export const Route = createFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  pendingComponent: PendingComponent,
});
