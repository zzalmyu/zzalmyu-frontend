import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { createFileRoute, getRouteApi, useNavigate } from "@tanstack/react-router";
import { setLocalStorage } from "@/utils/localStorage";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/constants/auth";

const route = getRouteApi("/_layout-with-chat/");

const Home = () => {
  const { accessToken, refreshToken } = route.useSearch<{
    accessToken: string;
    refreshToken: string;
  }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken && refreshToken) {
      setLocalStorage(ACCESS_TOKEN, accessToken);
      setLocalStorage(REFRESH_TOKEN, refreshToken);
      navigate({ to: "/" });
    }
  });

  return (
    <>
      <Helmet>
        <title>짤뮤니티 | 나만을 위한 취향 저격 짤 추천</title>
        <meta
          name="description"
          content="본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!"
        />
        <meta property="og:title" content="짤뮤니티 | 나만을 위한 취향 저격 짤 추천" />
        <meta property="og:image" content="/thumbnail.jpg" />
        <meta property="og:url" content="https://www.zzalmyu.site/" />
        <meta
          property="og:description"
          content="본인의 취향과 선호도에 따라 선별된 짤 컬렉션을 추천 받아 보세요!"
        />
      </Helmet>
      <div></div>
    </>
  );
};

export const Route = createFileRoute("/_layout-with-chat/")({
  component: Home,
});
