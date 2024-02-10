import { createFileRoute } from "@tanstack/react-router";

const Upload = () => {
  return <div>짤 업로드 페이지</div>;
};

export const Route = createFileRoute("/Upload/")({
  component: Upload,
});
