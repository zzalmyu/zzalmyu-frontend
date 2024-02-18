import { Fragment } from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";

const RootComponent = () => {
  return (
    <Fragment>
      <div className="flex max-h-screen min-h-screen flex-col overflow-hidden pb-10">
        <Header />
        <div className="max-h-full min-h-full overflow-auto px-10 pt-10">
          <Outlet />
        </div>
      </div>
    </Fragment>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
