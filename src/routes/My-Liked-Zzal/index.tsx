import { createFileRoute } from "@tanstack/react-router";

const LikeList = () => {
  return <div>좋아요 한 짤 페이지</div>;
};

export const Route = createFileRoute("/My-Liked-Zzal/")({
  component: LikeList,
});
