import { createFileRoute } from "@tanstack/react-router";
import ReportedImageList from "@/components/Admin/ReportedImageList";

const Admin = () => {
  return (
    <div className="mw-450pxr flex h-full w-full flex-col p-40pxr">
      <div className="px-0 pb-5 text-lg font-bold sm:px-10">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>신고 내역</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-5">
        <div className="w-5/6">
          <ReportedImageList />
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin/")({
  component: Admin,
});
