import { useQueryClient, useMutation } from "@tanstack/react-query";
import { addImageLike } from "@/apis/zzal";
import { GetZzalResponse } from "@/types/zzal.dto";

export const useAddImageLike = (imageIndex: number) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: (imageId: number) => addImageLike(imageId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["homeZzlas"] });

      const oldData = queryClient.getQueryData(["homeZzals"]) as GetZzalResponse[];
      const updatedData = [...oldData];

      updatedData[imageIndex] = { ...updatedData[imageIndex], imageLikeYn: true };

      queryClient.setQueryData(["homeZzals"], updatedData);

      return { oldData };
    },
    onError: (error, _, rollback) => queryClient.setQueryData(["homeZzals"], rollback?.oldData),
  });

  return { addImageLike: mutate, ...rest };
};
