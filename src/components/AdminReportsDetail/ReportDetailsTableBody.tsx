import { formatDate } from "@/utils/formatDate";
import { ReportByUser } from "@/types/report";

interface Props {
  reportsByUser: ReportByUser[];
}

const ReportDetailsTableBody = ({ reportsByUser }: Props) => {
  return (
    <tbody>
      {reportsByUser.map(({ reportDate, reportUserEmail }, index) => {
        const shortReportDate = formatDate(reportDate);
        return (
          <tr
            key={`${index}-${reportUserEmail}`}
            className="border-b-2 border-neutral-300 last:border-0 hover:bg-neutral-400"
          >
            <td className="text-center text-xs font-bold sm:text-center sm:font-bold">
              {shortReportDate}
            </td>
            <td className="text-center text-xs font-bold sm:text-center sm:font-bold">
              {reportUserEmail}
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ReportDetailsTableBody;
