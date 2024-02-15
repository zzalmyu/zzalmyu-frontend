import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/tailwind";

interface Props {
  tags: Array<string>;
  onSelectTagName: (tagName: string) => void;
}

const TagAutoComplete = ({ tags = [], onSelectTagName }: Props) => {
  const [cursorIndex, setCursorIndex] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const handleKeydownTagFocus = (event: React.KeyboardEvent<HTMLUListElement>) => {
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

  const handleKeyUpTagSelect = (event: React.KeyboardEvent<HTMLUListElement>) => {
    const { key } = event;

    if (key === "Enter") return onSelectTagName(tags[cursorIndex]);
  };

  const handleClickTagName = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
    onSelectTagName(tags[tagIndex]);
  };

  const handleMouseOverTag = (tagIndex: number) => () => {
    setCursorIndex(tagIndex);
    ulRef.current?.focus();
  };

  useEffect(() => {
    ulRef.current?.focus();
  }, []);

  return (
    <ul
      className="box-border w-4/5 rounded-box border-2 p-2 shadow-xl outline-none"
      ref={ulRef}
      onKeyDown={handleKeydownTagFocus}
      onKeyUp={handleKeyUpTagSelect}
      onBlur={() => setCursorIndex(-1)}
      tabIndex={0}
    >
      {tags.length === 0 && (
        <li className="rounded-md px-1.5">
          <div>검색 결과가 없습니다</div>
        </li>
      )}
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <li
            key={`${index}-${tag}`}
            className={cn(
              `${index === cursorIndex && "bg-gray-200 font-bold"}  box-border rounded-md px-1.5 py-2`,
            )}
            onMouseOver={handleMouseOverTag(index)}
            onClick={handleClickTagName(index)}
          >
            <div>{tag}</div>
          </li>
        ))}
    </ul>
  );
};

export default TagAutoComplete;
