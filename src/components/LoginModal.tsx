import NaverLoginButton from "@/assets/svg/naver-login-btn.svg";
import KakaoLoginButton from "@/assets/svg/kakao-login-btn.svg";
import GoogleLoginButton from "@/assets/svg/google-login-btn.svg";
import NewModal from "@/components/common/NewModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: Props) => {
  return (
    <NewModal isOpen={isOpen} onClose={onClose}>
      <NewModal.Header>로그인</NewModal.Header>
      <NewModal.Body>
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
      </NewModal.Body>
    </NewModal>
  );
};

export default LoginModal;
