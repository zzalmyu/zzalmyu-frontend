import { Outlet, createRootRoute } from "@tanstack/react-router";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";

const RootComponent = () => {
  return (
    <div className="flex min-h-full flex-col">
      <Header />
      <Outlet />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
