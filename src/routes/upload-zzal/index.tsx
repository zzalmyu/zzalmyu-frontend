import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import UploadGuide from "@/components/UploadZzal/UploadGuide";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import RecommendTag from "@/components/common/RecommendTag";
import usePostUploadZzal from "@/hooks/api/zzal/usePostUploadZzal";
import useGetPopularTags from "@/hooks/api/tag/useGetPopularTags";
import { $selectedTags } from "@/store/tag";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";

const UploadZzal = () => {
  const { popularTags } = useGetPopularTags();
  const { uploadZzal } = usePostUploadZzal();
  const [file, setFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);

  const changeFile = (file: File | null) => {
    setFile(file);
  };

  const handleClickUploadButton = () => {
    if (!file) {
      toast.error("사진을 등록해주세요!");
      return;
    }

    if (!imageTitle) {
      toast.error("제목을 입력해주세요!");
    }

    if (!selectedTags.length) {
      toast.error("1개 이상의 태그를 등록해주세요!");
      return;
    }

    handleUploadZzal(file);
  };

  const handleUploadZzal = (file: File) => {
    if (!file) {
      return;
    }

    uploadZzal(
      {
        file: file,
        // TODO: [2024.02.27] 선택한 태그의 Id를 전달하는 코드 구현 후, 실제 selectedTags Id 넘겨주기
        tagIdList: [2, 3, 4],
        title: imageTitle,
      },
      {
        onSuccess: () => {
          toast.success(
            <div>
              <span>성공적으로 업로드가 되었습니다.</span>
              <Link to="/my-uploaded-zzals">
                <button className="m-1 rounded bg-primary p-1 text-sm text-white">
                  업로드한 짤 페이지로 이동
                </button>
              </Link>
            </div>,
          ),
            changeFile(null),
            setSelectedTags([]);
        },
        onError: () => {
          toast.error("사진 업로드에 실패했습니다.");
        },
      },
    );
  };

  const handleChangeImageTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setImageTitle(event.target.value);
  };

  return (
    <div className="flex flex-col items-center gap-20pxr px-50pxr pt-30pxr sm:px-100pxr">
      <div className="self-start text-2xl font-extrabold text-text-primary">짤 업로드</div>{" "}
      <UploadGuide />
      <div className="mt-20pxr flex w-full flex-col items-center justify-center gap-50pxr sm:flex-row sm:items-start">
        <ImageUpload changeFile={changeFile} file={file} />
        <div className="flex h-300pxr w-full flex-1 flex-col justify-between">
          <div className="w-full">
            <div className="float-right">
              <span className="mb-4 text-sm font-bold">짤 제목</span>
              <div className="flex h-full w-full flex-wrap items-center gap-2 rounded-full border border-gray-300 pl-4 pr-2 shadow-xl sm:gap-4 sm:px-4">
                <input
                  id="imageTitleInput"
                  name="imageTitle"
                  onChange={handleChangeImageTitle}
                  className="z-20 min-h-12 flex-1 rounded-xl border-none bg-transparent outline-none"
                />
              </div>
              <RecommendTag
                title="전체 사용자들이 가장 많이 사용한 태그 TOP 5"
                recommendTags={popularTags}
              />
              <TagSearchForm />
            </div>
          </div>
          <button
            className="h-40pxr w-100pxr self-center rounded-[100px] bg-primary font-bold text-white outline outline-2 outline-offset-2 outline-transparent hover:outline-yellow-500 sm:self-end"
            onClick={handleClickUploadButton}
          >
            업로드하기
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/upload-zzal/")({
  component: UploadZzal,
});
