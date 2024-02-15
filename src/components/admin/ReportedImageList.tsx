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
];

const ReportedImageList = () => {
  const handleClickDetailViewButton = (imageId: string) => () => {
    console.log(`${imageId}에 해당하는 모달을 띄워줘야 합니다.`);
  };

  return (
    <div>
      <div className="pb-5 text-lg font-bold">신고 내역</div>
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
          {reports.map(({ createdAt, imageId, reportCount }, index) => {
            const createdDate = createdAt.slice(0, 10);
            return (
              <tr key={`${index}-${imageId}`} className="border-b-1 border-card last:border-0">
                <td className="text-center text-text-primary">{createdDate}</td>
                <td className="text-center text-text-primary">{imageId}</td>
                <td className="text-center text-text-primary">{reportCount}</td>
                <td className="text-center text-text-primary">
                  <button
                    className="btn btn-neutral btn-sm text-xs"
                    onClick={handleClickDetailViewButton(imageId)}
                  >
                    상세보기
                  </button>
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
