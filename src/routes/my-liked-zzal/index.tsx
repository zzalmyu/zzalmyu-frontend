import { createFileRoute } from "@tanstack/react-router";
import Pending from "./MyLikedZzal.pendingComponent";
import useGetMyLikedZzals from "@/hooks/api/zzal/useGetMyLikedZzals";
import ZzalCard from "@/components/common/ZzalCard";

const MyLikedZzal = () => {
  const { zzals } = useGetMyLikedZzals();

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-2xl font-bold">좋아요 한 짤 페이지</h1>
      <div className="mx-auto sm:max-w-620pxr sm:columns-2 md:max-w-920pxr md:columns-3 lg:max-w-1220pxr lg:columns-4">
        {zzals.map(({ path }) => (
          <div className="mb-4 inline-block break-inside-avoid">
            <ZzalCard src={path} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Route = createFileRoute("/my-liked-zzal/")({
  component: MyLikedZzal,
  pendingComponent: Pending,
});
