import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const ReportTableHead = ({ children }: Props) => {
  return (
    <thead>
      <tr className="sticky top-0 bg-card">{children}</tr>
    </thead>
  );
};

const Th = ({ children }: Props) => {
  return <th className="text-center text-text-primary">{children}</th>;
};

ReportTableHead.Th = Th;

export default ReportTableHead;
