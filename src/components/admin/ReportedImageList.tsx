const ReportedImageList = () => {
  const reportLists = [
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
      imageId: "image2",
      reportUserId: "heejin1@asdf.com",
      reportCount: 4,
    },
  ];

  const handleClickOpen = (imageId: string) => {
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
          {reportLists.map((reportedImage, index) => {
            return (
              <tr key={index} className="border-b-1 border-card last:border-0">
                <td className="text-center text-text-primary">
                  {reportedImage.createdAt.slice(0, 10)}
                </td>
                <td className="text-center text-text-primary">{reportedImage.imageId}</td>
                <td className="text-center text-text-primary">{reportedImage.reportCount}</td>
                <td className="text-center text-text-primary">
                  <button
                    className="btn btn-neutral btn-sm text-xs"
                    onClick={() => handleClickOpen(reportedImage.imageId)}
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
