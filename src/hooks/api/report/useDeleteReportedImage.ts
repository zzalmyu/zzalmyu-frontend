import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteReportedImage } from "@/apis/report";
import { Report } from "@/types/report";

const useDeleteReportedImage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/admin/reports/$imagId" });

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteReportedImage,
    onSuccess: (imageId) => {
      queryClient.setQueryData(
        ["reports"],
        ({ pages, pageParams }: { pages: Report[][]; pageParams: number[] }) => {
          const updatedPages = pages.map((page) =>
            page.filter((report) => report.imageId !== parseInt(imageId)),
          );

          return { pages: updatedPages, pageParams };
        },
      );

      queryClient.invalidateQueries({ queryKey: ["reports"] });

      console.log("사진이 삭제되었습니다.");
      {
        /*TODO: [2024.02.24] 토스트 메세지로 변경하기 */
      }

      navigate({ to: "/admin/reports" });
    },
    onError: (error) => {
      console.error("사진 삭제에 실패했습니다.", error);
      {
        /*TODO: [2024.02.24] 토스트 메세지로 변경하기 */
      }
    },
  });

  return { deleteReportedImage: mutate, ...rest };
};

export default useDeleteReportedImage;
