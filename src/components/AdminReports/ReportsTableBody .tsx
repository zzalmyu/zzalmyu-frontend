import { Link } from "@tanstack/react-router";
import { Report } from "@/types/report.dto";

interface Props {
  reports: Report[];
}

const ReportsTableBody = ({ reports }: Props) => {
  return (
    <tbody>
      {reports.map(({ imageId, lastReportAt, tags, reportCount }, index) => {
        const shortLastReportAt = lastReportAt.slice(0, 10);
        const tagNames = tags.map((tag) => tag.tagName).join(", ");
        return (
          <tr key={`${index}-${imageId}`} className="border-b-1 border-card last:border-0">
            <td className="text-center text-text-primary">{shortLastReportAt}</td>
            <td className="text-center text-text-primary">{tagNames}</td>
            <td className="text-center text-text-primary">{reportCount}</td>
            <td className="text-center text-text-primary">
              <Link to={`/admin/reports/${imageId}`}>
                <button className="btn btn-neutral btn-sm text-xs">상세보기</button>
              </Link>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ReportsTableBody;
