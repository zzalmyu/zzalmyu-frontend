import { Fragment, useRef, useState } from "react";
import { Upload } from "lucide-react";
import ZzalCard from "../common/ZzalCard";

const ImageUpload = () => {
  const onChange = () => {
    // handle file change
  };
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickDeleteButton = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    const changedFile = files[0];
    setFile(changedFile);
    if (changedFile) {
      setPreviewUrl(URL.createObjectURL(changedFile));
    }
    onChange && onChange(changedFile);
  };

  const handleChooseFile = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  };
  const handleDragLeave = (e) => {
    e.preventDefault();

    setDragging(false);
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    const changedFile = files[0];
    setFile(changedFile);
    if (changedFile) {
      setPreviewUrl(URL.createObjectURL(changedFile));
    }
    onChange && onChange(changedFile);
    setDragging(false);
  };

  return (
    <div
      className={`relative flex h-400pxr w-320pxr ${!file && "cursor-pointer"} flex-col items-center justify-center gap-50pxr overflow-clip rounded-[32px] border-4 border-dashed text-2xl font-bold ${dragging ? "border-primary text-primary" : "border-text-secondary text-text-secondary"} transition-colors hover:text-primary`}
      onClick={handleChooseFile}
      onDrop={handleFileDrop}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
    >
      {file && (
        <button
          className="absolute right-7pxr top-7pxr z-10 h-30pxr w-30pxr rounded-full bg-neutral pb-1pxr pl-1pxr text-base text-text-primary outline outline-transparent transition-[outline] hover:outline-delete"
          onClick={handleClickDeleteButton}
        >
          ✕
        </button>
      )}
      {!file ? (
        <Fragment>
          <Upload aria-label="업로드 아이콘" size={72} />
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
