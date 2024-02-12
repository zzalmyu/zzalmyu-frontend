import { createFileRoute } from "@tanstack/react-router";

const Admin = () => {
  return <div>관리자 페이지</div>;
};

export const Route = createFileRoute("/admin/")({
  component: Admin,
});
