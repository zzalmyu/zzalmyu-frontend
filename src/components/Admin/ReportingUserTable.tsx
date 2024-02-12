const ReportingUserTable = () => {
  const reportData = [
    { Date: "2024-02-08 23:03:20", UserEmail: "heejin1@asdf.com" },
    { Date: "2024-02-07 10:01:00", UserEmail: "heejin1@asdf.com" },
    { Date: "2024-02-06 10:01:00", UserEmail: "heejin2@asdf.com" },
  ];

  return (
    <table className="table bg-card">
      <thead>
        <tr>
          <th className="text-center text-copy-primary">신고된 날짜</th>
          <th className="text-center text-copy-primary">신고 사용자 이메일</th>
        </tr>
      </thead>
      <tbody>
        {reportData.map((item, index) => {
          return (
            <tr key={index} className="border-b-2 border-gray-300 last:border-0">
              <td className="text-center font-bold">{item.Date.slice(0, 10)}</td>
              <td className="text-center font-bold">{item.UserEmail}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReportingUserTable;
