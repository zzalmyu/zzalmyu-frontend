/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from "./routes/__root"
import { Route as LayoutWithChatImport } from "./routes/_layout-with-chat"
import { Route as AuthenticationImport } from "./routes/_authentication"
import { Route as LayoutWithChatIndexRouteImport } from "./routes/_layout-with-chat/index.route"
import { Route as LayoutWithChatMyUploadedZzalsRouteImport } from "./routes/_layout-with-chat/my-uploaded-zzals/route"
import { Route as LayoutWithChatMyLikedZzalsRouteImport } from "./routes/_layout-with-chat/my-liked-zzals/route"
import { Route as AuthenticationUploadZzalRouteImport } from "./routes/_authentication/upload-zzal/route"
import { Route as AuthenticationDeleteAccountRouteImport } from "./routes/_authentication/delete-account/route"
import { Route as AuthenticationAdminReportsRouteImport } from "./routes/_authentication/admin/reports/route"
import { Route as AuthenticationAdminReportsImageIdRouteImport } from "./routes/_authentication/admin/reports/$imageId/route"

// Create/Update Routes

const LayoutWithChatRoute = LayoutWithChatImport.update({
  id: "/_layout-with-chat",
  getParentRoute: () => rootRoute,
} as any)

const AuthenticationRoute = AuthenticationImport.update({
  id: "/_authentication",
  getParentRoute: () => rootRoute,
} as any)

const LayoutWithChatIndexRouteRoute = LayoutWithChatIndexRouteImport.update({
  path: "/",
  getParentRoute: () => LayoutWithChatRoute,
} as any).lazy(() =>
  import("./routes/_layout-with-chat/index.route.lazy").then((d) => d.Route),
)

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

const AuthenticationUploadZzalRouteRoute =
  AuthenticationUploadZzalRouteImport.update({
    path: "/upload-zzal",
    getParentRoute: () => AuthenticationRoute,
  } as any).lazy(() =>
    import("./routes/_authentication/upload-zzal/route.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticationDeleteAccountRouteRoute =
  AuthenticationDeleteAccountRouteImport.update({
    path: "/delete-account",
    getParentRoute: () => AuthenticationRoute,
  } as any).lazy(() =>
    import("./routes/_authentication/delete-account/route.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticationAdminReportsRouteRoute =
  AuthenticationAdminReportsRouteImport.update({
    path: "/admin/reports",
    getParentRoute: () => AuthenticationRoute,
  } as any).lazy(() =>
    import("./routes/_authentication/admin/reports/route.lazy").then(
      (d) => d.Route,
    ),
  )

const AuthenticationAdminReportsImageIdRouteRoute =
  AuthenticationAdminReportsImageIdRouteImport.update({
    path: "/$imageId",
    getParentRoute: () => AuthenticationAdminReportsRouteRoute,
  } as any).lazy(() =>
    import("./routes/_authentication/admin/reports/$imageId/route.lazy").then(
      (d) => d.Route,
    ),
  )

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/_authentication": {
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    "/_layout-with-chat": {
      preLoaderRoute: typeof LayoutWithChatImport
      parentRoute: typeof rootRoute
    }
    "/_authentication/delete-account": {
      preLoaderRoute: typeof AuthenticationDeleteAccountRouteImport
      parentRoute: typeof AuthenticationImport
    }
    "/_authentication/upload-zzal": {
      preLoaderRoute: typeof AuthenticationUploadZzalRouteImport
      parentRoute: typeof AuthenticationImport
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
      preLoaderRoute: typeof LayoutWithChatIndexRouteImport
      parentRoute: typeof LayoutWithChatImport
    }
    "/_authentication/admin/reports": {
      preLoaderRoute: typeof AuthenticationAdminReportsRouteImport
      parentRoute: typeof AuthenticationImport
    }
    "/_authentication/admin/reports/$imageId": {
      preLoaderRoute: typeof AuthenticationAdminReportsImageIdRouteImport
      parentRoute: typeof AuthenticationAdminReportsRouteImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticationRoute.addChildren([
    AuthenticationDeleteAccountRouteRoute,
    AuthenticationUploadZzalRouteRoute,
    AuthenticationAdminReportsRouteRoute.addChildren([
      AuthenticationAdminReportsImageIdRouteRoute,
    ]),
  ]),
  LayoutWithChatRoute.addChildren([
    LayoutWithChatMyLikedZzalsRouteRoute,
    LayoutWithChatMyUploadedZzalsRouteRoute,
    LayoutWithChatIndexRouteRoute,
  ]),
])

/* prettier-ignore-end */
