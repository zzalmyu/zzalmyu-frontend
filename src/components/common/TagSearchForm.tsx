import { FormEvent } from "react";
import { useAtom } from "jotai";
import { XCircle, Search } from "lucide-react";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";

interface Props {
  className?: string;
}

const MAX_TAG = 5;

const TagSearchForm = ({ className }: Props) => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);

  const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const tag = formData.get("tag") as string;
    const input = event.currentTarget.elements.namedItem("tag") as HTMLInputElement;

    if (selectedTags.length < MAX_TAG && !selectedTags.includes(tag)) {
      setSelectedTags((previousState) => [...previousState, tag]);
    }

    input.value = "";
  };

  const handleClickDeleteTag = (tag: string) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== tag));
  };

  const handleClickResetTagButton = () => {
    setSelectedTags([]);
  };

  return (
    // TODO: [2024.02.14] px 추후 pxr로 변환
    <div className={cn(`flex w-[650px] flex-col flex-wrap `, className)}>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="tagInput" className="a11y-hidden">
          태그 입력
        </label>
        <div className=" flex max-w-[700px] flex-wrap  items-center rounded-3xl border border-black px-4">
          <input
            id="tagInput"
            name="tag"
            className="min-h-16 flex-1 rounded-xl border-none bg-transparent outline-none"
          />

          {selectedTags.length > 0 && (
            <button onClick={handleClickResetTagButton} className="mr-4" type="button">
              <XCircle />
            </button>
          )}

          <button type="submit">
            <Search aria-label="검색" />
          </button>
        </div>
      </form>
      <ul className="mt-4 flex min-h-8 flex-wrap items-center gap-2 pl-2">
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
  );
};

export default TagSearchForm;
