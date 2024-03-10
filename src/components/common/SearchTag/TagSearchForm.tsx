import { FormEvent, ChangeEvent, useState } from "react";
import { useAtom } from "jotai";
import { Search, RotateCw } from "lucide-react";
import { debounce } from "@/utils/debounce";
import { cn } from "@/utils/tailwind";
import { useGetTags } from "@/hooks/api/tag/useGetTags";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import TagBadge from "@/components/common/TagBadge";
import TagAutoComplete from "@/components/common/SearchTag/TagAutoComplete";
import { MAX_SEARCH_TAG } from "@/constants/tag";

interface Props {
  className?: string;
}

const TagSearchForm = ({ className }: Props) => {
  const [recommendedTags] = useAtom($recommendedTags);
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [tagKeyword, setTagKeyword] = useState("");
  const { autoCompletedTags } = useGetTags(tagKeyword);
  const [showAutoComplete, setShowAutoComplete] = useState(false);
  const [cursorIndex, setCursorIndex] = useState(0);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const allTags = [...autoCompletedTags, ...recommendedTags];
    const selectedTag = allTags[cursorIndex].tagName;

    if (selectedTags.length < MAX_SEARCH_TAG && !selectedTags.includes(selectedTag)) {
      setSelectedTags((previousState) => [...previousState, selectedTag]);
    }

    setTagKeyword("");
  };

  const handleClickResetTagButton = () => {
    setSelectedTags([]);
  };

  const handleFocusTagInput = () => {
    setShowAutoComplete(true);
  };

  const handleBlurTagInput = () => {
    setShowAutoComplete(false);
    setCursorIndex(0);
  };

  const handleChangeTagInput = debounce((event: ChangeEvent<HTMLInputElement>) => {
    setTagKeyword(event.target.value);
  }, 200);

  return (
    <div
      className={cn(
        `relative flex h-50pxr max-h-70pxr min-w-340pxr max-w-650pxr flex-col flex-wrap sm:h-60pxr sm:min-w-400pxr`,
        className,
      )}
    >
      <form onSubmit={handleSubmitForm} className="h-full w-full">
        <label htmlFor="tagInput" className="a11y-hidden">
          태그 입력
        </label>
        <div className="flex h-full w-full flex-wrap items-center gap-2 rounded-full border border-gray-300 pl-4 pr-2 shadow-xl sm:gap-4 sm:px-4">
          <input
            id="tagInput"
            name="tag"
            onFocus={handleFocusTagInput}
            onBlur={handleBlurTagInput}
            onChange={handleChangeTagInput}
            autoComplete="off"
            className="z-20 min-h-12 flex-1 rounded-xl border-none bg-transparent outline-none"
          />
          <button type="submit" className="z-20 rounded-full bg-primary p-6pxr text-white sm:p-2">
            <Search aria-label="검색" size={20} />
          </button>
        </div>
      </form>
      <div className="absolute top-25pxr flex w-full justify-center sm:top-35pxr">
        {showAutoComplete && (
          <TagAutoComplete
            autoCompletedTags={autoCompletedTags}
            cursorIndex={cursorIndex}
            setCursorIndex={setCursorIndex}
          />
        )}
      </div>
      <div className="flex items-center">
        {selectedTags.length > 0 && (
          <button onClick={handleClickResetTagButton} className="mr-4 mt-4 pl-4" type="button">
            <RotateCw aria-label="태그 초기화" />
          </button>
        )}

        <ul className="flex-column mt-4 flex min-h-8 flex-wrap items-center justify-center gap-2 pl-1">
          {selectedTags.map((selectedTag, index) => (
            <TagBadge content={selectedTag} isClickable key={`${index}-${selectedTag}`} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagSearchForm;
