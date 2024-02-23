// index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";
import LoginModal from "@/components/LoginModal";
import ImageDetailModal from "@/components/ImageDetailModal";
import useMessagePreview from "@/hooks/chat/useMessagePreview";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";
import { $previewImage } from "@/store/chat";

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

  const { setMessagePreview, deleteMessagePreview } = useMessagePreview();
  const previewImage = useAtomValue($previewImage);

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
        <button
          className="rounded-xl bg-primary p-5pxr text-white"
          onClick={() => {
            console.log(previewImage);

            if (!previewImage) {
              setMessagePreview(
                "https://i.pinimg.com/564x/bb/26/c6/bb26c6670b60beff3d81ef74771f2c69.jpg",
              );
            } else deleteMessagePreview();
          }}
        >
          src 토글
        </button>
      </div>
      {/* <ChatRoom /> */}
    </div>
  );
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
