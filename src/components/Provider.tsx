"use client";

import { ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "@toss/use-overlay";
import { AuthProvider } from "./Auth";

interface Props {
  children: ReactNode;
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });
}

let clientQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (typeof window === "undefined") {
    // 서버 환경에서는 새로운 QueryClient를 생성합니다. (사용자, 요청 간 쿼리 데이터가 공유되지 않도록)
    return makeQueryClient();
  } else {
    // 브라우저 환경에서는 기존에 생성된 QueryClient가 있다면 재사용합니다
    if (!clientQueryClient) {
      clientQueryClient = makeQueryClient();
    }
    return clientQueryClient;
  }
}

const Provider = ({ children }: Props) => {
  // useSuspenseQuery를 사용하지 않을 경우 data가 user, request 간 공유되지 않도록 react state으로 queryClient를 정의합니다.
  // 하지만 해당 프로젝트에서는 useSuspenseQuery가 일부 도입되어 있으므로 그대로 적용 시 SSR 환경에서 무한 refetch가 발생합니다.
  // 따라서 이를 방지하기 위해 getQueryClient 함수를 통해 렌더 트리가 suspend되어 완전히 날아가더라도 queryClient를 재생성하지 않도록 합니다.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AuthProvider>
          {children}
          <ToastContainer />
        </AuthProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default Provider;
