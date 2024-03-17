import { createFileRoute, redirect } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/_authentication")({
  beforeLoad: async ({ context, location, navigate }) => {
    try {
      const userInfomation = await context.authorize.isAuthenticated();

      if (location.pathname === "/admin/reports" && userInfomation.role === "USER") {
        navigate({ to: "/" });
      }
    } catch (error) {
      if (!axios.isAxiosError(error)) return;
      if (error.response?.status === 401) {
        throw redirect({
          to: "/",
          search: {
            redirect: location.pathname,
          },
        });
      }
    }
  },
});
