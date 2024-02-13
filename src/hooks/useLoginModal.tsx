import { useModal } from "./useModal";
import NaverLoginButton from "@/assets/svg/naver-login-btn.svg";
import KakaoLoginButton from "@/assets/svg/kakao-login-btn.svg";
import GoogleLoginButton from "@/assets/svg/google-login-btn.svg";

export const useLoginModal = () => {
  return useModal({
    children: (
      <>
        <h3 className="mb-6 w-full text-center text-2xl font-extrabold">로그인</h3>
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
      </>
    ),
  });
};
