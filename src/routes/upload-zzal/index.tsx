import { ChangeEvent, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtom } from "jotai";
import UploadGuide from "@/components/UploadZzal/UploadGuide";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import RecommendTag from "@/components/common/RecommendTag";
import TagSearchForm from "@/components/common/SearchTag/TagSearchForm";
import usePostUploadZzal from "@/hooks/api/zzal/usePostUploadZzal";
import useGetPopularTags from "@/hooks/api/tag/useGetPopularTags";
import { $selectedTags } from "@/store/tag";

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
      return;
    }

    if (!selectedTags.length) {
      toast.error("1개 이상의 태그를 등록해주세요!");
      return;
    }

    handleUploadZzal(file);
  };

  const handleUploadZzal = (file: File) => {
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
                <button className="m-1 rounded bg-primary p-1 text-sm text-white">확인하기</button>
              </Link>
            </div>,
          ),
            changeFile(null),
            setImageTitle(""),
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
    <>
      <Helmet>
        <title>짤 업로드 - 짤뮤니티</title>
        <meta name="description" content="새로운 짤을 짤뮤니티에 업로드해보세요!" />
      </Helmet>
      <div className="flex flex-col items-center gap-20pxr px-50pxr pt-30pxr sm:px-100pxr">
        <div className="self-start text-2xl font-extrabold text-text-primary">짤 업로드</div>
        <UploadGuide />
        <div className="mt-20pxr flex w-full flex-col sm:flex-row sm:items-start">
          <div className="mx-auto flex w-320pxr flex-col">
            <ImageUpload changeFile={changeFile} file={file} />
          </div>
          <div className="mx-auto flex h-400pxr w-320pxr flex-1 flex-col pl-0 sm:w-450pxr sm:pl-10">
            <span className="mb-4 pt-10 text-sm font-bold sm:pt-0">짤 제목</span>
            <div className="mb-10 flex max-w-650pxr flex-wrap rounded-full border border-gray-300 py-1 pl-4 pr-2 shadow-xl">
              <input
                id="imageTitleInput"
                name="imageTitle"
                onChange={handleChangeImageTitle}
                value={imageTitle}
                className="z-20 min-h-12 flex-1 rounded-xl border-none bg-transparent outline-none"
              />
            </div>
            <RecommendTag
              title="전체 사용자들이 가장 많이 사용한 태그 TOP 5"
              recommendTags={popularTags}
            />
            <TagSearchForm />
            <button
              className="mt-10 h-60pxr w-full rounded-full bg-gradient-to-r from-primary to-[#78C6FF] text-lg font-bold text-white sm:max-w-650pxr"
              onClick={handleClickUploadButton}
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
