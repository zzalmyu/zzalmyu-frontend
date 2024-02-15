// index.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import LoginModal from "@/components/LoginModal";

const Home = () => {
  const loginModalOverlay = useOverlay();
  const handleClickLogin = () => {
    loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
  };

  return (
    <>
      <div>여긴 메인(홈) 페이지</div>
      <button onClick={handleClickLogin}>로그인하기 (테스트)</button>
    </>
  );
};

export const Route = createFileRoute("/")({
  component: Home,
});
