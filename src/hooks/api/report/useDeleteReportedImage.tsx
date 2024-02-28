import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteReportedImage } from "@/apis/report";

const useDeleteReportedImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/admin/reports/$imageId" });

  const handleRetry = (imageId: string) => () => {
    mutate(imageId);
  };

  const DeleteFailureToast = ({ imageId }: { imageId: string }) => (
    <div>
      <div>사진 삭제에 실패했습니다.</div>
      <button className="btn btn-outline btn-error btn-xs" onClick={handleRetry(imageId)}>
        재시도
      </button>
    </div>
  );

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteReportedImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("사진이 삭제되었습니다");
      navigate({ to: "/admin/reports" });
    },
    onError: (imageId) => {
      toast.error(<DeleteFailureToast imageId={imageId.toString()} />);
    },
  });

  return { deleteReportedImage: mutate, ...rest };
};

export default useDeleteReportedImage;
