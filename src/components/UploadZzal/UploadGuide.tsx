import { Info } from "lucide-react";

const UploadGuide = () => {
  return (
    <div className="flex min-h-70pxr w-full flex-col items-center justify-center gap-10pxr rounded-[16px] bg-card p-10pxr text-base font-bold text-text-primary sm:flex-row sm:gap-30pxr">
      <Info strokeWidth={2} aria-label="참고" />
      <span className="text-center">
        업로드를 위해 필수로 사진을 선택하고 1개 이상의 태그를 등록해주세요!
      </span>
    </div>
  );
};

export default UploadGuide;
