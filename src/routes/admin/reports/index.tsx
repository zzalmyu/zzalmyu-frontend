import { useRef } from "react";
import { Helmet } from "react-helmet-async";
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
    <>
      <Helmet>
        <title>짤뮤니티 | 관리자</title>
      </Helmet>
      <div className="flex h-full w-full flex-col items-center p-45pxr">
        <div className="flex w-5/6 flex-col">
          <div className="breadcrumbs pb-20pxr text-lg font-bold">
            <ul>
              <li>
                <h1>신고 내역</h1>
              </li>
            </ul>
          </div>
          <div className="flex flex-col ">
            <table className="table">
              <ReportTableHead>
                <ReportTableHead.Th>Date</ReportTableHead.Th>
                <ReportTableHead.Th>이미지 제목</ReportTableHead.Th>
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
    </>
  );
};

export const Route = createFileRoute("/admin/reports/")({
  component: Admin,
  pendingComponent: Pending,
});
