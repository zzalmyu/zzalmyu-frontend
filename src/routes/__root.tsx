import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";

const RootComponent = () => {
  return (
    <div className="h-screen w-screen">
      <Header />
      <div className="h-[calc(100vh-4.25rem)]">
        <Outlet />
      </div>
      <ToastContainer />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
