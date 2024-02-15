import { createFileRoute } from "@tanstack/react-router";
import ReportedImageList from "@/components/admin/ReportedImageList";

const Admin = () => {
  return (
    <div>
      <ReportedImageList />
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Admin,
});
