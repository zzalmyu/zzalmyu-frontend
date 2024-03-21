import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Search, RotateCw } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { sleep } from "@/utils/sleep";
import { useGetTags } from "@/hooks/api/tag/useGetTags";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import TagAutoComplete from "@/components/common/SearchTag/TagAutoComplete";
import { MAX_SEARCH_TAG } from "@/constants/tag";
import TagSlider from "@/components/common/TagSlider";
import usePostUsedTag from "@/hooks/api/tag/usePostUsedTag";

interface Props {
  className?: string;
}

const TagSearchForm = ({ className }: Props) => {
  const { increaseTagUsage } = usePostUsedTag();
  const [recommendedTags] = useAtom($recommendedTags);
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [tagKeyword, setTagKeyword] = useState("");
  const { autoCompletedTags } = useGetTags(tagKeyword);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(-1);
  const allTags = [...autoCompletedTags, ...recommendedTags];

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userInputTag = formData.get("tag") as string;

    if (
      selectedTags.length < MAX_SEARCH_TAG &&
      !selectedTags.includes(userInputTag) &&
      userInputTag.length
    ) {
      increaseTagUsage(userInputTag);
      setSelectedTags((previousState) => [...previousState, userInputTag]);
    }

    setCursorIndex(-1);
    setTagKeyword("");
    setShowAutoComplete(false);
  };

  const handleClickResetTagButton = () => {
    setSelectedTags([]);
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
    else setCursorIndex(-1);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        if (allTags[cursorIndex]) {
          setTagKeyword(allTags[cursorIndex].tagName);
        }
        return;
      }

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
  }, [autoCompletedTags.length, recommendedTags.length, cursorIndex]);

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
        <div className="flex h-full w-full flex-wrap items-center gap-2 rounded-full border border-gray-300 px-2 py-0 shadow-md sm:gap-4 sm:px-4">
          <input
            id="tagInput"
            name="tag"
            value={tagKeyword}
            onFocus={handleFocusTagInput}
            onBlur={handleBlurTagInput}
            onChange={handleChangeTagInput}
            autoComplete="off"
            className="z-20 h-50pxr min-h-8 flex-1 rounded-xl border-none bg-transparent outline-none sm:h-60pxr"
          />
          <button
            type="submit"
            className={cn(
              "relative z-20 flex h-30pxr items-center gap-6pxr overflow-hidden rounded-full bg-primary p-2 text-white transition-[width_height] sm:h-35pxr  sm:p-2",
              showAutoComplete ? "w-65pxr sm:w-70pxr" : "w-30pxr sm:w-35pxr",
            )}
          >
            <Search aria-label="검색" size={20} className="z-10" />
            <span
              className={cn(
                "absolute right-2 z-10 text-sm transition-opacity delay-100 duration-200 sm:text-base",
                showAutoComplete ? "opacity-100" : "translate-y-50pxr opacity-0",
              )}
            >
              검색
            </span>
            <div
              className={cn(
                showAutoComplete ? "opacity-100" : "opacity-0",
                "absolute inset-0 h-full w-full bg-gradient-to-r from-primary to-[#78C6FF] duration-300",
              )}
            ></div>
          </button>
        </div>
      </form>
      <div className="absolute top-25pxr flex w-full justify-center sm:top-30pxr">
        {showAutoComplete && allTags.length && (
          <TagAutoComplete
            autoCompletedTags={autoCompletedTags}
            cursorIndex={cursorIndex}
            setCursorIndex={setCursorIndex}
            handleResetTagInput={handleResetTagInput}
          />
        )}
      </div>
      <div className="mt-1 flex items-center justify-around sm:mt-0">
        {selectedTags.length > 0 && (
          <button
            onClick={handleClickResetTagButton}
            className="flex-column mr-4 hidden items-center whitespace-nowrap rounded-full bg-card p-1 px-2 text-sm sm:flex sm:text-base"
            type="button"
          >
            <RotateCw size={12} aria-label="태그 초기화" className="mr-1" />
            초기화
          </button>
        )}
        <div className="w-full">
          <TagSlider tags={selectedTags} />
        </div>
      </div>
    </div>
  );
};

export default TagSearchForm;
