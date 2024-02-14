interface ReportedDetailButton {
  imageId: string;
}

const ReportedDetailButton = ({ imageId }: ReportedDetailButton) => {
  const handleClickOpen = () => {
    console.log(`${imageId}에 해당하는 모달을 띄워줘야 합니다.`);
  };

  return (
    <>
      <button
        className="btn btn-sm bg-neutral-700 text-xs text-neutral-200"
        onClick={handleClickOpen}
      >
        상세보기
      </button>
    </>
  );
};

export default ReportedDetailButton;
