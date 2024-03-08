/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as LayoutWithoutChatImport } from "./routes/_layout-without-chat"
import { Route as LayoutWithChatImport } from "./routes/_layout-with-chat"
import { Route as LayoutWithChatIndexImport } from "./routes/_layout-with-chat/index"
import { Route as LayoutWithChatMyUploadedZzalsRouteImport } from "./routes/_layout-with-chat/my-uploaded-zzals/route"
import { Route as LayoutWithChatMyLikedZzalsRouteImport } from "./routes/_layout-with-chat/my-liked-zzals/route"
import { Route as AdminReportsIndexImport } from "./routes/admin/reports/index"
import { Route as LayoutWithoutChatUploadZzalIndexImport } from "./routes/_layout-without-chat/upload-zzal/index"
import { Route as AdminReportsImageIdIndexImport } from "./routes/admin/reports/$imageId/index"

// Create Virtual Routes

const AdminReportsAdminReportsPendingComponentImport = createFileRoute(
  "/admin/reports/AdminReports",
)()

// Create/Update Routes

const LayoutWithoutChatRoute = LayoutWithoutChatImport.update({
  id: "/_layout-without-chat",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithChatRoute = LayoutWithChatImport.update({
  id: "/_layout-with-chat",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithChatIndexRoute = LayoutWithChatIndexImport.update({
  path: "/",
  getParentRoute: () => LayoutWithChatRoute,
} as any)

const LayoutWithChatMyUploadedZzalsRouteRoute =
  LayoutWithChatMyUploadedZzalsRouteImport.update({
    path: "/my-uploaded-zzals",
    getParentRoute: () => LayoutWithChatRoute,
  } as any).lazy(() =>
    import("./routes/_layout-with-chat/my-uploaded-zzals/route.lazy").then(
      (d) => d.Route,
    ),
  )

const LayoutWithChatMyLikedZzalsRouteRoute =
  LayoutWithChatMyLikedZzalsRouteImport.update({
    path: "/my-liked-zzals",
    getParentRoute: () => LayoutWithChatRoute,
  } as any).lazy(() =>
    import("./routes/_layout-with-chat/my-liked-zzals/route.lazy").then(
      (d) => d.Route,
    ),
  )

const AdminReportsIndexRoute = AdminReportsIndexImport.update({
  path: "/admin/reports/",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithoutChatUploadZzalIndexRoute =
  LayoutWithoutChatUploadZzalIndexImport.update({
    path: "/upload-zzal/",
    getParentRoute: () => LayoutWithoutChatRoute,
  } as any)

const AdminReportsAdminReportsPendingComponentRoute =
  AdminReportsAdminReportsPendingComponentImport.update({
    path: "/admin/reports/AdminReports",
    getParentRoute: () => rootRoute,
  } as any).update({
    pendingComponent: lazyRouteComponent(
      () => import("./routes/admin/reports/AdminReports.pendingComponent"),
      "pendingComponent",
    ),
  })

const AdminReportsImageIdIndexRoute = AdminReportsImageIdIndexImport.update({
  path: "/admin/reports/$imageId/",
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_layout-with-chat": {
      preLoaderRoute: typeof LayoutWithChatImport
      parentRoute: typeof rootRoute
    }
    "/_layout-without-chat": {
      preLoaderRoute: typeof LayoutWithoutChatImport
      parentRoute: typeof rootRoute
    }
    "/_layout-with-chat/my-liked-zzals": {
      preLoaderRoute: typeof LayoutWithChatMyLikedZzalsRouteImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/_layout-with-chat/my-uploaded-zzals": {
      preLoaderRoute: typeof LayoutWithChatMyUploadedZzalsRouteImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/_layout-with-chat/": {
      preLoaderRoute: typeof LayoutWithChatIndexImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/admin/reports/AdminReports": {
      preLoaderRoute: typeof AdminReportsAdminReportsPendingComponentImport
      parentRoute: typeof rootRoute
    }
    "/_layout-without-chat/upload-zzal/": {
      preLoaderRoute: typeof LayoutWithoutChatUploadZzalIndexImport
      parentRoute: typeof LayoutWithoutChatImport
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
  LayoutWithChatRoute.addChildren([
    LayoutWithChatMyLikedZzalsRouteRoute,
    LayoutWithChatMyUploadedZzalsRouteRoute,
    LayoutWithChatIndexRoute,
  ]),
  LayoutWithoutChatRoute.addChildren([LayoutWithoutChatUploadZzalIndexRoute]),
  AdminReportsAdminReportsPendingComponentRoute,
  AdminReportsIndexRoute,
  AdminReportsImageIdIndexRoute,
])

/* prettier-ignore-end */
