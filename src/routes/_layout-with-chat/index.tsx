import { createFileRoute } from "@tanstack/react-router";

const Home = () => {
  return <div></div>;
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
