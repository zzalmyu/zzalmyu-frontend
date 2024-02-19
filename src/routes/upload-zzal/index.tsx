import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import UploadGuide from "@/components/UploadZzal/UploadGuide";
import ImageUpload from "@/components/UploadZzal/ImageUpload";

const UploadZzal = () => {
  const [, setFile] = useState<File | null>(null);
  const handleChangeUpload = (changedFile: File | null) => setFile(changedFile);

  return (
    <div className="flex flex-col items-center gap-20pxr px-50pxr pt-30pxr sm:px-100pxr">
      <div className="self-start text-2xl font-extrabold text-text-primary">짤 업로드</div>
      <UploadGuide />
      <div className="mt-20pxr flex w-full flex-col items-center justify-center gap-50pxr sm:flex-row sm:items-start">
        <ImageUpload onChange={handleChangeUpload} />
        <div className="flex h-300pxr flex-1 flex-col justify-between">
          <div className="w-full border-2 border-text-secondary">searchbar</div>
          <button
            className="h-40pxr w-100pxr self-center rounded-[100px] bg-primary font-bold text-white outline outline-2 outline-offset-2 outline-transparent hover:outline-yellow-500 sm:self-end"
            onClick={() => {}}
          >
            업로드
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/upload-zzal/")({
  component: UploadZzal,
});
