import { Outlet, createFileRoute } from "@tanstack/react-router";

const LayoutWithoutChat = () => {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className="relative flex h-60pxr w-full items-center justify-between px-6">
        <div className="self-start text-lg font-bold text-text-primary">Heejin 님 취향 저격 짤</div>
      </div>
      <div className="relative h-[calc(100%-3.75rem)] w-full overflow-auto border border-border py-4">
        <Outlet />
      </div>
    </div>
  );
};

export const Route = createFileRoute("/_layout-without-chat")({
  component: LayoutWithoutChat,
});
