import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import UploadGuide from "@/components/UploadZzal/UploadGuide";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import Toast from "@/components/common/Toast";
import RecommendTag from "@/components/common/RecommendTag";
import TagSearchForm from "@/components/common/TagSearchForm";
import { $selectedTags } from "@/store/tag";

const recommendTags = ["분노", "스트레스", "박명수", "직장인", "잠좀자자"];

const UploadZzal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags] = useAtom($selectedTags);

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("파일을 업로드해주세요");
  const [toastColor, setToastColor] = useState("primary");
  const [includeButton, setIncludeButton] = useState(false);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | undefined>();

  const handleChangeUpload = (changedFile: File | null) => {
    setFile(changedFile);
    setShowToast(false);
    clearTimeout(toastTimer);
  };

  const handleShowToast = () => {
    if (!file) {
      setToastMessage("사진을 등록해주세요!");
      setToastColor("delete");
      setIncludeButton(false);
    } else if (!selectedTags.length) {
      setToastMessage("1개 이상의 태그를 등록해주세요!");
      setToastColor("delete");
      setIncludeButton(false);
    } else {
      setToastMessage("성공적으로 업로드가 되었습니다.");
      setToastColor("primary");
      setIncludeButton(true);
    }

    setShowToast(true);

    const toastTimerId = setTimeout(() => {
      setShowToast(false);
    }, 5000);
    setToastTimer(toastTimerId);
  };

  return (
    <div className="flex flex-col items-center gap-20pxr px-50pxr pt-30pxr sm:px-100pxr">
      <div className="self-start text-2xl font-extrabold text-text-primary">짤 업로드</div>
      <UploadGuide />
      <div className="mt-20pxr flex w-full flex-col items-center justify-center gap-50pxr sm:flex-row sm:items-start">
        <ImageUpload onChange={handleChangeUpload} />
        <div className="flex h-300pxr w-full flex-1 flex-col justify-between">
          <div className="w-full">
            <div className="float-right">
              <RecommendTag
                title="전체 사용자들이 가장 많이 사용한 태그 TOP 8"
                recommendTags={recommendTags}
              />
              <TagSearchForm />
            </div>
          </div>
          <button
            className="h-40pxr w-100pxr self-center rounded-[100px] bg-primary font-bold text-white outline outline-2 outline-offset-2 outline-transparent hover:outline-yellow-500 sm:self-end"
            onClick={handleShowToast}
          >
            업로드
          </button>
        </div>
      </div>
      {showToast && (
        <Toast
          toastColor={toastColor}
          toastMessage={toastMessage}
          includeButton={includeButton}
          buttonMessage="업로드한 짤 페이지로 이동"
          buttonRedirectPath="/my-uploaded-zzal/"
        />
      )}
    </div>
  );
};

export const Route = createFileRoute("/upload-zzal/")({
  component: UploadZzal,
});
