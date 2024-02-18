import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import ReportedImageList from "@/components/Admin/ReportedImageList";

const Admin = () => {
  return (
    <div>
      <ReportedImageList />
      <Link to="/admin-image-detail/">
        <button>상세보기</button>
      </Link>
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Admin,
});
