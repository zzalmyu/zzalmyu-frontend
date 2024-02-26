import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteReportedImage } from "@/apis/report";
import { Report } from "@/types/report";

const useDeleteReportedImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/admin/reports/$imageId" });

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteReportedImage,
    onSuccess: (imageId) => {
      queryClient.setQueryData(
        ["reports"],
        ({ pages, pageParams }: { pages: Report[][]; pageParams: number[] }) => {
          const updatedPages = pages.map((page) =>
            page.filter((report) => report.imageId !== imageId),
          );

          return { pages: updatedPages, pageParams };
        },
      );

      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("사진이 삭제되었습니다");
      navigate({ to: "/admin/reports" });
    },
    onError: () => {
      toast.error("사진 삭제에 실패했습니다.");
    },
  });

  return { deleteReportedImage: mutate, ...rest };
};

export default useDeleteReportedImage;
