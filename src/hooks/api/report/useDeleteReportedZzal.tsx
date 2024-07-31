import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { deleteReportedZzal } from "@/apis/report";

const useDeleteReportedZzal = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteReportedZzal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reports"] });
      toast.success("사진이 삭제되었습니다");
      router.push("/admin/reports");
    },
    onError: () => {
      toast.error("사진 삭제에 실패했습니다.");
    },
  });

  return { deleteReportedZzal: mutate, ...rest };
};

export default useDeleteReportedZzal;
