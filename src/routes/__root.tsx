import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet, createRootRoute } from "@tanstack/react-router";
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
    </div>
  );
};

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFound,
});
