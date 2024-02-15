import { RouterProvider, createRouter } from "@tanstack/react-router";
import { OverlayProvider } from "@toss/use-overlay";
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

const App = () => {
  return (
    <OverlayProvider>
      <RouterProvider router={router} />
    </OverlayProvider>
  );
};

export default App;
