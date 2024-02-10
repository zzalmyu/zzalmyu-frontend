import { UpdatableRouteOptions } from "@tanstack/react-router";
import { Route as rootRoute } from "./pages/__root";
import { Route as IndexImport } from "./pages/index";
import { Route as UploadListIndexImport } from "./pages/UploadList/index";
import { Route as UploadIndexImport } from "./pages/Upload/index";
import { Route as LikeListIndexImport } from "./pages/LikeList/index";
import { Route as AdminIndexImport } from "./pages/Admin/index";

interface RouteOptions extends UpdatableRouteOptions<object, unknown> {
  path: string;
  getParentRoute: () => typeof rootRoute;
}

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as RouteOptions);

const UploadListIndexRoute = UploadListIndexImport.update({
  path: "/UploadList/",
  getParentRoute: () => rootRoute,
} as RouteOptions);

const UploadIndexRoute = UploadIndexImport.update({
  path: "/Upload/",
  getParentRoute: () => rootRoute,
} as RouteOptions);

const LikeListIndexRoute = LikeListIndexImport.update({
  path: "/LikeList/",
  getParentRoute: () => rootRoute,
} as RouteOptions);

const AdminIndexRoute = AdminIndexImport.update({
  path: "/Admin/",
  getParentRoute: () => rootRoute,
} as RouteOptions);

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/Admin/": {
      preLoaderRoute: typeof AdminIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/LikeList/": {
      preLoaderRoute: typeof LikeListIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/Upload/": {
      preLoaderRoute: typeof UploadIndexImport;
      parentRoute: typeof rootRoute;
    };
    "/UploadList/": {
      preLoaderRoute: typeof UploadListIndexImport;
      parentRoute: typeof rootRoute;
    };
  }
}

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  AdminIndexRoute,
  LikeListIndexRoute,
  UploadIndexRoute,
  UploadListIndexRoute,
]);
