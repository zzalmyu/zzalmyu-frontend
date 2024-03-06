import { useQueryClient, useMutation } from "@tanstack/react-query";
import { removeImageLike } from "@/apis/zzal";
import { GetZzalResponse } from "@/types/zzal.dto";

export const useRemoveImageLike = (imageIndex: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => removeImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["homeZzlas"] });

      const oldData = queryClient.getQueryData(["homeZzals"]) as GetZzalResponse[];
      const updatedData = [...oldData];

      updatedData[imageIndex] = { ...updatedData[imageIndex], imageLikeYn: false };

      queryClient.setQueryData(["homeZzals"], updatedData);

      return { oldData };
    },
    onError: (error, _, rollback) => queryClient.setQueryData(["homeZzals"], rollback?.oldData),
  });

  return { removeImageLike: mutate, ...rest };
};
