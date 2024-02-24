/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as IndexImport } from "./routes/index"
import { Route as UploadZzalIndexImport } from "./routes/upload-zzal/index"
import { Route as MyUploadedZzalIndexImport } from "./routes/my-uploaded-zzal/index"
import { Route as MyLikedZzalIndexImport } from "./routes/my-liked-zzal/index"
import { Route as AdminReportsIndexImport } from "./routes/admin/reports/index"
import { Route as AdminReportsImageIdIndexImport } from "./routes/admin/reports/$imageId/index"

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: "/",
  getParentRoute: () => rootRoute,
} as any)

const UploadZzalIndexRoute = UploadZzalIndexImport.update({
  path: "/upload-zzal/",
  getParentRoute: () => rootRoute,
} as any)

const MyUploadedZzalIndexRoute = MyUploadedZzalIndexImport.update({
  path: "/my-uploaded-zzal/",
  getParentRoute: () => rootRoute,
} as any)

const MyLikedZzalIndexRoute = MyLikedZzalIndexImport.update({
  path: "/my-liked-zzal/",
  getParentRoute: () => rootRoute,
} as any)

const AdminReportsIndexRoute = AdminReportsIndexImport.update({
  path: "/admin/reports/",
  getParentRoute: () => rootRoute,
} as any)

const AdminReportsImageIdIndexRoute = AdminReportsImageIdIndexImport.update({
  path: "/admin/reports/$imageId/",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    "/my-liked-zzal/": {
      preLoaderRoute: typeof MyLikedZzalIndexImport
      parentRoute: typeof rootRoute
    }
    "/my-uploaded-zzal/": {
      preLoaderRoute: typeof MyUploadedZzalIndexImport
      parentRoute: typeof rootRoute
    }
    "/upload-zzal/": {
      preLoaderRoute: typeof UploadZzalIndexImport
      parentRoute: typeof rootRoute
    }
    "/admin/reports/": {
      preLoaderRoute: typeof AdminReportsIndexImport
      parentRoute: typeof rootRoute
    }
    "/admin/reports/$imageId/": {
      preLoaderRoute: typeof AdminReportsImageIdIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  MyLikedZzalIndexRoute,
  MyUploadedZzalIndexRoute,
  UploadZzalIndexRoute,
  AdminReportsIndexRoute,
  AdminReportsImageIdIndexRoute,
])

/* prettier-ignore-end */
