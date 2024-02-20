import { SearchX } from "lucide-react";

interface Props {
  onClick: (inputValue: string) => void;
}

const NotSearch = ({ onClick }: Props) => {
  return (
    <div className="flex h-400pxr w-[35%] min-w-96 flex-col items-center rounded-xl bg-card">
      <SearchX aria-label="검색 실패" size={60} className="mt-80pxr" />
      <p className="mt-35pxr text-4xl">검색 결과가 없어요!</p>
      <p className="mt-20pxr text-text-secondary">필터를 삭제하고 다시 시도해보세요.</p>
      <button
        className="mt-40pxr h-40pxr w-180pxr rounded-full bg-primary text-white"
        onClick={() => onClick("")}
      >
        되돌아가기
      </button>
    </div>
  );
};

export default NotSearch;
