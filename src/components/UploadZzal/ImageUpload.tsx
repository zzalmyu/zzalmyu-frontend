import { Fragment, useRef, useState, DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/utils/tailwind";
import ZzalCard from "@/components/common/ZzalCard";

type DivDragEvent = DragEvent<HTMLDivElement>;
interface Props {
  onChange: (file: File | null) => void;
}

const ImageUpload = ({ onChange }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickDeleteButton = () => {
    onChange(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = event.target.files;
      const changedFile = files[0];
      onChange(changedFile);
      if (changedFile) {
        setPreviewUrl(URL.createObjectURL(changedFile));
      }
    }
  };

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (event: DivDragEvent) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (event: DivDragEvent) => {
    event.preventDefault();
    setDragging(false);
  };
  const handleDragOver = (event: DivDragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };
  const handleFileDrop = (event: DivDragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      const [changedFile] = event.dataTransfer.files;
      onChange(changedFile);
      if (changedFile) {
        setPreviewUrl(URL.createObjectURL(changedFile));
      }
    }
    setDragging(false);
  };

  return (
    <div
      className={cn(
        !previewUrl && "cursor-pointer",
        dragging ? "border-primary text-primary" : "border-text-secondary text-text-secondary",
        "relative flex h-400pxr w-320pxr flex-col items-center justify-center gap-50pxr overflow-clip rounded-[32px] border-4 border-dashed text-2xl font-bold  transition-colors hover:text-primary",
      )}
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {previewUrl && (
        <button
          className="absolute right-7pxr top-7pxr z-10 h-30pxr w-30pxr rounded-full bg-neutral pb-1pxr pl-1pxr text-base text-text-primary outline outline-transparent transition-[outline] hover:outline-delete"
          onClick={handleClickDeleteButton}
          aria-label="사진 제거하기"
        >
          ✕
        </button>
      )}
      {!previewUrl ? (
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
      ) : (
        <ZzalCard src={previewUrl ? previewUrl : ""} alt={""} width={320} />
      )}
    </div>
  );
};

export default ImageUpload;
