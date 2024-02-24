import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import Pending from "./AdminReports.pendingComponent";
import ReportTableHead from "@/components/common/admin/ReportTableHead";
import ReportsTableBody from "@/components/AdminReports/ReportsTableBody ";
import useGetReports from "@/hooks/api/report/useGetReports";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";

const Admin = () => {
  const fetchMoreRef = useRef(null);
  const { reports, handleFetchNextPage } = useGetReports();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  return (
    <div className="flex h-full w-full flex-col p-40pxr">
      <div className="px-0 pb-5 text-lg font-bold sm:px-10">
        <div className="breadcrumbs text-lg">
          <ul>
            <li>신고 내역</li>
          </ul>
        </div>
      </div>
      <div className="flex w-full flex-col items-center px-5">
        <div className="w-5/6">
          <div className="flex flex-col items-center">
            <table className="table">
              <ReportTableHead>
                <ReportTableHead.Th>Date</ReportTableHead.Th>
                <ReportTableHead.Th>이미지태그</ReportTableHead.Th>
                <ReportTableHead.Th>신고 횟수</ReportTableHead.Th>
                <ReportTableHead.Th>게시물 상세보기</ReportTableHead.Th>
              </ReportTableHead>
              <ReportsTableBody reports={reports} />
            </table>
            <div ref={fetchMoreRef} />
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin/reports/")({
  component: Admin,
  pendingComponent: Pending,
});
