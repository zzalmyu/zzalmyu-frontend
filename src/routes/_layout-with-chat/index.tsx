// index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import LoginModal from "@/components/LoginModal";
import ImageDetailModal from "@/components/ImageDetailModal";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const Home = () => {
  // TODO: [2024.02.14] AlertModal 테스트 임시 코드 제거
  const alertOverlay = useOverlay();
  const handleClickAlert = () => {
    alertOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal isOpen={isOpen} onClose={close} onDelete={() => {}} />
    ));
  };

  const loginOverlay = useOverlay();
  const handleClickLogin = () => {
    loginOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
  };
  const ImageOverlay = useOverlay();
  const handleClickImageDetail = () => {
    ImageOverlay.open(({ isOpen, close }) => <ImageDetailModal isOpen={isOpen} onClose={close} />);
  };
  return (
    <div>
      <div>여긴 메인(홈) 페이지</div>
      <div className="flex w-[10rem] flex-col gap-5">
        <button onClick={handleClickAlert} className="rounded-xl border-2 border-primary ">
          ALERT
        </button>
        <button onClick={handleClickLogin} className="rounded-xl border-2 border-primary ">
          LOGIN
        </button>
        <button onClick={handleClickImageDetail} className="rounded-xl border-2 border-primary ">
          IMAGE_DETAIL
        </button>
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
