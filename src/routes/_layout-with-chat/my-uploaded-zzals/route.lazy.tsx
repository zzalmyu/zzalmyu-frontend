import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { createLazyFileRoute } from "@tanstack/react-router";
import { XCircle } from "lucide-react";
import { useSetAtom } from "jotai";
import { useOverlay } from "@toss/use-overlay";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";
import useGetMyUploadedZzals from "@/hooks/api/zzal/useGetMyUploadedZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import { $recommendedTags } from "@/store/tag";
import useDeleteMyZzal from "@/hooks/api/zzal/useDeleteMyZzal";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();
  const { zzals, handleFetchNextPage } = useGetMyUploadedZzals();
  const { deleteMyZzal } = useDeleteMyZzal();
  const setRecommendedTags = useSetAtom($recommendedTags);
  const fetchMoreRef = useRef(null);
  const deleteConfirmOverlay = useOverlay();

  useIntersectionObserver({
    target: fetchMoreRef,
    handleIntersect: handleFetchNextPage,
  });

  useEffect(() => {
    setRecommendedTags(topTags);
  }, [topTags, setRecommendedTags]);

  const handleClickDeleteConfirm = (imageId: number) => () => {
    deleteMyZzal(imageId, {
      onSuccess: () => {
        toast.success("사진이 삭제되었습니다.");
        gtag("event", "user_action", { event_category: "짤_삭제" });
      },
      onError: () => {
        toast.error("사진 삭제에 실패했습니다.");
      },
    });
    gtag("event", "user_action", { event_category: "짤_삭제" });
  };

  const handleClickDeleteButton = (imageId: number) => () => {
    deleteConfirmOverlay.open(({ isOpen, close }) => (
      <DeleteConfirmModal
        isOpen={isOpen}
        onClose={close}
        onDelete={handleClickDeleteConfirm(imageId)}
      />
    ));
  };

  return (
    <div className="flex w-full flex-col items-center">
      <MasonryLayout className="mt-15pxr w-full">
        {zzals.map(({ imageId, path, title, imageLikeYn }, index) => (
          <div className="relative" key={imageId}>
            <ZzalCard
              className="mb-10pxr"
              src={path}
              alt={title}
              imageId={imageId}
              imageIndex={index}
              isLiked={imageLikeYn}
              queryKey="uploadedZzals"
            />
            <XCircle
              onClick={handleClickDeleteButton(imageId)}
              className="absolute right-2 top-2 z-0"
              fill="white"
              aria-label="짤 삭제"
            />
          </div>
        ))}
      </MasonryLayout>
      <div ref={fetchMoreRef} />
    </div>
  );
};

export const Route = createLazyFileRoute("/_layout-with-chat/my-uploaded-zzals")({
  component: MyUploadedZzals,
});
