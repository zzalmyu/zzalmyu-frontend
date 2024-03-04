import { Fragment, useEffect, useRef, useState } from "react";
import { useAtom } from "jotai";
import { cn } from "@/utils/tailwind";
import { $selectedTags } from "@/store/tag";
import { MAX_SEARCH_TAG } from "@/constants/tag";
import { useGetTags } from "@/hooks/api/tag/useGetTags";

interface Props {
  keyword: string;
  onCloseAutoComplete: () => void;
}

const TagAutoComplete = ({ keyword, onCloseAutoComplete }: Props) => {
  const [cursorIndex, setCursorIndex] = useState(-1);
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);
  const [isOpen, setIsOpen] = useState(true);
  const ulRef = useRef<HTMLUListElement | null>(null);

  const { autoCompletedTags } = useGetTags(keyword);

  const handleClickTagName = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);

    if (
      selectedTags.length < MAX_SEARCH_TAG &&
      !selectedTags.includes(autoCompletedTags[tagIndex].tagName)
    ) {
      setSelectedTags((previousSelectedTags) => [
        ...previousSelectedTags,
        autoCompletedTags[tagIndex].tagName,
      ]);
    }

    onCloseAutoComplete();
    setIsOpen(false);
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !ulRef.current?.contains(event.target as HTMLElement)) {
        setIsOpen(false);
        setCursorIndex(-1);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(true);
    setCursorIndex(-1);
  }, [autoCompletedTags]);

  return (
    <Fragment>
      {isOpen && autoCompletedTags.length > 0 && (
        <ul
          className="box-border w-[95%] rounded-box border-2 bg-white p-2 shadow-xl outline-none"
          onBlur={() => setCursorIndex(-1)}
          tabIndex={0}
          ref={ulRef}
        >
          {autoCompletedTags.map(({ tagId, tagName }, index) => (
            <li
              key={tagId}
              className={cn(
                "px-1.5 py-2",
                index === cursorIndex && "box-border rounded-md bg-gray-200 px-1.5 py-2 font-bold",
              )}
              onMouseOver={handleMouseOverTag(index)}
              onClick={handleClickTagName(index)}
            >
              <div>{tagName}</div>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  );
};

export default TagAutoComplete;
