import { useState } from "react";
import { toast } from "react-toastify";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import UploadGuide from "@/components/UploadZzal/UploadGuide";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
// import RecommendTag from "@/components/common/RecommendTag";
// import TagSearchForm from "@/components/common/TagSearchForm";
import usePostUploadZzal from "@/hooks/api/zzal/usePostUploadZzal";
// import useGetPopularTags from "@/hooks/api/tag/useGetPopularTags";
import { $selectedTags } from "@/store/tag";
import { $previewUrl } from "@/store/zzal";

const UploadZzal = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [, setPreviewUrl] = useAtom($previewUrl);

  // const { popularTags } = useGetPopularTags();
  // const popularTagsName = popularTags.map((popularTag) => popularTag.tagName);

  const { uploadZzal } = usePostUploadZzal();

  const handleChangeUpload = (changedFile: File | null) => {
    setFile(changedFile);
  };

  const handleClickUploadButton = () => {
    if (!file) {
      toast.error("사진을 등록해주세요!");
    } else if (!selectedTags.length) {
      toast.error("1개 이상의 태그를 등록해주세요!");
    } else {
      handleUploadZzal();
    }
  };

  const handleUploadZzal = () => {
    if (file) {
      uploadZzal(
        {
          file: file,
          // TODO: [2024.02.27] 선택한 태그의 Id를 전달하는 코드 구현 후, 실제 selectedTags Id 넘겨주기
          tagIdList: [2, 3, 4],
          title: file.name.substring(0, file.name.indexOf(".")),
        },
        {
          onSuccess: () => {
            toast.success(
              <div>
                <span>성공적으로 업로드가 되었습니다.</span>
                <Link to="/my-uploaded-zzal">
                  <button className="m-1 rounded bg-primary p-1 text-sm text-white">
                    업로드한 짤 페이지로 이동
                  </button>
                </Link>
              </div>,
            ),
              setFile(null),
              setPreviewUrl(null),
              setSelectedTags([]);
          },
          onError: () => {
            toast.error("사진 업로드에 실패했습니다.");
          },
        },
      );
    }
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
              {/* <RecommendTag
                title="전체 사용자들이 가장 많이 사용한 태그 TOP 5"
                recommendTags={popularTagsName}
              /> */}
              {/* <TagSearchForm /> */}
            </div>
          </div>
          <button
            className="h-40pxr w-100pxr self-center rounded-[100px] bg-primary font-bold text-white outline outline-2 outline-offset-2 outline-transparent hover:outline-yellow-500 sm:self-end"
            onClick={handleClickUploadButton}
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
