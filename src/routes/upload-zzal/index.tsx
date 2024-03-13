import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { createFileRoute } from "@tanstack/react-router";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";

const UploadZzal = () => {
  const [, setFile] = useState<File | null>(null);
  const handleChangeUpload = (changedFile: File | null) => setFile(changedFile);

  return (
    <>
      <Helmet>
        <title>짤 업로드 - 짤뮤니티</title>
        <meta name="description" content="새로운 짤을 짤뮤니티에 업로드해보세요!" />
      </Helmet>
      <div className="flex h-full flex-col items-center gap-20pxr px-50pxr sm:px-100pxr">
        <div className="mt-20pxr flex w-full flex-col items-center justify-center gap-50pxr sm:flex-row sm:items-start sm:gap-200pxr">
          <ImageUpload onChange={handleChangeUpload} />
          <div className="flex h-400pxr w-full min-w-400pxr max-w-500pxr flex-1 flex-col items-center justify-between">
            <TagSearchForm className="" />
            <button
              className="h-60pxr w-full rounded-full bg-gradient-to-r from-primary to-[#78C6FF] text-lg font-bold text-white"
              onClick={() => {}}
            >
              업로드하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export const Route = createFileRoute("/upload-zzal/")({
  component: UploadZzal,
});
