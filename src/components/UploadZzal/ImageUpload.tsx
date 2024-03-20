import { Fragment, useRef, useState, DragEvent, ChangeEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/utils/tailwind";

interface Props {
  changeFile: (file: File | null) => void;
  file: File | null;
}

const ImageUpload = ({ changeFile, file }: Props) => {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickDeleteButton = () => {
    changeFile(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;

    if (!files) return;

    const [changedFile] = files;

    if (changedFile) {
      changeFile(changedFile);
    }
  };

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const { items } = event.dataTransfer;

    if (items?.length > 0) {
      setDragging(true);
    }
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleFileDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const { files } = event.dataTransfer;

    const [changedFile] = files;

    if (changedFile) {
      changeFile(changedFile);
    }

    setDragging(false);
  };

  return (
    <div
      className={cn(
        !file && "cursor-pointer",
        dragging ? "border-primary text-primary" : "border-text-secondary text-text-secondary",
        "relative flex min-h-320pxr w-400pxr flex-col items-center justify-center gap-50pxr overflow-clip rounded-8pxr border-4 border-dashed text-2xl font-bold transition-colors hover:text-primary sm:min-h-400pxr",
      )}
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {file && (
        <Fragment>
          <img
            src={file ? URL.createObjectURL(file) : ""}
            alt="업로드 사진"
            className="w-440pxr rounded-lg object-contain"
          />
          <button
            className="absolute right-7pxr top-7pxr z-10 h-30pxr w-30pxr rounded-full bg-neutral pb-1pxr pl-1pxr text-base text-text-primary outline outline-transparent transition-[outline] hover:outline-delete"
            onClick={handleClickDeleteButton}
            aria-label="사진 제거하기"
          >
            ✕
          </button>
        </Fragment>
      )}
      {!file && (
        <Fragment>
          <Upload aria-label="업로드하기" size={72} />
          <div className={`hidden text-center sm:block`}>
            사진을 선택하거나 <br /> 여기로 끌어다 놓으세요
          </div>
          <input
            className="hidden"
            ref={inputRef}
            type="file"
            name="upload_image"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Fragment>
      )}
    </div>
  );
};

export default ImageUpload;
