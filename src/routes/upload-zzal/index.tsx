import { createFileRoute } from "@tanstack/react-router";

const UploadZzal = () => {
  return <div>짤 업로드 페이지</div>;
};

export const Route = createFileRoute("/upload-zzal/")({
  component: UploadZzal,
});
