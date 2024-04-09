import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import prerender from "@prerenderer/rollup-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      include: "**/*.svg",
    }),
    TanStackRouterVite(),
    prerender({
      routes: ["/", "/my-liked-zzals", "/my-uploaded-zzals", "/upload-zzal"],
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        // Replace all http with https urls and localhost to your site url
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(/(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i, "zzalmyu.site");
      },
    }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
