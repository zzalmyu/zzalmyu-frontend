interface Props {
  headers: string[];
}

const ReportTableHead = ({ headers }: Props) => {
  return (
    <thead>
      <tr className="border-0 bg-card">
        {headers.map((header, index) => (
          <th key={index} className="text-center text-text-primary">
            {header}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default ReportTableHead;
