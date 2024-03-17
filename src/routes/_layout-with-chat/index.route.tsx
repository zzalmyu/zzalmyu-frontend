import { useEffect } from "react";
import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { setLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const route = getRouteApi("/_layout-with-chat/");

const PendingComponent = () => {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = route.useSearch<{
    accessToken: string;
    refreshToken: string;
  }>();

  useEffect(() => {
    if (accessToken && refreshToken) {
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
      navigate({ to: "/" });
    }
  });
  return <div>pending Home Zzlas</div>;
};

export const Route = createFileRoute("/_layout-with-chat/")({
  pendingComponent: PendingComponent,
});
