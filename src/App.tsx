import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const queryClient = new QueryClient();

const App = () => {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <RouterProvider router={router} />
        </OverlayProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export default App;
