import { useEffect } from "react";
import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { setLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const route = getRouteApi("/_layout-with-chat/");

const Home = () => {
  const { accessToken, refreshToken } = route.useSearch();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && refreshToken) {
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
      navigate({ to: "/" });
    }
  });
    
  return <div></div>;
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
