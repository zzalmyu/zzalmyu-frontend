import ReportedDetailButton from "./ReportedDetailButton";

interface ReportedImageList {
  imageId: string;
  reportCount: number;
  createdAt: string;
}

const ReportedImageList = () => {
  const reportLists = [
    {
      id: "1",
      created_at: "2024-02-08 23:03:20",
      image_id: "image1",
      report_user_id: "heejin1@asdf.com",
    },
    {
      id: "2",
      created_at: "2024-02-07 10:01:00",
      image_id: "image1",
      report_user_id: "heejin1@asdf.com",
    },
    {
      id: "3",
      created_at: "2024-02-06 10:01:00",
      image_id: "image2",
      report_user_id: "heejin1@asdf.com",
    },
  ];

  const reportedImages: ReportedImageList[] = [];

  reportLists.forEach((reportedImage) => {
    const imageId = reportedImage.image_id;
    const createdAt = reportedImage.created_at;
    const existingItem = reportedImages.find(
      (reportedImageObj) => reportedImageObj.imageId === imageId,
    );
    existingItem
      ? (existingItem.reportCount += 1)
      : reportedImages.push({ imageId, reportCount: 1, createdAt });
  });

  return (
    <div>
      <div className="pb-5 text-lg font-bold">신고된 사진 리스트</div>
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
          {reportedImages.map((reportedImage, index) => {
            return (
              <tr key={index} className="border-b-1 border-card last:border-0">
                <td className="text-center text-text-primary">
                  {reportedImage.createdAt.slice(0, 10)}
                </td>
                <td className="text-center text-text-primary">{reportedImage.imageId}</td>
                <td className="text-center text-text-primary">{reportedImage.reportCount}</td>
                <td className="text-center text-text-primary">
                  <ReportedDetailButton imageId={reportedImage.imageId} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ReportedImageList;
