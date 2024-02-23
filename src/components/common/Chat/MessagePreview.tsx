import { useAtom } from "jotai";
import ZzalCard from "@/components/common/ZzalCard";
import { $peekState } from "@/store/chat";

const MessagePreview = () => {
  const [peekState, setPeekState] = useAtom($peekState);
  const { src } = peekState;

  const handleClickCloseButton = () => {
    setPeekState({ src: "", isOpen: false });
  };

  return (
    <div className="relative w-1/3 rounded-lg border-4 border-dashed border-yellow-400">
      {src && <ZzalCard src={src} alt="메세지 미리보기" width={"full"} />}
      {!src && <div className="h-150pxr w-full"></div>}

      {src && (
        <button
          className="absolute -right-15pxr -top-10pxr z-10 h-30pxr w-30pxr rounded-full bg-gray-400 text-base font-bold text-white transition hover:scale-110"
          onClick={handleClickCloseButton}
          aria-label="사진 제거하기"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default MessagePreview;
