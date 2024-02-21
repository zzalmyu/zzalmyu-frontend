import { Link } from "@tanstack/react-router";

const reports = [
  {
    id: "1",
    createdAt: "2024-02-08 23:03:20",
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
    reportUserId: "heejin1@asdf.com",
    reportCount: 3,
  },
  {
    id: "1",
    createdAt: "2024-02-08 23:03:20",
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
    reportUserId: "heejin1@asdf.com",
    reportCount: 3,
  },
  {
    id: "1",
    createdAt: "2024-02-08 23:03:20",
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
    reportUserId: "heejin1@asdf.com",
    reportCount: 3,
  },
];

const ReportedImageList = () => {
  const hasReports = reports?.length > 0;

  return (
    <div className="flex flex-col items-center">
      <table className="table">
        <thead>
          <tr className="border-0 bg-card">
            <th className="text-center text-text-primary">Date</th>
            <th className="text-center text-text-primary">이미지 태그</th>
            <th className="text-center text-text-primary">신고 횟수</th>
            <th className="text-center text-text-primary">게시물 상세보기</th>
          </tr>
        </thead>
        <tbody>
          {hasReports &&
            reports.map(({ createdAt, tags, reportCount }, index) => {
              const createdDate = createdAt.slice(0, 10);
              const tagNames = tags.map((tag) => tag.tagName).join(", ");
              return (
                <tr
                  key={`${index}-${createdDate}`}
                  className="border-b-1 border-card last:border-0"
                >
                  <td className="text-center text-text-primary">{createdDate}</td>
                  <td className="text-center text-text-primary">{tagNames}</td>
                  <td className="text-center text-text-primary">{reportCount}</td>
                  <td className="text-center text-text-primary">
                    <Link to="/admin/reports/id/">
                      <button className="btn btn-neutral btn-sm text-xs">상세보기</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          {!hasReports && (
            <tr>
              <td colSpan={4} className="text-center text-text-primary">
                신고된 이미지가 없습니다.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedImageList;
