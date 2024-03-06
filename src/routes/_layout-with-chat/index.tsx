import { useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { setLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const Home = () => {
  useEffect(() => {
    const currentURL = window.location.href;
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get(ACCESS_TOKEN);
    const refreshToken = urlParams.get(REFRESH_TOKEN);

    const baseURL = currentURL.split("?")[0];

    if (accessToken && refreshToken) {
      window.location.href = baseURL;

      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
    }
  });
  return <div></div>;
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
