import { ChangeEvent, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { useAtom, useSetAtom } from "jotai";
import { Asterisk } from "lucide-react";
import { convertFileToJpg } from "@/utils/convertFileToJpg";
import ImageUpload from "@/components/UploadZzal/ImageUpload";
import UploadTagSearchForm from "@/components/UploadZzal/UploadTagSearchForm";
import usePostUploadZzal from "@/hooks/api/zzal/usePostUploadZzal";
import useGetPopularTags from "@/hooks/api/tag/useGetPopularTags";
import { $recommendedTags, $selectedUploadTags } from "@/store/tag";

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

  const handleFileFormat = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".jpg")) {
      try {
        return await convertFileToJpg(file);
      } catch (error) {
        return null;
      }
    }
    return file;
  };

  const handleUploadZzal = async (file: File) => {
    const jpgFile = await handleFileFormat(file);

    if (!jpgFile) {
      toast.error("사진 업로드에 실패했습니다.");
      return;
    }

    uploadZzal(
      {
        file: jpgFile,
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
    <div className="h-full overflow-y-auto">
      <Helmet>
        <title>짤 업로드 - 짤뮤니티</title>
        <meta name="description" content="새로운 짤을 짤뮤니티에 업로드해보세요!" />
      </Helmet>
      <div className="mx-auto flex h-full flex-col justify-start overflow-auto px-10pxr pb-70pxr">
        <div className="text-xl font-extrabold text-text-primary">짤 업로드</div>
        <div className="mt-30pxr flex w-full flex-col flex-wrap sm:flex-row">
          <div className="mx-auto mb-8 flex w-full flex-col gap-8 sm:w-640pxr sm:min-w-440pxr sm:px-24pxr">
            <div className="mb-8">
              <div className="font-bold">
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
            <div>
              <div className="font-bold">
                짤 제목
                <Asterisk
                  aria-label="필수 입력 항목 표시"
                  className="inline-block"
                  color="#ED0000"
                  size={16}
                />
              </div>
              <div className="flex h-50pxr max-w-650pxr rounded-full border border-gray-300 px-2 shadow-md sm:h-60pxr sm:min-w-440pxr sm:px-4">
                <input
                  id="imageTitleInput"
                  name="imageTitle"
                  onChange={handleChangeImageTitle}
                  value={imageTitle}
                  className="h-50pxr flex-1 rounded-xl border-none bg-transparent outline-none sm:h-60pxr"
                />
              </div>
            </div>
          </div>
          <div className="mx-auto mb-8">
            <div className="mb-2 font-bold">
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
        </div>
        <div className="flex w-full items-center justify-center">
          <button
            className="mt-20pxr h-50pxr w-full rounded-full bg-gradient-to-r from-primary to-[#78C6FF] text-lg font-bold text-white sm:h-60pxr sm:max-w-360pxr"
            onClick={handleClickUploadButton}
          >
            업로드하기
          </button>
        </div>
      </div>
    </div>
  );
};

export const Route = createLazyFileRoute("/_authentication/upload-zzal")({
  component: UploadZzal,
});
