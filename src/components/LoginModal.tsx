import NaverLoginButton from "@/assets/svg/naver-login-btn.svg";
import KakaoLoginButton from "@/assets/svg/kakao-login-btn.svg";
import GoogleLoginButton from "@/assets/svg/google-login-btn.svg";
import Modal from "@/components/common/modals/Modal";

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
            {/*TODO: [2024.02.15] 배포 주소 endpoint 연결 */}
            <GoogleLoginButton aria-label="구글 로그인" />
          </a>
          <a href="/oauth2/authorization/kakao">
            {/*TODO: [2024.02.15] 배포 주소 endpoint 연결 */}
            <KakaoLoginButton aria-label="카카오 로그인" />
          </a>
          <a href="/oauth2/authorization/naver">
            {/*TODO: [2024.02.15] 배포 주소 endpoint 연결 */}
            <NaverLoginButton aria-label="네이버 로그인" />
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
