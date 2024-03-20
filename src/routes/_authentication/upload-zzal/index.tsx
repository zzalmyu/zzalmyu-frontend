import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { Asterisk } from "lucide-react";
import usePostUploadZzal from "@/hooks/api/zzal/usePostUploadZzal";
import useGetPopularTags from "@/hooks/api/tag/useGetPopularTags";
import { $recommendedTags, $selectedUploadTags } from "@/store/tag";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import UploadTagSearchForm from "@/components/UploadZzal/UploadTagSearchForm";

const UploadZzal = () => {
  const { popularTags } = useGetPopularTags();
  const { uploadZzal } = usePostUploadZzal();
  const [file, setFile] = useState<File | null>(null);
  const [imageTitle, setImageTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useAtom($selectedUploadTags);
  const setRecommendedTags = useSetAtom($recommendedTags);

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
        tagIdList: selectedTags.map((selectedTag) => selectedTag.tagId),
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

  useEffect(() => {
    setRecommendedTags(popularTags);
  }, [popularTags, setRecommendedTags]);

  return (
    <Fragment>
      <Helmet>
        <title>짤 업로드 - 짤뮤니티</title>
        <meta name="description" content="새로운 짤을 짤뮤니티에 업로드해보세요!" />
      </Helmet>
      <div className="flex flex-col justify-center gap-20pxr px-50pxr pt-30pxr sm:px-100pxr">
        <div className="mb-10 text-2xl font-extrabold text-text-primary">짤 업로드</div>
        <div className="m-auto flex w-full flex-col flex-wrap sm:mt-30pxr sm:flex-row">
          <div className="mx-auto pb-50pxr">
            <div className="mb-4 text-sm font-bold">
              업로드할 파일
              <Asterisk
                aria-label="필수 입력 항목 표시"
                className="inline-block"
                color="#ED0000"
                size={16}
              />
            </div>
            <ImageUpload changeFile={changeFile} file={file} />
          </div>
          <div className="mx-auto mt-10 flex min-w-400pxr flex-col sm:mt-0 sm:w-640pxr sm:px-10pxr">
            <div>
              <div className="mb-4 text-sm font-bold">
                짤 제목
                <Asterisk
                  aria-label="필수 입력 항목 표시"
                  className="inline-block"
                  color="#ED0000"
                  size={16}
                />
              </div>
              <div className="mb-10 flex max-w-650pxr flex-wrap rounded-full border border-gray-300 py-1 pl-4 pr-2 shadow-xl">
                <input
                  id="imageTitleInput"
                  name="imageTitle"
                  onChange={handleChangeImageTitle}
                  value={imageTitle}
                  className="z-20 min-h-12 flex-1 rounded-xl border-none bg-transparent outline-none"
                />
              </div>
            </div>
            <div>
              <div className="mb-4 text-sm font-bold">
                태그 검색 및 추가
                <Asterisk
                  aria-label="필수 입력 항목 표시"
                  className="inline-block"
                  color="#ED0000"
                  size={16}
                />
              </div>
              <UploadTagSearchForm />
            </div>
            <div className="pb-60pxr pt-120pxr sm:pt-30pxr">
              <button
                className="mt-20pxr h-60pxr w-full rounded-full bg-gradient-to-r from-primary to-[#78C6FF] text-lg font-bold text-white sm:mt-100pxr sm:max-w-650pxr"
                onClick={handleClickUploadButton}
              >
                업로드하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export const Route = createFileRoute("/_authentication/upload-zzal/")({
  component: UploadZzal,
});
