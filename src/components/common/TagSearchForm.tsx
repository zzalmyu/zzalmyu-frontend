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

    if (selectedTags.length >= MAX_TAG || selectedTags.includes(tag)) {
      return;
    }

    setSelectedTags((previousState) => [...previousState, tag]);

    input.value = "";
  };

  const handleClickDeleteTag = (deleteTag: string) => () => {
    setSelectedTags(selectedTags.filter((selectedTag) => selectedTag !== deleteTag));
  };

  return (
    <div className={cn(`flex min-w-[607px] flex-col flex-wrap `, className)}>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="tagInput" className="a11y-hidden">
          태그 입력
        </label>
        <div className=" flex flex-wrap items-center rounded-3xl border border-black px-5 py-2">
          <input
            id="tagInput"
            name="tag"
            className="min-h-16 flex-1 rounded-xl border-none bg-transparent outline-none"
          />
          <button type="submit">
            <Search aria-label="검색" />
          </button>
        </div>
      </form>
      <ul className="mt-4 flex items-center pl-2">
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
