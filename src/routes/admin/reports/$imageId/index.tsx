import { Trash2 } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import ZzalCard from "@/components/common/ZzalCard";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import ReportTableHead from "@/components/common/admin/ReportTableHead";
import ReportDetailsTableBody from "@/components/AdminReportsDetail/ReportDetailsTableBody";
import useGetReportsDetails from "@/hooks/api/report/UseGetReportDetails";

const AdminImageDetail = () => {
  const { imageId } = Route.useParams();
  const deleteConfirmOverlay = useOverlay();
  const { reportDetails, isLoading } = useGetReportsDetails(imageId);

  if (isLoading || !reportDetails) return <>로딩중...</>;

  const handleClickDeleteButton = () => {
    deleteConfirmOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal isOpen={isOpen} onClose={close} onDelete={() => {}} />
    ));
  };

  return (
    <div className="flex h-full w-full flex-col p-40pxr">
      <div className="px-0 pb-5 text-xl font-bold sm:px-10">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>
              <Link to="/admin/reports/">신고 내역</Link>
            </li>
            <li>{reportDetails[0].imageTitle}</li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex w-4/6 flex-col items-center sm:flex-row sm:items-start">
          <ZzalCard
            src={reportDetails[0].imageUrl}
            alt="신고 상세 이미지"
            width="2/6"
            hasAnimation={false}
          />
          <div className="mb-50pxr mt-3 flex max-h-420pxr justify-end overflow-auto rounded-xl sm:ml-5 sm:mt-0 sm:w-4/6 sm:rounded-xl">
            <table className="table bg-card">
              <ReportTableHead>
                <ReportTableHead.Th>신고된 날짜</ReportTableHead.Th>
                <ReportTableHead.Th>신고 사용자 이메일</ReportTableHead.Th>
              </ReportTableHead>
              <ReportDetailsTableBody reportDetails={reportDetails} />
            </table>
            <button
              onClick={handleClickDeleteButton}
              className="btn fixed bottom-5 mb-0 ml-12pxr w-48 rounded-full bg-delete hover:bg-delete hover:opacity-75 sm:mb-20pxr"
            >
              <Trash2 color="#FFFF" strokeWidth={2} aria-label="제거 아이콘" />
              <span className="text-white">제거하기</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin/reports/$imageId/")({
  component: AdminImageDetail,
});
