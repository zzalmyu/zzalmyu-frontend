import { Fragment, useEffect } from "react";
import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { useOverlay } from "@toss/use-overlay";
import LoginModal from "@/components/LoginModal";
import { getLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REDIRECT_PATH, REFRESH_TOKEN } from "@/constants/auth";
const route = getRouteApi("/_layout-with-chat/");

const Home = () => {
  const { accessToken, refreshToken, redirect } = route.useSearch<{
    accessToken: string;
    refreshToken: string;
    redirect: string;
  }>();

  const navigate = useNavigate();
  const loginModalOverlay = useOverlay();

  useEffect(() => {
    if (accessToken && refreshToken) {
      const redirectPath = getLocalStorage("redirect") as string;
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);

      navigate({ to: redirectPath || "/" });
    }
    if (redirect) {
      setLocalStorage(REDIRECT_PATH, redirect);
      loginModalOverlay.open(({ isOpen, close }) => <LoginModal isOpen={isOpen} onClose={close} />);
      navigate({ to: "/" });
    }
  });

  return <Fragment></Fragment>;
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
