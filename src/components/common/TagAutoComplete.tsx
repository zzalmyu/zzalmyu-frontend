import { useEffect, useState } from "react";
import { cn } from "@/utils/tailwind";
import { GetTagsResponse } from "@/types/tag.dto";

interface Props {
  tags: GetTagsResponse[];
  onSelectTagName: (tag: GetTagsResponse) => void;
}

const TagAutoComplete = ({ tags = [], onSelectTagName }: Props) => {
  const [cursorIndex, setCursorIndex] = useState(0);

  const handleClickTagName = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
    onSelectTagName(tags[tagIndex]);
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
  };

  useEffect(() => {
    const handleKeydownTagFocus = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "ArrowUp") {
        setCursorIndex((cursor) => {
          return cursor - 1 < 0 ? tags.length - 1 : cursor - 1;
        });
      }
      if (key === "ArrowDown") {
        setCursorIndex((cursor) => {
          return cursor + 1 >= tags.length ? 0 : cursor + 1;
        });
      }
    };

    const handleKeyUpTagSelect = (event: KeyboardEvent) => {
      const { key } = event;

      if (key === "Enter") return onSelectTagName(tags[cursorIndex]);
    };

    window.addEventListener("keydown", handleKeydownTagFocus);
    window.addEventListener("keyup", handleKeyUpTagSelect);

    return () => {
      window.removeEventListener("keydown", handleKeydownTagFocus);
      window.removeEventListener("keyup", handleKeyUpTagSelect);
    };
  });

  return (
    <ul
      className="box-border w-4/5 rounded-box border-2 p-2 shadow-xl outline-none"
      onBlur={() => setCursorIndex(-1)}
      tabIndex={0}
    >
      {tags.length === 0 && (
        <li className="rounded-md px-1.5">
          <div>검색 결과가 없습니다</div>
        </li>
      )}
      {tags.length > 0 &&
        tags.map(({ tagId, tagName }, index) => (
          <li
            key={`${tagId}`}
            className={cn(
              `${index === cursorIndex && "bg-gray-200 font-bold"} box-border rounded-md px-1.5 py-2`,
            )}
            onMouseOver={handleMouseOverTag(index)}
            onClick={handleClickTagName(index)}
          >
            <div>{tagName}</div>
          </li>
        ))}
    </ul>
  );
};

export default TagAutoComplete;
