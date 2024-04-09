import { Fragment } from "react";
import { createFileRoute } from "@tanstack/react-router";
import CommonHelmet from "@/helmets/CommonHelmet";

const PendingComponent = () => {
  return (
    <Fragment>
      <CommonHelmet
        pageTitle="업로드한 짤 - 짤뮤니티"
        url="https://zzalmyu.site/my-uploaded-zzals"
        description="본인이 업로드한 짤들을 확인 및 관리해보세요!"
      />
      <div>pending</div>
    </Fragment>
  );
};

export const Route = createFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  pendingComponent: PendingComponent,
});
