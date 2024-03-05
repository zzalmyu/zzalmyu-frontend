import { useMutation } from "@tanstack/react-query";
import { deleteMyZzal } from "@/apis/zzal";

const useDeleteMyZzal = () => {
  const { mutate, ...rest } = useMutation({
    mutationFn: deleteMyZzal,
  });
  return { deleteMyZzal: mutate, ...rest };
};

export default useDeleteMyZzal;
