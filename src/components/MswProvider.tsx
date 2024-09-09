"use client";

import { useEffect } from "react";

export default function MswProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      if (typeof window === "undefined") {
        (async () => {
          const { server } = await import("@/mocks/server");
          server.listen();
        })();
      } else {
        (async () => {
          const { worker } = await import("@/mocks/browser");
          worker.start({
            onUnhandledRequest: "bypass",
          });
        })();
      }
    }
  });

  return null;
}
