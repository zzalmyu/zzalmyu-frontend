"use client";

import { Trash2 } from "lucide-react";
import { useOverlay } from "@toss/use-overlay";
import { sendGAEvent } from "@next/third-parties/google";
import Link from "next/link";
import { QueryErrorBoundary } from "@suspensive/react-query";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import ReportTableHead from "@/components/common/admin/ReportTableHead";
import ReportDetailsTableBody from "@/components/AdminReportsDetail/ReportDetailsTableBody";
import useGetReportsDetails from "@/hooks/api/report/useGetReportDetails";
import useDeleteReportedZzal from "@/hooks/api/report/useDeleteReportedZzal";
import ErrorBoundaryFallback from "@/components/common/Fallback/ErrorBoundaryFallback";

interface Props {
  imageId: string;
}

const AdminImageDetail = ({ imageId }: Props) => {
  const { deleteReportedZzal } = useDeleteReportedZzal();
  const deleteConfirmOverlay = useOverlay();
  const { reportDetails } = useGetReportsDetails(imageId);
  const { imageUrl, imageTitle, reports } = reportDetails!;

  const handleClickAdminButton = () => {
    sendGAEvent("event", "page_view", { event_category: "관리자_페이지로_이동" });
  };

  const handleClickDeleteConfirm = (imageId: string) => () => {
    deleteReportedZzal(imageId);
    sendGAEvent("event", "admin_action", { event_category: "짤_영구_삭제" });
  };

  const handleClickDeleteButton = () => {
    sendGAEvent("event", "modal_open", { event_category: "짤_영구_삭제_확인_모달_띄우기" });
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
        <div className="breadcrumbs overflow-hidden pb-20pxr text-lg font-bold">
          <ul>
            <li>
              <Link href="/admin/reports" onClick={handleClickAdminButton}>
                <h1>신고 내역</h1>
              </Link>
            </li>
            <li>{imageTitle}</li>
          </ul>
        </div>
        <div className="flex justify-center">
          <div className="flex w-4/6 flex-col items-center sm:flex-row sm:items-start">
            <div className="w-1/2">
              <img src={imageUrl} alt={imageTitle} className="rounded-xl" />
            </div>
            <div className="mb-50pxr mt-3 flex max-h-420pxr flex-col  sm:ml-5 sm:mt-0 sm:w-4/6 ">
              <div className="w-full overflow-auto rounded-xl">
                <table className="table bg-card">
                  <ReportTableHead>
                    <ReportTableHead.Th>신고된 날짜</ReportTableHead.Th>
                    <ReportTableHead.Th>신고 사용자 이메일</ReportTableHead.Th>
                  </ReportTableHead>
                  <ReportDetailsTableBody reportsByUser={reports} />
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

const ErrorCaughtAdminImageDetail = ({ imageId }: Props) => {
  return (
    <QueryErrorBoundary fallback={ErrorBoundaryFallback}>
      <AdminImageDetail imageId={imageId} />
    </QueryErrorBoundary>
  );
};

export default ErrorCaughtAdminImageDetail;
