import { FormEvent, ChangeEvent, useState, useEffect } from "react";
import { useAtom } from "jotai";
import { Search, RotateCw } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { debounce } from "@/utils/debounce";
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
  const [cursorIndex, setCursorIndex] = useState(-2);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const userInputTag = formData.get("tag") as string;

    if (selectedTags.length < MAX_SEARCH_TAG && !selectedTags.includes(userInputTag)) {
      increaseTagUsage(userInputTag);
      setSelectedTags((previousState) => [...previousState, userInputTag]);
    }

    setCursorIndex(0);
    setTagKeyword("");
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

  const handleChangeTagInput = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setTagKeyword(event.target.value);

    if (event.target.value.length > 0) setCursorIndex(-2);
    else setCursorIndex(0);
  }, 200);

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
            onFocus={handleFocusTagInput}
            onBlur={handleBlurTagInput}
            onChange={handleChangeTagInput}
            autoComplete="off"
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
          <TagAutoComplete
            autoCompletedTags={autoCompletedTags}
            cursorIndex={cursorIndex}
            setCursorIndex={setCursorIndex}
          />
        )}
      </div>
      <div className="mt-3 flex items-center justify-around">
        {selectedTags.length > 0 && (
          <button
            onClick={handleClickResetTagButton}
            className="flex-column mr-4 flex items-center whitespace-nowrap rounded-full bg-card p-2"
            type="button"
          >
            <RotateCw size={12} aria-label="태그 초기화" />
            초기화
          </button>
        )}
        <div className="w-full">{!showAutoComplete && <TagSlider tags={selectedTags} />}</div>
      </div>
    </div>
  );
};

export default TagSearchForm;
