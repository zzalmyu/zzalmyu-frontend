import { Trash2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import ZzalCard from "@/components/common/ZzalCard";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import ReportTableHead from "@/components/common/admin/ReportTableHead";
import ReportDetailsTableBody from "@/components/AdminReportsDetail/ReportDetailsTableBody";
import useGetReportsDetails from "@/hooks/api/report/useGetReportDetails";
import useDeleteReportedImage from "@/hooks/api/report/useDeleteReportedImage";
import Pending from "@/routes/admin/reports/AdminReports.pendingComponent";

const AdminImageDetail = () => {
  const { imageId } = Route.useParams();
  const { deleteReportedImage } = useDeleteReportedImage();
  const deleteConfirmOverlay = useOverlay();
  const { reportDetails } = useGetReportsDetails(imageId);
  const { imageUrl, imageTitle, reports } = reportDetails;

  const handleClickDeleteConfirm = (imageId: string) => () => {
    deleteReportedImage(imageId);
  };

  const handleClickDeleteButton = () => {
    deleteConfirmOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={close}
        onDelete={handleClickDeleteConfirm(imageId)}
      />
    ));
  };

  return (
    <div className="flex h-full w-full flex-col items-center p-45pxr">
      <div className="flex w-5/6 flex-col">
        <div className="breadcrumbs pb-20pxr text-lg font-bold">
          <ul>
            <li>
              <Link to="/admin/reports/">
                <h1>신고 내역</h1>
              </Link>
            </li>
            <li>{imageTitle}</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="flex w-4/6 flex-col items-center sm:flex-row sm:items-start">
            <ZzalCard src={imageUrl} alt={imageTitle} width="2/6" hasAnimation={false} />
            <div className="mb-50pxr mt-3 flex max-h-420pxr flex-col  sm:ml-5 sm:mt-0 sm:w-4/6 ">
              <div className="w-full overflow-auto rounded-xl">
                <table className="table bg-card">
                  <ReportTableHead>
                    <ReportTableHead.Th>신고된 날짜</ReportTableHead.Th>
                    <ReportTableHead.Th>신고 사용자 이메일</ReportTableHead.Th>
                  </ReportTableHead>
                  <ReportDetailsTableBody reportedAtByList={reports} />
                </table>
              </div>
              <button
                onClick={handleClickDeleteButton}
                className="btn mt-40pxr w-48 self-center rounded-full bg-delete hover:bg-delete hover:opacity-75 sm:mb-20pxr"
              >
                <Trash2 color="#FFFF" strokeWidth={2} aria-label="제거 아이콘" />
                <span className="text-white">제거하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin/reports/$imageId/")({
  component: AdminImageDetail,
  pendingComponent: Pending,
});
