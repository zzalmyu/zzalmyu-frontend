import { Fragment } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "./-NotFound";

const RootComponent = () => {
  return (
    <Fragment>
      <Outlet />
    </Fragment>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
