import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

const reports = [
  {
    id: "1",
    createdAt: "2024-02-08 23:03:20",
    imageId: "image1",
    reportUserId: "heejin1@asdf.com",
    reportCount: 3,
  },
  {
    id: "2",
    createdAt: "2024-02-08 23:03:20",
    imageId: "image2",
    reportUserId: "heejin1@asdf.com",
    reportCount: 3,
  },
  {
    id: "3",
    createdAt: "2024-02-08 23:03:20",
    imageId: "image3",
    reportUserId: "heejin1@asdf.com",
    reportCount: 4,
  },
  {
    id: "4",
    createdAt: "2024-02-08 23:03:20",
    imageId: "image4",
    reportUserId: "heejin1@asdf.com",
    reportCount: 100,
  },
  {
    id: "5",
    createdAt: "2024-02-08 23:03:20",
    imageId: "image5",
    reportUserId: "heejin1@asdf.com",
    reportCount: 12,
  },
];

const ReportedImageList = () => {
  const [showAllReports, setShowAllReports] = useState(false);
  const toggleShowAllReports = () => {
    setShowAllReports((prevShowAllReports: boolean) => !prevShowAllReports);
  };

  return (
    <div className="flex flex-col items-center">
      <table className="table">
        <thead>
          <tr className="border-0 bg-card">
            <th className="text-center text-text-primary">Date</th>
            <th className="text-center text-text-primary">게시물 ID</th>
            <th className="text-center text-text-primary">신고 횟수</th>
            <th className="text-center text-text-primary">게시물 상세보기</th>
          </tr>
        </thead>
        <tbody>
          {reports
            .slice(0, showAllReports ? reports.length : 3)
            .map(({ createdAt, imageId, reportCount }, index) => {
              const createdDate = createdAt.slice(0, 10);
              return (
                <tr key={`${index}-${imageId}`} className="border-b-1 border-card last:border-0">
                  <td className="text-center text-text-primary">{createdDate}</td>
                  <td className="text-center text-text-primary">{imageId}</td>
                  <td className="text-center text-text-primary">{reportCount}</td>
                  <td className="text-center text-text-primary">
                    <Link to="/admin-image-detail/">
                      <button className="btn btn-neutral btn-sm text-xs">상세보기</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      {showAllReports ? (
        <ArrowUpCircle
          size={35}
          strokeWidth={1.5}
          className="m-12 cursor-pointer"
          onClick={toggleShowAllReports}
          aria-label="리스트 더보기"
        />
      ) : (
        <ArrowDownCircle
          size={35}
          strokeWidth={1.5}
          className="m-12 cursor-pointer"
          onClick={toggleShowAllReports}
          aria-label="리스트 축소하기"
        />
      )}
    </div>
  );
};

export default ReportedImageList;
