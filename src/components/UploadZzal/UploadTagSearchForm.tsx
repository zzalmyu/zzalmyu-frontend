import { FormEvent, ChangeEvent, useState, useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { Search, RotateCw } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { sleep } from "@/utils/sleep";
import TagSlider from "../common/TagSlider";
import UploadTagAutoComplete from "./UploadTagAutoComplete";
import { useGetTags } from "@/hooks/api/tag/useGetTags";
import { usePostTag } from "@/hooks/api/tag/usePostTag";
import { $recommendedTags, $selectedUploadTags } from "@/store/tag";
import { MAX_SEARCH_TAG_UPLOAD } from "@/constants/tag";

interface Props {
  className?: string;
}

const UploadTagSearchForm = ({ className }: Props) => {
  const { createTag } = usePostTag();
  const [recommendedTags] = useAtom($recommendedTags);
  const [selectedUploadTags, setSelectedUploadTags] = useAtom($selectedUploadTags);
  const isMountedRef = useRef(false);
  const isChangeStateRef = useRef(false); // TODO: [2024-03-17] Strict 모드는 개발 모드에서만 활성화되므로, 추후 삭제해야합니다. (React.StrictMode로 인해, 개발자 모드에서 useEffect가 두번 실행되므로 작성해주었습니다.)
  const [tagKeyword, setTagKeyword] = useState("");
  const { autoCompletedTags } = useGetTags(tagKeyword);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(-2);
  const [uploadTagId, setUploadTagId] = useState<number>(-1);
  const [uploadTagName, setUploadTagName] = useState<string>("");

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userInputTag = formData.get("tag") as string;

    if (autoCompletedTags.length === 0 || userInputTag !== autoCompletedTags[0]?.tagName) {
      createTag(userInputTag, {
        onSuccess: (response) => {
          setUploadTagName(userInputTag);
          setUploadTagId(response.tagId);
        },
      });
    } else {
      setUploadTagName(userInputTag);
      setUploadTagId(autoCompletedTags[0].tagId);
    }

    setCursorIndex(0);
    setTagKeyword("");
    setShowAutoComplete(false);
  };

  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }

    // TODO: [2024-03-17] Strict 모드는 개발 모드에서만 활성화되므로, 추후 삭제해야합니다. (React.StrictMode로 인해, 개발자 모드에서 useEffect가 두번 실행되므로 작성해주었습니다.)
    if (!isChangeStateRef.current) {
      isChangeStateRef.current = true;
      return;
    }

    if (
      selectedUploadTags.length < MAX_SEARCH_TAG_UPLOAD &&
      !selectedUploadTags.find((tag) => tag.tagId === uploadTagId && tag.tagName === uploadTagName)
    ) {
      setSelectedUploadTags((previousState) => [
        ...previousState,
        { tagId: uploadTagId, tagName: uploadTagName },
      ]);
    }
  }, [uploadTagId, uploadTagName]);

  const handleClickResetTagButton = () => {
    setSelectedUploadTags([]);
  };

  const handleFocusTagInput = () => {
    setShowAutoComplete(true);
  };

  const handleBlurTagInput = async () => {
    await sleep(1);
    setShowAutoComplete(false);
    setCursorIndex(-1);
  };

  const handleResetTagInput = () => {
    setTagKeyword("");
  };

  const handleChangeTagInput = (event: ChangeEvent<HTMLInputElement>) => {
    setShowAutoComplete(true);
    setTagKeyword(event.target.value);

    if (event.target.value.length > 0) setCursorIndex(-2);
    else setCursorIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowAutoComplete(false);
        setCursorIndex(-1);
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();

        setShowAutoComplete(true);
        setCursorIndex((previousIndex) =>
          Math.min(previousIndex + 1, autoCompletedTags.length + recommendedTags.length - 1),
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        setShowAutoComplete(true);
        setCursorIndex((previousIndex) => Math.max(previousIndex - 1, 0));
        return;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [autoCompletedTags.length, recommendedTags.length]);

  return (
    <div
      className={cn(
        "relative flex h-50pxr max-h-70pxr min-w-340pxr max-w-650pxr flex-col sm:h-60pxr sm:min-w-400pxr",
        className,
      )}
    >
      <form onSubmit={handleSubmitForm} className="mb-8pxr flex h-full w-full flex-col flex-wrap">
        <label htmlFor="tagInput" className="a11y-hidden">
          태그 입력
        </label>
        <div className="flex h-full w-full flex-wrap items-center gap-2 rounded-full border border-gray-300 py-6pxr shadow-xl sm:gap-4 sm:px-4">
          <input
            id="tagInput"
            name="tag"
            value={tagKeyword}
            onFocus={handleFocusTagInput}
            onBlur={handleBlurTagInput}
            onChange={handleChangeTagInput}
            autoComplete="off"
            minLength={1}
            maxLength={10}
            className="z-20 min-h-12 flex-1 rounded-xl border-none bg-transparent py-6pxr outline-none"
          />
          <button
            type="submit"
            className="z-20 flex items-center gap-6pxr rounded-full bg-primary text-white sm:p-2"
          >
            <Search aria-label="검색" size={20} />
            검색
          </button>
        </div>
      </form>
      <div className="absolute flex w-full justify-center sm:top-35pxr">
        {showAutoComplete && (
          <UploadTagAutoComplete
            autoCompletedTags={autoCompletedTags}
            cursorIndex={cursorIndex}
            setCursorIndex={setCursorIndex}
            handleResetTagInput={handleResetTagInput}
          />
        )}
      </div>
      <div className="mt-3 flex items-center">
        {selectedUploadTags.length > 0 && (
          <button
            onClick={handleClickResetTagButton}
            className="mr-4 flex items-center whitespace-nowrap rounded-full bg-card p-2"
            type="button"
          >
            <RotateCw size={12} aria-label="태그 초기화" />
            초기화
          </button>
        )}
        <div className="min-w-10pxr">
          {!showAutoComplete && (
            <TagSlider tags={selectedUploadTags.map(({ tagName }) => tagName)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadTagSearchForm;
