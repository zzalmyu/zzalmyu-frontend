import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return <div>pending my liked zzal</div>;
};

export const Route = createFileRoute("/my-liked-zzals")({
  pendingComponent: PendingComponent,
});
