import { Outlet, createRootRoute } from "@tanstack/react-router";

const RootComponent = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
});
