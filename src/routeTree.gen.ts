/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute, lazyRouteComponent } from "@tanstack/react-router"

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as LayoutWithChatImport } from "./routes/_layout-with-chat"
import { Route as UploadZzalIndexImport } from "./routes/upload-zzal/index"
import { Route as LayoutWithChatIndexImport } from "./routes/_layout-with-chat/index"
import { Route as AdminReportsIndexImport } from "./routes/admin/reports/index"
import { Route as LayoutWithChatMyUploadedZzalIndexImport } from "./routes/_layout-with-chat/my-uploaded-zzal/index"
import { Route as LayoutWithChatMyLikedZzalIndexImport } from "./routes/_layout-with-chat/my-liked-zzal/index"
import { Route as AdminReportsImageIdIndexImport } from "./routes/admin/reports/$imageId/index"

// Create Virtual Routes

const AdminReportsAdminReportsPendingComponentImport = createFileRoute(
  "/admin/reports/AdminReports",
)()

// Create/Update Routes

const LayoutWithChatRoute = LayoutWithChatImport.update({
  id: "/_layout-with-chat",
  getParentRoute: () => rootRoute,
} as any)

const UploadZzalIndexRoute = UploadZzalIndexImport.update({
  path: "/upload-zzal/",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithChatIndexRoute = LayoutWithChatIndexImport.update({
  path: "/",
  getParentRoute: () => LayoutWithChatRoute,
} as any)

const AdminReportsIndexRoute = AdminReportsIndexImport.update({
  path: "/admin/reports/",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithChatMyUploadedZzalIndexRoute =
  LayoutWithChatMyUploadedZzalIndexImport.update({
    path: "/my-uploaded-zzal/",
    getParentRoute: () => LayoutWithChatRoute,
  } as any)

const LayoutWithChatMyLikedZzalIndexRoute =
  LayoutWithChatMyLikedZzalIndexImport.update({
    path: "/my-liked-zzal/",
    getParentRoute: () => LayoutWithChatRoute,
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
    "/_layout-with-chat/": {
      preLoaderRoute: typeof LayoutWithChatIndexImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/upload-zzal/": {
      preLoaderRoute: typeof UploadZzalIndexImport
      parentRoute: typeof rootRoute
    }
    "/admin/reports/AdminReports": {
      preLoaderRoute: typeof AdminReportsAdminReportsPendingComponentImport
      parentRoute: typeof rootRoute
    }
    "/_layout-with-chat/my-liked-zzal/": {
      preLoaderRoute: typeof LayoutWithChatMyLikedZzalIndexImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/_layout-with-chat/my-uploaded-zzal/": {
      preLoaderRoute: typeof LayoutWithChatMyUploadedZzalIndexImport
      parentRoute: typeof LayoutWithChatImport
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
    LayoutWithChatIndexRoute,
    LayoutWithChatMyLikedZzalIndexRoute,
    LayoutWithChatMyUploadedZzalIndexRoute,
  ]),
  UploadZzalIndexRoute,
  AdminReportsAdminReportsPendingComponentRoute,
  AdminReportsIndexRoute,
  AdminReportsImageIdIndexRoute,
])

/* prettier-ignore-end */
