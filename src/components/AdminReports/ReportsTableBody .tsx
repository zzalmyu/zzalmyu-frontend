import { Link } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatDate";
import { Report } from "@/types/report";

interface Props {
  reports: Report[];
}

const ReportsTableBody = ({ reports }: Props) => {
  const handleClickReportDetail = () => {
    gtag("event", "page_view", { event_category: "신고_상세보기_페이지로_이동" });
  };

  return (
    <tbody>
      {reports.map(({ imageId, imageTitle, lastReportAt, reportCount }) => {
        return (
          <tr key={imageId} className="border-b-1 border-card last:border-0">
            <td className="text-center text-text-primary">{formatDate(lastReportAt)}</td>
            <td className="text-center text-text-primary">{imageTitle}</td>
            <td className="text-center text-text-primary">{reportCount}</td>
            <td className="text-center text-text-primary">
              <Link to="/admin/reports/$imageId" params={{ imageId: String(imageId) }}>
                <button
                  className="btn btn-neutral btn-sm text-xs"
                  onClick={handleClickReportDetail}
                >
                  상세보기
                </button>
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ReportsTableBody;
