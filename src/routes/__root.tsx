import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Suspense, lazy } from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AuthContextType } from "@/components/Auth";
import NotFound from "./-NotFound";

// import Header from "@/components/common/Header";
const NavigationFooter = lazy(() => import("@/components/common/Footer"));
const Header = lazy(() => import("@/components/common/Header"));

interface RouterContext {
  authorize: AuthContextType;
}

const RootComponent = () => {
  return (
    <div className="relative h-[100dvh] w-[100dvw] overflow-hidden">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <div className="h-[calc(100%-4.25rem)] sm:pb-0">
        <Outlet />
      </div>
      <Suspense fallback={null}>
        <NavigationFooter />
      </Suspense>
      <ToastContainer />
      <ReactQueryDevtools buttonPosition="top-right" />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});
