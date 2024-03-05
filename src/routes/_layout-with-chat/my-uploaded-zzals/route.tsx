import { createFileRoute } from "@tanstack/react-router";

const PendingComponent = () => {
  return <div>pending</div>;
};

export const Route = createFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  pendingComponent: PendingComponent,
});
