import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { FolderUp, Heart, Home, PlusSquare } from "lucide-react";
import { AuthContextType } from "@/components/Auth";
import { cn } from "@/utils/tailwind";
import NotFound from "./-NotFound";
import Header from "@/components/common/Header";

const menuItems = [
  {
    path: "/",
    Icon: Home,
    name: "홈",
  },
  {
    path: "/my-uploaded-zzals/",
    Icon: FolderUp,
    name: "업로드한 짤",
  },
  {
    path: "/my-liked-zzals/",
    Icon: Heart,
    name: "좋아요한 짤",
  },

  {
    path: "/upload-zzal",
    Icon: PlusSquare,
    name: "업로드",
  },
];

const NavigationFooter = () => {
  return (
    <div
      className={cn(
        "absolute bottom-0 flex h-70pxr w-full items-center justify-evenly bg-background text-text-primary transition-transform sm:hidden",
      )}
    >
      {menuItems.map(({ path, Icon, name }) => (
        <Link to={path} className="flex w-65pxr flex-col items-center gap-1" key={name}>
          <Icon size={24} strokeWidth={1.5} aria-label={name} />
          <span className="text-xs font-bold group-hover:text-blue-500">{name}</span>
        </Link>
      ))}
    </div>
  );
};

interface RouterContext {
  authorize: AuthContextType;
}

const RootComponent = () => {
  return (
    <div className="relative h-screen w-screen">
      <Header />
      <div className="h-[calc(100vh-4.25rem)] pb-70pxr sm:pb-0">
        <Outlet />
      </div>
      <NavigationFooter />
      <ToastContainer />
      <ReactQueryDevtools buttonPosition="top-right" />
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  );
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: NotFound,
});
