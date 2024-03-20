import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { createLazyFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useAtom, useSetAtom } from "jotai";
import { useOverlay } from "@toss/use-overlay";
import useGetTopTagsFromUploaded from "@/hooks/api/tag/useGetTopTagsFromUploaded";
import useGetMyUploadedZzals from "@/hooks/api/zzal/useGetMyUploadedZzals";
import useIntersectionObserver from "@/hooks/common/useIntersectionObserver";
import MasonryLayout from "@/components/common/MasonryLayout";
import ZzalCard from "@/components/common/ZzalCard";
import { $recommendedTags, $selectedTags } from "@/store/tag";
import useDeleteMyZzal from "@/hooks/api/zzal/useDeleteMyZzal";
import DeleteConfirmModal from "@/components/common/DeleteConfirmModal";

const MyUploadedZzals = () => {
  const { topTags } = useGetTopTagsFromUploaded();
  const { zzals, handleFetchNextPage } = useGetMyUploadedZzals();
  const [selectedTags] = useAtom($selectedTags);
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
      <MasonryLayout className="mt-15pxr">
        {zzals.map(({ imageId, path, title, imageLikeYn }, index) => (
          <div className="group relative" key={imageId}>
            <ZzalCard
              className="mb-10pxr"
              src={path}
              alt={title}
              imageId={imageId}
              imageIndex={index}
              isLiked={imageLikeYn}
              queryKey={["uploadedZzals", selectedTags]}
            />
            <div className="button-container absolute bottom-5 left-2 z-10 flex w-fit gap-1.5 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
              <button
                className="flex h-9 w-9 items-center justify-center rounded-full  bg-white"
                onClick={handleClickDeleteButton(imageId)}
              >
                <Trash2 aria-label="짤 삭제" size={18} className="text-gray-700" />
              </button>
            </div>
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
