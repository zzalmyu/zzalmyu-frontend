import { createFileRoute } from "@tanstack/react-router";

const MyUploadedZzal = () => {
  return <div>업로드 한 짤 페이지</div>;
};

export const Route = createFileRoute("/_layout-with-chat/my-uploaded-zzal/")({
  component: MyUploadedZzal,
});
