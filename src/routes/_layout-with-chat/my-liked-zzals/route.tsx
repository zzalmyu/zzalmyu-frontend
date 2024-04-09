import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CommonHelmet from "@/helmets/CommonHelmet";

const PendingComponent = () => {
  return (
    <Fragment>
      <CommonHelmet
        pageTitle="좋아요한 짤 - 짤뮤니티"
        url="https://zzalmyu.site/my-liked-zzals"
        description="본인이 좋아요한 짤들을 확인 및 관리해보세요!"
      />
      <div>pending my liked zzal</div>
    </Fragment>
  );
};

export const Route = createFileRoute("/_layout-with-chat/my-liked-zzals")({
  pendingComponent: PendingComponent,
});
