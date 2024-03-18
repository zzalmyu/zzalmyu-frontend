import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMyZzal } from "@/apis/zzal";

const useDeleteMyZzal = () => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: deleteMyZzal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["uploadedZzals"] });
    },
  });

  return { deleteMyZzal: mutate, ...rest };
};

export default useDeleteMyZzal;
