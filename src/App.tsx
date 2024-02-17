import { RouterProvider, createRouter } from "@tanstack/react-router";
import { OverlayProvider } from "@toss/use-overlay";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="h-[100vh]">
      <QueryClientProvider client={queryClient}>
        <OverlayProvider>
          <RouterProvider router={router} />
        </OverlayProvider>
      </QueryClientProvider>
    </div>
  );
};

export default App;
