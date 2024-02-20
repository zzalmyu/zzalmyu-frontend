import { Fragment } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";

const RootComponent = () => {
  return (
    <Fragment>
      <Header />
      <div className="p-40pxr">
        <Outlet />
      </div>
    </Fragment>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
