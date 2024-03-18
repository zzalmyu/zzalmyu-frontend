import { Helmet } from "react-helmet-async";
import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return (
    <Fragment>
      <Helmet>
        <title>좋아요한 짤 - 짤뮤니티</title>
        <meta name="description" content="본인이 좋아요한 짤들을 확인 및 관리해보세요!" />
      </Helmet>
      <div>pending my liked zzal</div>
    </Fragment>
  );
};

export const Route = createFileRoute("/_layout-with-chat/my-liked-zzals")({
  pendingComponent: PendingComponent,
});
