import { createFileRoute } from "@tanstack/react-router";

const UploadList = () => {
  return <div>업로드 한 짤 페이지</div>;
};

export const Route = createFileRoute("/My-Uploaded-Zzal/")({
  component: UploadList,
});
