import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "./-NotFound";

const RootComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
