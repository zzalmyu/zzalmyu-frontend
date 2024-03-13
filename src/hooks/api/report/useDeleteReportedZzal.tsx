import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { deleteReportedZzal } from "@/apis/report";

const useDeleteReportedZzal = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/admin/reports/$imageId" });

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteReportedZzal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("사진이 삭제되었습니다");
      navigate({ to: "/admin/reports" });
    },
    onError: () => {
      toast.error("사진 삭제에 실패했습니다.");
    },
  });

  return { deleteReportedZzal: mutate, ...rest };
};

export default useDeleteReportedZzal;
