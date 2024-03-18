import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/components/Auth";
import { routeTree } from "./routeTree.gen";
import { useAuthContext } from "./hooks/auth/useAuthContext";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: {
    authorize: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const authorize = useAuthContext();
  return <RouterProvider router={router} context={{ authorize }} />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <AuthProvider>
            <InnerApp />
          </AuthProvider>
        </OverlayProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
