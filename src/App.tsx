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
    auth: undefined!,
  },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const InnerApp = () => {
  const auth = useAuthContext();
  return <RouterProvider router={router} context={{ auth }} />;
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <OverlayProvider>
        <AuthProvider>
          <InnerApp />
        </AuthProvider>
      </OverlayProvider>
    </QueryClientProvider>
  );
};

export default App;
