import { createFileRoute } from "@tanstack/react-router";
import ReportTableHead from "@/components/common/admin/ReportTableHead";
import ReportsTableBody from "@/components/AdminReports/ReportsTableBody ";

const reports = [
  {
    imageId: 1,
    lastReportAt: "2024-02-21T05:24:26.139Z",
    reportCount: 3,
    tags: [
      {
        tagId: 1,
        tagName: "강아지",
      },
      {
        tagId: 2,
        tagName: "토끼",
      },
    ],
  },
  {
    imageId: 1,
    lastReportAt: "2024-02-21T05:24:26.139Z",
    reportCount: 3,
    tags: [
      {
        tagId: 1,
        tagName: "강아지",
      },
      {
        tagId: 2,
        tagName: "토끼",
      },
    ],
  },
  {
    imageId: 1,
    lastReportAt: "2024-02-21T05:24:26.139Z",
    reportCount: 3,
    tags: [
      {
        tagId: 1,
        tagName: "강아지",
      },
      {
        tagId: 2,
        tagName: "토끼",
      },
    ],
  },
];

const REPORT_HEADERS = ["Date", "이미지태그", "신고 횟수", "게시물 상세보기"];

const Admin = () => {
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
              <ReportTableHead headers={REPORT_HEADERS} />
              <ReportsTableBody reports={reports} />
            </table>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/admin/reports/")({
  component: Admin,
});
