import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return <div>여긴 메인(홈) 페이지</div>;
};

export const Route = createFileRoute("/")({
  component: Home,
});
