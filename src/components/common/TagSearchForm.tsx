import { FormEvent, ChangeEvent, useState, useRef } from "react";
import { useAtom } from "jotai";
import { XCircle, Search, RotateCw } from "lucide-react";
import { debounce } from "@/utils/debounce";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";
import { MAX_SEARCH_TAG } from "@/constants/tag";
import { useGetTags } from "@/hooks/api/tag/useGetTags";
import TagAutoComplete from "@/components/common/TagAutoComplete";

interface Props {
  className?: string;
}

const TagSearchForm = ({ className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [tagKeyword, setTagKeyword] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { autoCompletedTags } = useGetTags(tagKeyword);

  const debouncedRefetch = debounce((keyword: string) => {
    setTagKeyword(keyword);
  }, 300);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const tag = formData.get("tag") as string;

    if (selectedTags.length < MAX_SEARCH_TAG && !selectedTags.includes(tag)) {
      setSelectedTags((previousState) => [...previousState, tag]);
    }

    setTagKeyword("");
  };

  const handleClickDeleteTag = (tag: string) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleClickResetTagButton = () => {
    setSelectedTags([]);
  };

  const handleChangeInputText = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedRefetch(event.target.value);
  };

  const handleCloseAutoComplete = () => {
    if (inputRef && inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className={cn(`relative flex w-650pxr flex-col flex-wrap `, className)}>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="tagInput" className="a11y-hidden">
          태그 입력
        </label>
        <div className="flex max-w-650pxr flex-wrap items-center rounded-3xl border border-black px-4">
          <input
            id="tagInput"
            name="tag"
            ref={inputRef}
            onChange={handleChangeInputText}
            className="min-h-16 flex-1 rounded-xl border-none bg-transparent outline-none"
          />
          <button type="submit">
            <Search aria-label="검색" />
          </button>
        </div>
      </form>
      <div className="absolute top-70pxr flex w-full justify-center">
        <TagAutoComplete
          tags={autoCompletedTags || []}
          onCloseAutoComplete={handleCloseAutoComplete}
        />
      </div>
      <div className="flex items-center">
        {selectedTags.length > 0 && (
          <button onClick={handleClickResetTagButton} className=" mr-4 mt-4 pl-4" type="button">
            <RotateCw aria-label="태그 초기화" />
          </button>
        )}

        <ul className="flex-column mt-4 flex min-h-8 flex-wrap items-center justify-center gap-2 pl-1">
          {selectedTags.map((selectedTag, index) => (
            <li
              key={`${index}-${selectedTag}`}
              className="mr-2 flex items-center rounded-3xl bg-tag px-2 py-1 text-white"
            >
              {selectedTag}
              <XCircle
                onClick={handleClickDeleteTag(selectedTag)}
                aria-label="태그 삭제"
                className="ml-1 w-5 cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TagSearchForm;
