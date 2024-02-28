import { Link } from "@tanstack/react-router";
import { formatDate } from "@/utils/formatDate";
import { Report } from "@/types/report";

interface Props {
  reports: Report[];
}

const ReportsTableBody = ({ reports }: Props) => {
  return (
    <tbody>
      {reports
        .filter(({ tags }) => tags.length > 0)
        .map(({ imageId, lastReportAt, tags, reportCount }) => {
          const shortLastReportAt = formatDate(lastReportAt);
          const tagNames = tags.map((tag) => tag.tagName).join(", ");
          return (
            <tr key={imageId} className="border-b-1 border-card last:border-0">
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
