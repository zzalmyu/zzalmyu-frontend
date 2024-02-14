import NaverLoginButton from "@/assets/svg/naver-login-btn.svg";
import KakaoLoginButton from "@/assets/svg/kakao-login-btn.svg";
import GoogleLoginButton from "@/assets/svg/google-login-btn.svg";
import Modal from "@/components/common/Modal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Modal.Header>로그인</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center gap-3">
          <a href="/oauth2/authorization/google">
            <GoogleLoginButton />
          </a>
          <a href="/oauth2/authorization/kakao">
            <KakaoLoginButton />
          </a>
          <a href="/oauth2/authorization/naver">
            <NaverLoginButton />
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
