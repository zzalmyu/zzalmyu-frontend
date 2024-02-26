import { ReportedAtBy } from "@/types/report";

interface Props {
  reportedAtByList: ReportedAtBy[];
}

const ReportDetailsTableBody = ({ reportedAtByList }: Props) => {
  return (
    <tbody>
      {reportedAtByList.map(({ reportDate, reportUserEmail }) => {
        const shortReportDate = reportDate.slice(0, 10);
        return (
          <tr key={reportUserEmail} className="border-b-2 border-neutral-300 last:border-0">
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
