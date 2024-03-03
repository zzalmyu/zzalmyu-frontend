import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import ImageDetailModal from "@/components/ImageDetailModal";

const Home = () => {
  // TODO: [2024-03-03] 이미지 상세 모달 구현 코드에 따라 변경될 수 있습니다. (이미지 삭제 성공 시, 모달이 닫히는 동작을 구현하기 위해 코드 구현)
  const zzalModalOverlay = useOverlay();

  const handleClickZzal = () => {
    zzalModalOverlay.open(({ isOpen, close }) => (
      <ImageDetailModal isOpen={isOpen} onClose={close} />
    ));
  };

  return (
    <div>
      <button onClick={handleClickZzal}>Zzal 클릭 시 상세 모달 열기</button>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
