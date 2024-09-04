// import { createFileRoute, redirect } from "@tanstack/react-router";

// export const Route = createFileRoute("/_authentication")({
//   beforeLoad: async ({ context, location }) => {
//     if (location.pathname === "/") return;
//     await context.authorize.isAuthenticated();
//   },
//   onError: (error) => {
//     if (error.response?.status === 401) {
//       throw redirect({
//         to: "/",
//         search: {
//           redirect: location.pathname,
//         },
//       });
//     } else {
//       throw redirect({
//         to: "/",
//       });
//     }
//   },
//   wrapInSuspense: true,
// });
