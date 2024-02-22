import { ReportDetail } from "@/types/report";

interface Props {
  reportDetails: ReportDetail[];
}

const ReportDetailTableBody = ({ reportDetails }: Props) => {
  return (
    <tbody>
      {reportDetails.map(({ reportDate, reportUserEmail }, index) => {
        const shortReportDate = reportDate.slice(0, 10);
        return (
          <tr
            key={`${index}-${reportUserEmail}`}
            className="border-b-2 border-neutral-300 last:border-0"
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

export default ReportDetailTableBody;
