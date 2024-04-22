import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    TanStackRouterVite(),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          sentry: ["@sentry/react", "@sentry/tracing"],
          ws: ["@stomp/stompjs", "sockjs-client"],
          router: ["@tanstack/react-router", "react-dom"],
          tailwindCSS: ["tailwind-merge", "clsx"],
          icon: ["lucide-react"],
        },
      },
    },
  },
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
