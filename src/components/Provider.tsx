"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "@toss/use-overlay";
import { AuthProvider } from "./Auth";

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Provider = ({ children }: Props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AuthProvider>{children}</AuthProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default Provider;
