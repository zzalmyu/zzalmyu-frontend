import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { deleteMyZzal } from "@/apis/zzal";

const useDeleteMyZzal = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: deleteMyZzal,
    onSuccess: () => {
      toast.success("사진이 삭제되었습니다.");
    },
    onError: () => {
      toast.error("사진 삭제에 실패했습니다.");
    },
  });
  return { deleteMyZzal: mutate, ...rest };
};

export default useDeleteMyZzal;
