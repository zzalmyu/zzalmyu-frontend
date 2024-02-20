import { createFileRoute } from "@tanstack/react-router";

const MyLikedZzal = () => {
  return <div>좋아요 한 짤 페이지</div>;
};

export const Route = createFileRoute("/my-liked-zzal/")({
  component: MyLikedZzal,
});
