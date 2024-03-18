import { Fragment } from "react";
import { useAtom } from "jotai";
import { Search, SearchX } from "lucide-react";
import { $selectedTags } from "@/store/tag";

const NoSearchResults = () => {
  const [selectedTags, setSelectedTags] = useAtom($selectedTags);

  const handleClickBackButton = () => {
    setSelectedTags([]);
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {selectedTags.length === 0 && (
        <Fragment>
          <Search aria-label="검색" size={60} />
          <div className="mt-35pxr text-center text-4xl">
            <div>보유하신 짤이 없습니다!</div>
            <div>짤들을 업로드 하거나 좋아요를 눌러보세요</div>
          </div>
        </Fragment>
      )}

      {selectedTags.length !== 0 && (
        <Fragment>
          <SearchX aria-label="검색 실패" size={60} />
          <p className="mt-35pxr text-4xl">검색 결과가 없어요!</p>
          <p className="mt-20pxr text-text-secondary">필터를 삭제하고 다시 시도해보세요.</p>
          <button
            className="mt-40pxr h-40pxr w-180pxr rounded-full bg-primary text-white"
            onClick={handleClickBackButton}
          >
            되돌아가기
          </button>
        </Fragment>
      )}
    </div>
  );
};

export default NoSearchResults;
