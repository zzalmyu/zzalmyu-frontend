import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_authentication")({
  beforeLoad: async ({ context, location }) => {
    console.log(location.pathname);
    if (location.pathname === "/") return;
    await context.authorize.isAuthenticated();
  },
  onError: (error) => {
    if (!axios.isAxiosError(error)) return;
    if (error.response?.status === 401) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.pathname,
        },
      });
    }
  },
  wrapInSuspense: true,
});
