import { createFileRoute } from "@tanstack/react-router";

const Auth = () => {
  return <div>로그인 페이지</div>;
};

export const Route = createFileRoute("/Auth/")({
  component: Auth,
});
