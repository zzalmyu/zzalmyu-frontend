"use client";

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
    <Modal isOpen={isOpen} onClose={onClose} className="p-40pxr">
      <Modal.Header>로그인</Modal.Header>
      <Modal.Body>
        <div className="flex flex-col items-center gap-3">
          <a href="https://api.zzalmyu.asia/oauth2/authorization/google">
            <GoogleLoginButton aria-label="구글 로그인" />
          </a>
          <a href="https://api.zzalmyu.asia/oauth2/authorization/kakao">
            <KakaoLoginButton aria-label="카카오 로그인" />
          </a>
          <a href="https://api.zzalmyu.asia/oauth2/authorization/naver">
            <NaverLoginButton aria-label="네이버 로그인" />
          </a>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
